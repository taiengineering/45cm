"use client"
import { useState, useEffect, use } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
const BADGE:Record<string,string> = {draft:'badge-draft',humanized:'badge-humanized',pending_approval:'badge-pending',approved:'badge-approved',rejected:'badge-rejected',failed:'badge-failed',published:'badge-approved'}

export default function DraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [d, setD] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetch(API+"/drafts/"+id).then(r=>r.json()).then(data=>{setD(data);setLoading(false)}).catch(()=>setLoading(false)) }, [id])

  if (loading) return <div style={{padding:24}}><div className="skeleton" /></div>
  if (!d) return <div style={{padding:24}} className="card empty">Draft not found</div>

  const steps = [
    { label:'Draft', done: true },
    { label:'Humanize', done: !!d.humanized_body },
    { label:'Approval', done: d.status==='approved'||d.status==='published' },
    { label:'Publish', done: d.status==='published' },
  ]

  return (
    <div style={{padding:24}}>
      <a href="/drafts" style={{fontSize:13,color:'var(--accent)',marginBottom:16,display:'inline-block'}}>← Back to Drafts</a>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <h1 className="page-title">Draft Detail</h1>
        <span className={`badge ${BADGE[d.status]||'badge-draft'}`}>{d.status}</span>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Runtime Timeline</span></div>
        <div style={{display:'flex',gap:0,alignItems:'center'}}>
          {steps.map((s,i) => (
            <div key={s.label} style={{display:'flex',alignItems:'center',flex:1}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:s.done?'var(--accent)':'var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:s.done?'#fff':'var(--muted)',flexShrink:0}}>{i+1}</div>
              <span style={{fontSize:12,marginLeft:6,color:s.done?'var(--fg)':'var(--muted)',fontWeight:s.done?600:400}}>{s.label}</span>
              {i<steps.length-1 && <div style={{flex:1,height:2,background:s.done?'var(--accent)':'var(--border)',margin:'0 8px'}} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">Humanized Draft</span></div>
          <p style={{fontSize:13,lineHeight:1.7,whiteSpace:'pre-wrap'}}>{d.humanized_body || '(not yet humanized)'}</p>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Original Draft</span></div>
          <p style={{fontSize:13,lineHeight:1.7,color:'var(--muted)',whiteSpace:'pre-wrap'}}>{d.body}</p>
        </div>
      </div>
      <div className="grid-3">
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>Info</div>
          <div style={{fontSize:12,color:'var(--muted)',lineHeight:2}}>
            <div>Type: {d.draft_type}</div>
            <div>Created: {new Date(d.created_at).toLocaleString('ko-KR')}</div>
            <div style={{fontFamily:'var(--mono)'}}>ID: {d.id}</div>
            <div style={{fontFamily:'var(--mono)'}}>Trace: {d.metadata?.trace_id||'—'}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>AI Usage</div>
          {d.ai_usage ? (
            <div style={{fontSize:12,color:'var(--muted)',lineHeight:2}}>
              <div>Model: {d.ai_usage.model}</div>
              <div>Tokens: {d.ai_usage.prompt_tokens+d.ai_usage.completion_tokens}</div>
              <div>Cost: ${d.ai_usage.estimated_cost_usd}</div>
              <div>Latency: {d.ai_usage.latency_ms}ms</div>
            </div>
          ) : <p style={{fontSize:12,color:'var(--muted)'}}>No data</p>}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>Approvals ({d.approvals?.length||0})</div>
          {(d.approvals||[]).map((a:any) => (
            <div key={a.id} style={{fontSize:12,color:'var(--muted)',marginBottom:4}}>
              <span className={`badge ${BADGE[a.status]||'badge-draft'}`} style={{marginRight:6}}>{a.status}</span>
              {new Date(a.created_at).toLocaleString('ko-KR')}
            </div>
          ))}
          {!d.approvals?.length && <p style={{fontSize:12,color:'var(--muted)'}}>None</p>}
        </div>
      </div>
    </div>
  )
}