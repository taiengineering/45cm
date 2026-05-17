"use client"
import { useState, useMemo } from "react"

type CampaignStatus = 'healthy'|'cooling'|'fatigue'|'weak_conversion'
type RecType = 'suggestion'|'warning'|'insight'|'opportunity'
const STATUS_COLOR:Record<CampaignStatus,string> = {healthy:'var(--green)',cooling:'var(--yellow)',fatigue:'var(--red)',weak_conversion:'#f97316'}
const STATUS_LABEL:Record<CampaignStatus,string> = {healthy:'안정 운영',cooling:'반응 감소',fatigue:'과노출',weak_conversion:'CTA 약함'}
const REC_ICON:Record<RecType,string> = {suggestion:'💡',warning:'⚠️',insight:'📊',opportunity:'🌟'}

interface Campaign { name:string; health:number; status:CampaignStatus; channelFocus:string; postsPerWeek:number; ctaConversion:number; fatigueLevel:number; brandConsistency:number; engagementTrend:number }

const CAMPAIGNS: Campaign[] = [
  {name:'중대재해 주간 콘텐츠',health:84,status:'healthy',channelFocus:'LinkedIn',postsPerWeek:3,ctaConversion:4.2,fatigueLevel:22,brandConsistency:91,engagementTrend:5},
  {name:'안전관리자 선임 가이드',health:62,status:'cooling',channelFocus:'Naver Blog',postsPerWeek:2,ctaConversion:2.8,fatigueLevel:45,brandConsistency:78,engagementTrend:-12},
  {name:'과태료 이슈 알림',health:48,status:'fatigue',channelFocus:'LinkedIn',postsPerWeek:6,ctaConversion:1.5,fatigueLevel:72,brandConsistency:65,engagementTrend:-28},
]

const CTA_DATA = [{label:'Soft CTA',desc:'참고해보세요',count:18,rate:3.8},{label:'Hard CTA',desc:'지금 바로 신청',count:12,rate:5.2},{label:'Advisory CTA',desc:'전문가 상담',count:8,rate:2.1}]

function Gauge({score,size=90}:{score:number,size?:number}) {
  const color = score>=75?'var(--green)':score>=55?'var(--yellow)':score>=35?'#f97316':'var(--red)'
  const r=size/2-8,cx=size/2,cy=size/2,d=score*2*Math.PI*r/100,g=2*Math.PI*r-d
  return <svg viewBox={`0 0 ${size} ${size}`} style={{width:size,height:size}}><circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={6}/><circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={`${d} ${g}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/><text x={cx} y={cy-2} textAnchor="middle" fill="var(--fg)" fontSize={size/3.5} fontWeight={700} fontFamily="var(--mono)">{score}</text><text x={cx} y={cy+14} textAnchor="middle" fill="var(--muted)" fontSize={9}>%</text></svg>
}

export default function CampaignIntelligencePage() {
  const [sel, setSel] = useState(0)
  const [notes, setNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  const c = CAMPAIGNS[sel]

  const recs = useMemo(() => {
    const r: {type:RecType;title:string;desc:string;conf:number}[] = []
    if (c.fatigueLevel>50) r.push({type:'warning',title:'캔페인 피로도 감지',desc:`피로도 ${c.fatigueLevel}%. 주제 다양화 또는 발행 간격 조정을 검토해보세요.`,conf:75})
    if (c.engagementTrend<-10) r.push({type:'warning',title:'반응률 하락 추세',desc:`Engagement ${c.engagementTrend}%. 콘텐츠 방향 또는 톤 조정을 검토해보세요.`,conf:68})
    if (c.ctaConversion>3.5) r.push({type:'opportunity',title:'CTA 전환 우수',desc:`전환률 ${c.ctaConversion}%. 현재 전략 유지 권장.`,conf:85})
    if (c.postsPerWeek>5) r.push({type:'suggestion',title:'발행 빈도 높음',desc:`주 ${c.postsPerWeek}회. 반응 추이를 보며 간격 조정 검토.`,conf:62})
    if (c.brandConsistency<80) r.push({type:'insight',title:'브랜드 일관성 하락',desc:`브랜드 일관성 ${c.brandConsistency}%. Brand Studio에서 톤 점검 권장.`,conf:70})
    if (c.status==='healthy') r.push({type:'insight',title:'캔페인 상태 양호',desc:'현재 운영 리듬을 유지하세요.',conf:90})
    return r
  }, [c])

  return (
    <div>
      <h1 className="page-title">Campaign Intelligence</h1>
      <p className="page-sub">캔페인 전략 분석실 — 엔진이 분석하고, 운영자가 판단합니다</p>

      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {CAMPAIGNS.map((camp,i) => (
          <button key={camp.name} className="btn" onClick={()=>setSel(i)} style={sel===i?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>
            <span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:STATUS_COLOR[camp.status],marginRight:6}} />{camp.name}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:16,marginBottom:20}}>
        <div className="card" style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Gauge score={c.health} />
          <div style={{marginTop:8,padding:'2px 10px',borderRadius:4,fontSize:12,fontWeight:600,color:STATUS_COLOR[c.status],background:`${STATUS_COLOR[c.status]}18`}}>{STATUS_LABEL[c.status]}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
          {[{l:'Engagement',v:`${c.engagementTrend>0?'+':''}${c.engagementTrend}%`,cl:c.engagementTrend>=0?'var(--green)':'var(--red)'},{l:'CTA 전환',v:`${c.ctaConversion}%`,cl:c.ctaConversion>3?'var(--green)':'var(--yellow)'},{l:'발행',v:`${c.postsPerWeek}/w`,cl:c.postsPerWeek>5?'var(--yellow)':'var(--fg)'},{l:'피로도',v:`${c.fatigueLevel}%`,cl:c.fatigueLevel>50?'var(--red)':'var(--green)'},{l:'브랜드',v:`${c.brandConsistency}%`,cl:c.brandConsistency>80?'var(--green)':'var(--yellow)'}].map(m=>
            <div key={m.l} className="card" style={{textAlign:'center',padding:14}}>
              <div style={{fontSize:22,fontWeight:700,color:m.cl,fontFamily:'var(--mono)'}}>{m.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:4}}>{m.l}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">채널 군형</span></div>
          {[{ch:'LinkedIn',pct:55},{ch:'Naver Blog',pct:25},{ch:'Facebook',pct:15},{ch:'지식인',pct:5}].map(ch=>
            <div key={ch.ch} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:3}}><span>{ch.ch}</span><span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>{ch.pct}%</span></div>
              <div style={{height:6,borderRadius:3,background:'var(--surface)',overflow:'hidden'}}><div style={{height:'100%',width:`${ch.pct}%`,borderRadius:3,background:ch.pct>40?'var(--accent)':'var(--green)'}} /></div>
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">CTA 전략 분석</span></div>
          {CTA_DATA.map(cta=>
            <div key={cta.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
              <div><div style={{fontSize:13,fontWeight:600}}>{cta.label}</div><div style={{fontSize:11,color:'var(--muted)'}}>{cta.desc}</div></div>
              <div style={{textAlign:'right'}}><div style={{fontSize:16,fontWeight:700,fontFamily:'var(--mono)',color:cta.rate>3?'var(--green)':'var(--muted)'}}>{cta.rate}%</div><div style={{fontSize:10,color:'var(--muted)'}}>{cta.count}회</div></div>
            </div>
          )}
          <div style={{marginTop:10,fontSize:12,color:'var(--accent)',fontWeight:600}}>Hard CTA가 LinkedIn에서 더 높은 전환을 보였습니다</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">전략 제안 ({recs.length})</span></div>
          {recs.map((r,i)=>
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid var(--border)',display:'flex',gap:12,alignItems:'flex-start'}}>
              <span style={{fontSize:20,flexShrink:0}}>{REC_ICON[r.type]}</span>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                  <span style={{fontSize:14,fontWeight:600}}>{r.title}</span>
                  <span style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--mono)',background:'var(--surface)',padding:'2px 6px',borderRadius:3}}>신뢰도 {r.conf}%</span>
                </div>
                <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.7,margin:0}}>{r.desc}</p>
              </div>
            </div>
          )}
          <div style={{padding:'12px 0',fontSize:11,color:'var(--border)',textAlign:'center'}}>엔진은 제안만 합니다. 최종 판단은 운영자가 합니다.</div>
        </div>
        <div>
          <div className="card" style={{marginBottom:12}}>
            <div className="card-title" style={{marginBottom:8}}>운영자 노트</div>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="이번 캔페인에 대한 전략 메모를 남기세요.예: 브랜딩 목적이라 전환보다 노출 우선" rows={4} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,resize:'vertical',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
            <button className="btn" onClick={()=>{setNotesSaved(true);setTimeout(()=>setNotesSaved(false),2000)}} style={{width:'100%',justifyContent:'center',fontSize:12}}>{notesSaved?'✅ 저장됨':'노트 저장'}</button>
          </div>
          <div className="card">
            <div className="card-title" style={{marginBottom:8}}>핵심 원칙</div>
            <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>사람이 전략을 유지하고,<br/>엔진이 분석/추천/패턴 감지를 수행하며,<br/>최종 판단은 운영자가 수행합니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}