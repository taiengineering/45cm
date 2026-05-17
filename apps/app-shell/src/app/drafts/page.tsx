"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
const BADGE:Record<string,string> = {draft:'badge-draft',humanized:'badge-humanized',pending_approval:'badge-pending',approved:'badge-approved',rejected:'badge-rejected',failed:'badge-failed',timeout:'badge-timeout'}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const reload = () => { setLoading(true); fetch(API+"/drafts?limit=30").then(r=>r.json()).then(d=>{setDrafts(d);setLoading(false)}).catch(()=>setLoading(false)) }
  useEffect(reload, [])

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <h1 className="page-title">Drafts</h1>
        <button className="btn" onClick={reload}>↻ Refresh</button>
      </div>
      <p className="page-sub">{drafts.length} drafts in workspace</p>
      {loading && !drafts.length ? <div><div className="skeleton" /><div className="skeleton" style={{marginTop:10}} /></div> : null}
      {!loading && !drafts.length && <div className="card empty">No drafts yet</div>}
      {drafts.map((d:any) => (
        <div key={d.id} className="draft-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <span className={`badge ${BADGE[d.status]||'badge-draft'}`}>{d.status}</span>
            <span style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{d.id?.slice(0,8)}</span>
          </div>
          {d.humanized_body && (
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:'var(--accent)',fontWeight:600,marginBottom:4,letterSpacing:0.3}}>HUMANIZED</div>
              <p style={{fontSize:13,lineHeight:1.7,color:'var(--fg)',maxHeight:100,overflow:'hidden'}}>{d.humanized_body?.slice(0,300)}{d.humanized_body?.length>300?'...':''}</p>
            </div>
          )}
          <div>
            <div style={{fontSize:11,color:'var(--muted)',fontWeight:600,marginBottom:4,letterSpacing:0.3}}>RAW DRAFT</div>
            <p style={{fontSize:12,lineHeight:1.6,color:'var(--muted)',maxHeight:60,overflow:'hidden'}}>{d.body?.slice(0,200)}{d.body?.length>200?'...':''}</p>
          </div>
          <div className="draft-meta">
            <span>type: {d.draft_type}</span>
            <span>trace: {d.metadata?.trace_id?.slice(0,8) ?? '—'}</span>
            <span>{new Date(d.created_at).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
