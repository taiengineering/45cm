"use client"
import { useState } from "react"

type Mode = 'auto'|'assisted'|'manual'
const MODE_STYLE:Record<Mode,{color:string,label:string,labelKo:string,desc:string}> = {
  auto:{color:'var(--accent)',label:'Auto',labelKo:'자동',desc:'AI가 운영을 자동 수행'},
  assisted:{color:'var(--green)',label:'Assisted',labelKo:'추천+승인',desc:'AI가 추천하고 운영자가 승인'},
  manual:{color:'var(--yellow)',label:'Manual',labelKo:'수동',desc:'분석/추천만 제공, 실행은 사람'},
}

const CAPS = [{id:'cadence',name:'Cadence 유지'},{id:'cta',name:'CTA 제어'},{id:'publish',name:'Publish'},{id:'event',name:'이벤트'},{id:'recovery',name:'회복'},{id:'routing',name:'콘텐츠 라우팅'}]

const PROFILES = [{id:'conservative',name:'보수적',desc:'대부분 수동, 초기 도입 적합'},{id:'balanced',name:'균형',desc:'추천+승인 중심 (권장)'},{id:'aggressive',name:'적극적',desc:'대부분 자동'},{id:'human_first',name:'사람 우선',desc:'모두 수동'}]

const QUEUE = [
  {type:'publish',title:'LinkedIn: TAI Safety Checker 소개',risk:'low',confidence:82,status:'pending'},
  {type:'event',title:'서비스 점검 긴급 공지',risk:'high',confidence:45,status:'pending'},
  {type:'cta',title:'Blog Hard CTA 게시',risk:'medium',confidence:60,status:'pending'},
]

export default function ControlPage() {
  const [global, setGlobal] = useState<Mode>('assisted')
  const [caps, setCaps] = useState<Record<string,Mode>>({cadence:'auto',cta:'assisted',publish:'assisted',event:'manual',recovery:'auto',routing:'assisted'})
  const [profile, setProfile] = useState('balanced')

  return (
    <div>
      <h1 className="page-title">Operating Mode</h1>
      <p className="page-sub">AI와 사람이 함께 운영하는 Co-Pilot — Auto / Assisted / Manual</p>

      {/* Global Mode */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:10}}>글로벌 운영 모드</div>
        <div style={{display:'flex',gap:8}}>
          {(['auto','assisted','manual'] as Mode[]).map(m=>{
            const s = MODE_STYLE[m]
            return <div key={m} onClick={()=>setGlobal(m)} style={{flex:1,padding:'14px 12px',borderRadius:8,border:`2px solid ${global===m?s.color:'var(--border)'}`,cursor:'pointer',background:global===m?s.color+'15':'var(--bg)',textAlign:'center'}}>
              <div style={{fontSize:14,fontWeight:700,color:global===m?s.color:'var(--fg)'}}>{s.labelKo}</div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:4}}>{s.desc}</div>
            </div>
          })}
        </div>
      </div>

      {/* Per-capability */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:10}}>기능별 세부 설정</div>
        {CAPS.map(c=>(
          <div key={c.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:12,fontWeight:600}}>{c.name}</span>
            <div style={{display:'flex',gap:4}}>
              {(['auto','assisted','manual'] as Mode[]).map(m=>{
                const active = caps[c.id]===m
                return <button key={m} onClick={()=>setCaps({...caps,[c.id]:m})} style={{fontSize:10,padding:'3px 10px',borderRadius:4,border:active?'none':'1px solid var(--border)',background:active?MODE_STYLE[m].color:'transparent',color:active?'#fff':'var(--muted)',cursor:'pointer',fontWeight:active?700:400}}>{MODE_STYLE[m].label}</button>
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Profile */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:10}}>운영 프로필</div>
        <div style={{display:'flex',gap:6}}>
          {PROFILES.map(p=>(
            <div key={p.id} onClick={()=>setProfile(p.id)} style={{flex:1,padding:'10px 8px',borderRadius:8,border:`2px solid ${profile===p.id?'var(--accent)':'var(--border)'}`,cursor:'pointer',textAlign:'center'}}>
              <div style={{fontSize:12,fontWeight:700,color:profile===p.id?'var(--accent)':'var(--fg)'}}>{p.name}</div>
              <div style={{fontSize:9,color:'var(--muted)',marginTop:4}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Queue */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">승인 대기열 ({QUEUE.filter(q=>q.status==='pending').length})</span></div>
        {QUEUE.map((q,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
            <div>
              <div style={{fontSize:12,fontWeight:600}}>{q.title}</div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>
                Risk: <span style={{color:q.risk==='high'?'var(--red)':q.risk==='medium'?'var(--yellow)':'var(--green)'}}>{q.risk}</span>
                {' · '}Confidence: <span style={{fontFamily:'var(--mono)'}}>{q.confidence}%</span>
              </div>
            </div>
            <div style={{display:'flex',gap:4}}>
              <button style={{fontSize:10,padding:'4px 12px',borderRadius:4,background:'var(--green)',color:'#fff',border:'none',cursor:'pointer'}}>✅ 승인</button>
              <button style={{fontSize:10,padding:'4px 12px',borderRadius:4,background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)',cursor:'pointer'}}>❌</button>
            </div>
          </div>
        ))}
      </div>

      {/* Explainability */}
      <div className="card">
        <div className="card-title" style={{marginBottom:8}}>AI 판단 설명</div>
        <div style={{fontSize:11,color:'var(--muted)',lineHeight:2}}>
          <p>💡 Instagram은 최근 fatigue가 높아 cadence를 감소시켰습니다.</p>
          <p>💡 LinkedIn은 authority consistency가 안정적이므로 현재 cadence를 유지합니다.</p>
          <p>💡 Blog Hard CTA는 trust surface에서 위험하므로 승인이 필요합니다.</p>
        </div>
      </div>
    </div>
  )
}