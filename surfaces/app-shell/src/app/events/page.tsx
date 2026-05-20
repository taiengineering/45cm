"use client"
import { useState } from "react"

const EVENT_TYPES = ['product_launch','event','notice','incident','issue','recruitment','viral','seasonal']
const EVENT_TYPE_KO:Record<string,string> = {product_launch:'신제품',event:'행사',notice:'공지',incident:'장애',issue:'이슈',recruitment:'채용',viral:'바이럴',seasonal:'시즌성'}
const PRIORITY_STYLE:Record<string,{color:string}> = {low:{color:'var(--muted)'},normal:{color:'var(--fg)'},high:{color:'var(--yellow)'},critical:{color:'var(--red)'}}

interface Evt {type:string,title:string,priority:string,channels:string[],status:string,created:string}
const MOCK_EVENTS: Evt[] = [
  {type:'notice',title:'서비스 점검 안내',priority:'high',channels:['linkedin','naver_blog'],status:'completed',created:'2026-05-15'},
  {type:'product_launch',title:'TAI Safety Checker v2 출시',priority:'high',channels:['linkedin','facebook','naver_blog'],status:'draft',created:'2026-05-20'},
]

export default function EventsPage() {
  const [events] = useState<Evt[]>(MOCK_EVENTS)
  return (
    <div>
      <h1 className="page-title">Event Center</h1>
      <p className="page-sub">이벤트성 운영 — 긴급 공지, 신제품, 장애 대응, 바이럴</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
        {['draft','active','completed','cancelled'].map(s=>(
          <div key={s} className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:700,fontFamily:'var(--mono)',color:s==='active'?'var(--accent)':'var(--fg)'}}>{events.filter(e=>e.status===s).length}</div>
            <div style={{fontSize:10,color:'var(--muted)',textTransform:'capitalize'}}>{s}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">이벤트 목록</span></div>
        {events.map((e,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <span style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:'var(--surface)',color:'var(--accent)',fontWeight:600}}>{EVENT_TYPE_KO[e.type]}</span>
              <span style={{fontSize:13,fontWeight:600}}>{e.title}</span>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center',fontSize:11}}>
              <span style={{color:PRIORITY_STYLE[e.priority]?.color??'var(--fg)',fontWeight:600}}>{e.priority}</span>
              <span style={{color:'var(--muted)'}}>{e.channels.length}채널</span>
              <span style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:e.status==='completed'?'var(--green-soft)':'var(--surface)',color:e.status==='completed'?'var(--green)':'var(--muted)'}}>{e.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title" style={{marginBottom:8}}>이벤트 유형</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          {EVENT_TYPES.map(t=>(
            <span key={t} style={{fontSize:10,padding:'4px 10px',borderRadius:4,background:'var(--surface)',color:'var(--accent)'}}>
              {EVENT_TYPE_KO[t]}
            </span>
          ))}
        </div>
        <p style={{fontSize:11,color:'var(--muted)',marginTop:12,lineHeight:1.8}}>
          이벤트 운영은 정기 운영과 달리 즉시성, burst, multi-channel 대응이 필요합니다.
          긴급 공지는 cadence override를 활성화하여 즉시 게시할 수 있습니다.
        </p>
      </div>
    </div>
  )
}