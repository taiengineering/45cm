"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [showAll, setShowAll] = useState(false)
  const reload = () => fetch(API+"/ops/alerts"+(showAll?'':'?active=true')).then(r=>r.json()).then(setAlerts).catch(()=>{})
  useEffect(() => { reload() }, [showAll])

  const resolve = async (id:string) => { await fetch(API+"/ops/alerts/"+id+"/resolve",{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}); reload() }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <h1 className="page-title">Runtime Alerts</h1>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>setShowAll(!showAll)}>{showAll?'Active Only':'Show All'}</button>
          <button className="btn" onClick={reload}>↻ Refresh</button>
        </div>
      </div>
      <p className="page-sub">{alerts.length} alerts</p>
      {alerts.length===0 && <div className="card empty">No active alerts ✅</div>}
      {alerts.map((a:any) => (
        <div key={a.id} className="card" style={{marginBottom:10,borderColor:a.severity==='critical'?'var(--red)':a.severity==='warning'?'var(--yellow)':'var(--border)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:16}}>{a.severity==='critical'?'🚨':a.severity==='warning'?'⚠️':'ℹ️'}</span>
              <span className={`badge ${a.severity==='critical'?'badge-rejected':a.severity==='warning'?'badge-pending':'badge-draft'}`}>{a.severity}</span>
              <span style={{fontSize:12,color:'var(--muted)'}}>{a.service}</span>
            </div>
            {!a.resolved && <button className="btn" onClick={()=>resolve(a.id)} style={{fontSize:12,padding:'4px 10px'}}>Resolve</button>}
            {a.resolved && <span className="badge badge-approved">resolved</span>}
          </div>
          <p style={{fontSize:13,marginBottom:6}}>{a.message}</p>
          <span style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{new Date(a.created_at).toLocaleString('ko-KR')}</span>
        </div>
      ))}
    </div>
  )
}
