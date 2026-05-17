"use client"
import { useState, useMemo } from "react"

type HealthStatus = 'healthy'|'cooling'|'fatigue'|'declining'
type RecType = 'suggestion'|'warning'|'insight'|'opportunity'

interface ChannelData { channel:string; score:number; status:HealthStatus; engagementTrend:number; publishDensity:number; ctaConversion:number; fatigue:boolean }
interface Rec { id:string; type:RecType; channel?:string; title:string; description:string; confidence:number }

const STATUS_COLOR:Record<HealthStatus,string> = {healthy:'var(--green)',cooling:'var(--yellow)',fatigue:'var(--red)',declining:'var(--red)'}
const STATUS_LABEL:Record<HealthStatus,string> = {healthy:'Healthy',cooling:'Cooling',fatigue:'Fatigue',declining:'Declining'}
const REC_ICON:Record<RecType,string> = {suggestion:'💡',warning:'⚠️',insight:'📊',opportunity:'🌟'}
const REC_BORDER:Record<RecType,string> = {suggestion:'var(--accent)',warning:'var(--yellow)',insight:'var(--muted)',opportunity:'var(--green)'}

// Simulated channel health data (would come from API in production)
const CHANNELS: ChannelData[] = [
  {channel:'LinkedIn',score:82,status:'healthy',engagementTrend:5,publishDensity:3,ctaConversion:4.2,fatigue:false},
  {channel:'Facebook',score:48,status:'fatigue',engagementTrend:-22,publishDensity:7,ctaConversion:1.8,fatigue:true},
  {channel:'Naver Blog',score:65,status:'cooling',engagementTrend:-8,publishDensity:1,ctaConversion:2.5,fatigue:false},
]

function HealthGauge({score,size=80}:{score:number,size?:number}) {
  const color = score>=75?'var(--green)':score>=55?'var(--yellow)':score>=35?'#f97316':'var(--red)'
  const r = size/2-8, cx=size/2, cy=size/2
  const dashLen = score * 2 * Math.PI * r / 100
  const dashGap = 2 * Math.PI * r - dashLen
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{width:size,height:size}}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${dashLen} ${dashGap}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} style={{transition:'stroke-dasharray 0.6s'}} />
      <text x={cx} y={cy-2} textAnchor="middle" fill="var(--fg)" fontSize={size/4} fontWeight={700} fontFamily="var(--mono)">{score}</text>
      <text x={cx} y={cy+12} textAnchor="middle" fill="var(--muted)" fontSize={8}>%</text>
    </svg>
  )
}

function TrendArrow({value}:{value:number}) {
  if (value > 0) return <span style={{color:'var(--green)',fontSize:12,fontWeight:600}}>↑ +{value}%</span>
  if (value < 0) return <span style={{color:'var(--red)',fontSize:12,fontWeight:600}}>↓ {value}%</span>
  return <span style={{color:'var(--muted)',fontSize:12}}>→ 0%</span>
}

export default function ChannelHealthPage() {
  const [selectedChannel, setSelectedChannel] = useState<string|null>(null)

  const recs = useMemo<Rec[]>(() => {
    const r: Rec[] = []
    let id = 1
    for (const ch of CHANNELS) {
      if (ch.fatigue) r.push({id:`r${id++}`,type:'warning',channel:ch.channel,title:`${ch.channel} 콘텐츠 피로도 감지`,description:`발행 빈도(${ch.publishDensity}회/주)가 높고 반응률이 ${ch.engagementTrend}% 변화했습니다. 발행 간격 조정을 검토해보세요.`,confidence:72})
      if (ch.engagementTrend < -15) r.push({id:`r${id++}`,type:'warning',channel:ch.channel,title:`${ch.channel} 반응률 하락`,description:`최근 2주간 engagement가 ${ch.engagementTrend}% 감소. 콘텐츠 주제나 톤 변경을 검토해보세요.`,confidence:65})
      if (ch.status==='healthy'&&ch.ctaConversion>3) r.push({id:`r${id++}`,type:'opportunity',channel:ch.channel,title:`${ch.channel} CTA 전환 우수`,description:`CTA 전환률 ${ch.ctaConversion}%로 양호. 현재 전략 유지를 권장합니다.`,confidence:85})
      if (ch.publishDensity<2) r.push({id:`r${id++}`,type:'suggestion',channel:ch.channel,title:`${ch.channel} 발행 빈도 낮음`,description:`최근 발행이 ${ch.publishDensity}회/주. 채널 활성화를 위해 주 2-3회 발행을 검토해보세요.`,confidence:60})
    }
    const avg = CHANNELS.reduce((s,c)=>s+c.score,0)/CHANNELS.length
    if (avg>70) r.push({id:`r${id++}`,type:'insight',title:'전체 채널 상태 양호',description:`평균 건강도 ${Math.round(avg)}%. 현재 운영 리듬을 유지하세요.`,confidence:80})
    return r
  }, [])

  const filteredRecs = selectedChannel ? recs.filter(r => !r.channel || r.channel === selectedChannel) : recs

  return (
    <div>
      <h1 className="page-title">Channel Health</h1>
      <p className="page-sub">데이터 기반 운영 제안 — 엔진이 분석하고, 운영자가 판단합니다</p>

      {/* Channel Cards */}
      <div className="grid-3" style={{marginBottom:20}}>
        {CHANNELS.map(ch => (
          <div key={ch.channel} className="card" onClick={()=>setSelectedChannel(selectedChannel===ch.channel?null:ch.channel)} style={{cursor:'pointer',...(selectedChannel===ch.channel?{borderColor:'var(--accent)'}:{})}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{ch.channel}</div>
                <div style={{display:'inline-block',padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:600,color:STATUS_COLOR[ch.status],background:`${STATUS_COLOR[ch.status]}18`}}>{STATUS_LABEL[ch.status]}</div>
              </div>
              <HealthGauge score={ch.score} />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:12}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:11,color:'var(--muted)'}}>Engagement</div>
                <TrendArrow value={ch.engagementTrend} />
              </div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:11,color:'var(--muted)'}}>Density</div>
                <div style={{fontSize:12,fontWeight:600,fontFamily:'var(--mono)'}}>{ch.publishDensity}/w</div>
              </div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:11,color:'var(--muted)'}}>CTA Conv</div>
                <div style={{fontSize:12,fontWeight:600,fontFamily:'var(--mono)',color:'var(--accent)'}}>{ch.ctaConversion}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Density Chart */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">발행 밀도 (최근 4주)</span></div>
        <div style={{display:'flex',gap:4,alignItems:'flex-end',height:80}}>
          {[2,3,5,7,4,3,2,1,3,2,6,8,5,3,2,1,2,3,4,3,2,1,3,2,5,4,3,2].map((v,i) => (
            <div key={i} style={{flex:1,height:`${v*10}%`,background:v>5?'var(--yellow)':'var(--accent)',borderRadius:'2px 2px 0 0',opacity:0.7+v*0.03,transition:'height 0.3s'}} />
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--muted)',marginTop:4}}>
          <span>4주 전</span><span>3주 전</span><span>2주 전</span><span>이번 주</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">운영 제안 ({filteredRecs.length})</span>
          {selectedChannel && <button className="btn" onClick={()=>setSelectedChannel(null)} style={{fontSize:11,padding:'3px 10px'}}>전체 보기</button>}
        </div>
        {filteredRecs.map(r => (
          <div key={r.id} style={{padding:'12px 0',borderBottom:'1px solid var(--border)',display:'flex',gap:12,alignItems:'flex-start'}}>
            <span style={{fontSize:20,flexShrink:0}}>{REC_ICON[r.type]}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <span style={{fontSize:14,fontWeight:600}}>{r.title}</span>
                <span style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--mono)',background:'var(--surface)',padding:'2px 6px',borderRadius:3}}>신뢰도 {r.confidence}%</span>
              </div>
              <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.7,margin:0}}>{r.description}</p>
              {r.channel && <span style={{fontSize:10,color:REC_BORDER[r.type],marginTop:4,display:'inline-block'}}>{r.channel}</span>}
            </div>
          </div>
        ))}
        <div style={{padding:'12px 0',fontSize:11,color:'var(--border)',textAlign:'center'}}>엔진은 제안만 합니다. 최종 판단은 운영자가 합니다.</div>
      </div>
    </div>
  )
}