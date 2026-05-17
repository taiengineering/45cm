"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function DashboardPage() {
  const [s, setS] = useState<any>(null)
  const [q, setQ] = useState<any>(null)
  const [h, setH] = useState<any>(null)
  useEffect(() => {
    fetch(API+"/analytics/summary").then(r=>r.json()).then(setS).catch(()=>{})
    fetch(API+"/ops/queues").then(r=>r.json()).then(setQ).catch(()=>{})
    fetch(API+"/health").then(r=>r.json()).then(setH).catch(()=>{})
  }, [])

  const totalFailed = q ? Object.values(q.queues||{}).reduce((a:number,v:any)=>a+(v.failed||0),0) as number : 0

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">45cm Marketing Runtime Overview</p>
      <div className="grid-4">
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--accent)'}}>{s?.drafts ?? '—'}</div>
          <div className="stat-label">Total Drafts</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--green)'}}>{s?.cta_clicks ?? '—'}</div>
          <div className="stat-label">CTA Clicks</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--yellow)'}}>{s?.leads ?? '—'}</div>
          <div className="stat-label">Leads</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--purple)'}}>${s?.ai_cost_usd?.toFixed(4) ?? '—'}</div>
          <div className="stat-label">AI Cost (USD)</div>
        </div>
      </div>
      <div className="grid-3">
        <div className="card">
          <div className="card-header"><span className="card-title">API Status</span></div>
          <span className={`dot ${h?.status==='healthy'?'dot-ok':'dot-err'}`}></span>
          <span style={{fontSize:14}}>{h?.status || 'checking...'} {h?.v && `— v${h.v}`}</span>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Queue Health</span></div>
          <span className={`dot ${totalFailed===0?'dot-ok':'dot-err'}`}></span>
          <span style={{fontSize:14}}>{totalFailed === 0 ? 'All Clear' : `${totalFailed} Failed Jobs`}</span>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Runtime</span></div>
          <span className="dot dot-ok"></span>
          <span style={{fontSize:14}}>Marketing Engine Active</span>
        </div>
      </div>
    </div>
  )
}
