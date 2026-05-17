"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function AnalyticsPage() {
  const [s, setS] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  useEffect(() => {
    fetch(API+"/analytics/summary").then(r=>r.json()).then(setS).catch(()=>{})
    fetch(API+"/analytics/events?limit=15").then(r=>r.json()).then(setEvents).catch(()=>{})
  }, [])

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <p className="page-sub">Runtime metrics & events</p>
      <div className="grid-4">
        {[
          {l:'Total Drafts',v:s?.drafts,c:'var(--accent)'},
          {l:'CTA Clicks',v:s?.cta_clicks,c:'var(--green)'},
          {l:'Leads',v:s?.leads,c:'var(--yellow)'},
          {l:'AI Cost',v:s?'$'+s.ai_cost_usd?.toFixed(4):'—',c:'var(--purple)'},
        ].map(x => (
          <div key={x.l} className="card" style={{textAlign:'center'}}>
            <div className="stat-value" style={{color:x.c}}>{x.v??'—'}</div>
            <div className="stat-label">{x.l}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Recent Events</span></div>
        {events.length===0 ? <div className="empty">No events</div> : events.map((e:any,i:number) => (
          <div key={e.id||i} className="event-row">
            <span style={{fontWeight:600,fontSize:13}}>{e.event_type}</span>
            <span style={{color:'var(--muted)',fontFamily:'var(--mono)',fontSize:12}}>{e.subject_id?.slice(0,16)}</span>
            <span style={{color:'var(--muted)',fontSize:12}}>{new Date(e.created_at).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
