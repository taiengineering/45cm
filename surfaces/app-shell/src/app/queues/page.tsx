"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function QueuesPage() {
  const [data, setData] = useState<any>(null)
  const reload = () => fetch(API+"/ops/queues").then(r=>r.json()).then(setData).catch(()=>{})
  useEffect(() => { reload(); const t=setInterval(reload,10000); return ()=>clearInterval(t) }, [])

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <h1 className="page-title">Queue Status</h1>
        <button className="btn" onClick={reload}>↻ Refresh</button>
      </div>
      <p className="page-sub">Auto-refresh every 10s{data?.ts ? ` · Last: ${new Date(data.ts).toLocaleTimeString('ko-KR')}` : ''}</p>
      {!data ? <div><div className="skeleton" /><div className="skeleton" style={{marginTop:10}} /></div> : null}
      {data && Object.entries(data.queues||{}).map(([name,q]:any) => {
        const hasIssue = (q.failed||0)>0||(q.waiting||0)>10
        return (
          <div key={name} className="card" style={{marginBottom:10,...(hasIssue?{borderColor:'var(--red)'}:{})}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span style={{fontWeight:700,fontSize:13,fontFamily:'var(--mono)'}}>{name}</span>
              {hasIssue && <span style={{color:'var(--red)',fontSize:11,fontWeight:600}}>⚠ ATTENTION</span>}
            </div>
            <div className="queue-stats">
              {['waiting','active','completed','failed','delayed'].map(k => (
                <div key={k} className="queue-stat" style={k==='failed'&&(q[k]||0)>0?{background:'var(--red-soft)'}:{}}>
                  <div className="queue-stat-val" style={k==='failed'&&(q[k]||0)>0?{color:'var(--red)'}:{}}>{q[k]??0}</div>
                  <div className="queue-stat-label">{k}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
