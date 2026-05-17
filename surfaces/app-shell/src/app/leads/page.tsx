"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function LeadsPage() {
  const [summary, setSummary] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  useEffect(() => {
    fetch(API+'/analytics/summary').then(r=>r.json()).then(setSummary).catch(()=>{})
    fetch(API+'/analytics/events?limit=15').then(r=>r.json()).then(d=>setEvents((d||[]).filter((e:any)=>e.event_type==='cta.clicked'))).catch(()=>{})
  }, [])

  return (
    <div>
      <h1 className="page-title">Lead Console</h1>
      <p className="page-sub">리드 생성 및 전환 추적 — CTA 이전까지 Marketing Engine 책임</p>
      <div className="grid-4">
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--green)'}}>{summary?.cta_clicks??'—'}</div>
          <div className="stat-label">CTA 클릭</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--yellow)'}}>{summary?.leads??'—'}</div>
          <div className="stat-label">리드 생성</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--accent)'}}>{summary?.drafts??'—'}</div>
          <div className="stat-label">콘텐츠 생성</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--purple)'}}>{summary?.published??'—'}</div>
          <div className="stat-label">발행 완료</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">최근 CTA 클릭</span></div>
        {events.length===0 ? <div className="empty">No CTA events yet</div> : events.map((e:any,i:number) => (
          <div key={e.id||i} className="event-row">
            <span style={{fontWeight:600}}>cta.clicked</span>
            <span style={{color:'var(--muted)',fontFamily:'var(--mono)',fontSize:12}}>{e.subject_id?.slice(0,16)}</span>
            <span style={{color:'var(--muted)',fontSize:12}}>{new Date(e.created_at).toLocaleString('ko-KR')}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{marginTop:16,borderColor:'var(--border)'}}>
        <div className="card-title" style={{marginBottom:8}}>엔진 경계</div>
        <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
          Marketing Engine은 <strong>리드 생성</strong>까지 책임집니다.<br/>
          리드 처리 · 작업 배정 · 고객 관리는 <strong>관재엔진</strong> 책임입니다.
        </p>
      </div>
    </div>
  )
}