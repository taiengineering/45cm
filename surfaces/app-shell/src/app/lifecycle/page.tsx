"use client"
import { useState } from "react"

const STAGES = [
  {id:'connect',name:'Connect',ko:'채널 연결',icon:'🔗',done:true},
  {id:'analyze',name:'Analyze',ko:'현황 분석',icon:'🔍',done:true},
  {id:'intake',name:'Intake',ko:'운영 정보',icon:'📋',done:false},
  {id:'baseline',name:'Baseline',ko:'전략 설정',icon:'⚙️',done:false},
  {id:'regular',name:'Regular Ops',ko:'정기 운영',icon:'📊',done:false},
  {id:'event',name:'Event Ops',ko:'이벤트',icon:'⚡',done:false},
  {id:'recovery',name:'Recovery',ko:'회복',icon:'💚',done:false},
]

const CHANNELS = [
  {ch:'LinkedIn',status:'healthy',score:82,cadence:'주 2.5회',fatigue:15},
  {ch:'Naver Blog',status:'dormant',score:25,cadence:'주 0회',fatigue:5},
  {ch:'Facebook',status:'recovering',score:48,cadence:'주 1회',fatigue:30},
]

const STATUS_STYLE:Record<string,{color:string,label:string}> = {
  healthy:{color:'var(--green)',label:'안정'},
  recovering:{color:'var(--yellow)',label:'회복 중'},
  unstable:{color:'var(--yellow)',label:'불안정'},
  dormant:{color:'var(--muted)',label:'휴면'},
  overloaded:{color:'var(--red)',label:'과부하'},
  fatigued:{color:'var(--red)',label:'피로'},
}

const RECS = [
  {ch:'LinkedIn',text:'LinkedIn 운영이 안정적입니다. 현재 리듬을 유지하세요.',sev:'info'},
  {ch:'Naver Blog',text:'Naver Blog가 30일 이상 업데이트되지 않았습니다. 주 1회 가벼운 콘텐츠부터 시작하세요.',sev:'action'},
  {ch:'Facebook',text:'Facebook 피로도가 높습니다(30%). trust 콘텐츠를 늘려주세요.',sev:'warning'},
]

export default function LifecyclePage() {
  const [current] = useState(1) // analyze stage
  return (
    <div>
      <h1 className="page-title">Operations Lifecycle</h1>
      <p className="page-sub">브랜드 운영 Lifecycle — 분석 → 세팅 → 정기운영 → 이벤트 → 회복</p>

      {/* Lifecycle Progress */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:12}}>운영 단계</div>
        <div style={{display:'flex',gap:4}}>
          {STAGES.map((s,i)=>(
            <div key={s.id} style={{flex:1,textAlign:'center',padding:'10px 4px',borderRadius:8,background:i<=current?'var(--accent)':'var(--surface)',color:i<=current?'#fff':'var(--muted)',fontSize:11,transition:'all 0.3s'}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
              <div style={{fontWeight:i===current?700:400}}>{s.ko}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Presence Health */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Presence Health</span></div>
        {CHANNELS.map(ch=>{
          const st = STATUS_STYLE[ch.status]??STATUS_STYLE.healthy
          return <div key={ch.ch} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
            <div>
              <span style={{fontWeight:700,fontSize:13}}>{ch.ch}</span>
              <span style={{marginLeft:8,fontSize:10,color:st.color,fontWeight:600}}>{st.label}</span>
            </div>
            <div style={{display:'flex',gap:16,fontSize:11,color:'var(--muted)'}}>
              <span>{ch.cadence}</span>
              <span>Fatigue {ch.fatigue}%</span>
              <div style={{width:50}}>
                <div style={{height:6,borderRadius:3,background:'var(--surface)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${ch.score}%`,borderRadius:3,background:st.color}} />
                </div>
              </div>
              <span style={{fontFamily:'var(--mono)',fontWeight:600,color:st.color}}>{ch.score}</span>
            </div>
          </div>
        })}
      </div>

      {/* Recommendations */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">운영 추천</span></div>
        {RECS.map((r,i)=>(
          <div key={i} style={{padding:'8px 0',borderBottom:'1px solid var(--border)',display:'flex',gap:8,alignItems:'flex-start'}}>
            <span style={{fontSize:14}}>{r.sev==='info'?'✅':r.sev==='warning'?'⚠️':'🚨'}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{r.ch}</div>
              <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.6}}>{r.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>운영 리포트</div>
          <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
            현재 LinkedIn은 안정적으로 운영 중입니다.
            다만 Naver Blog가 휴면 상태입니다. 주 1회부터 재시작하세요.
            Facebook 피로도가 증가 중입니다. trust 콘텐츠를 늘려주세요.
          </p>
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>철학</div>
          <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
            연결 후 바로 게시하지 않습니다.
            먼저 분석하고, 운영 전략을 세팅한 뒤,
            정기 운영과 이벤트 운영을 분리합니다.
          </p>
        </div>
      </div>
    </div>
  )
}