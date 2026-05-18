"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function SystemPage() {
  const [queues, setQueues] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [audit, setAudit] = useState<any[]>([])

  useEffect(() => {
    fetch(API+'/ops/queues').then(r=>r.json()).then(setQueues).catch(()=>{})
    fetch(API+'/ops/alerts?active=true').then(r=>r.json()).then(d=>Array.isArray(d)?setAlerts(d):null).catch(()=>{})
    fetch(API+'/ops/audit').then(r=>r.json()).then(d=>Array.isArray(d)?setAudit(d):null).catch(()=>{})
  }, [])

  return (
    <div>
      <h1 className="page-title">System</h1>
      <p className="page-sub">Runtime 상태 + 비용 + Queue + Alerts</p>

      <div className="grid-3" style={{marginBottom:16}}>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)'}}>Active Alerts</div>
          <div className="stat-value" style={{color:alerts.length>0?'var(--red)':'var(--green)'}}>{alerts.length}</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)'}}>Queue Health</div>
          <div className="stat-value" style={{color:'var(--green)'}}>{queues?'✅':'—'}</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)'}}>Audit Entries</div>
          <div className="stat-value">{audit.length}</div>
        </div>
      </div>

      {/* Queue Status */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Queue Status</span></div>
        {queues?.queues ? Object.entries(queues.queues).map(([name, q]: [string, any]) => (
          <div key={name} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
            <span style={{fontFamily:'var(--mono)'}}>{name.replace('45.mkt.','')}</span>
            <div style={{display:'flex',gap:12}}>
              <span>W: {q.waiting??0}</span>
              <span>A: {q.active??0}</span>
              <span style={{color:'var(--green)'}}>C: {q.completed??0}</span>
              <span style={{color:q.failed>0?'var(--red)':'var(--muted)'}}>F: {q.failed??0}</span>
            </div>
          </div>
        )) : <div className="empty">Loading...</div>}
      </div>

      {/* Priority Table */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Queue Priority</span></div>
        {[{n:'Publish',p:1},{n:'Approval',p:2},{n:'Draft/Humanize',p:3},{n:'Visual',p:4},{n:'Analytics',p:5},{n:'Recommendation',p:6}].map(q => (
          <div key={q.n} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
            <span>{q.n}</span>
            <span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>P{q.p}</span>
          </div>
        ))}
      </div>

      {/* Recent Audit */}
      <div className="card">
        <div className="card-header"><span className="card-title">최근 Audit Log ({audit.length})</span></div>
        {audit.slice(0,10).map((a:any,i:number) => (
          <div key={a.id||i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
            <span style={{fontWeight:600}}>{a.action}</span>
            <span style={{color:'var(--muted)',fontFamily:'var(--mono)'}}>{new Date(a.created_at).toLocaleString('ko-KR')}</span>
          </div>
        ))}
        {audit.length===0 && <div className="empty">No audit entries</div>}
      </div>
    </div>
  )
}