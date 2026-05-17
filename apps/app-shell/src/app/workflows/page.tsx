"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [runs, setRuns] = useState<any[]>([])
  const [tab, setTab] = useState<'templates'|'runs'>('templates')
  useEffect(() => {
    fetch(API+"/workflows").then(r=>r.json()).then(setWorkflows).catch(()=>{})
    fetch(API+"/workflows/runs").then(r=>r.json()).then(setRuns).catch(()=>{})
  }, [])

  const runWorkflow = async (id: string) => {
    await fetch(API+"/workflows/"+id+"/run",{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})
    fetch(API+"/workflows/runs").then(r=>r.json()).then(setRuns).catch(()=>{})
    setTab('runs')
  }

  const STATUS_BADGE:Record<string,string> = {running:'badge-humanized',completed:'badge-approved',failed:'badge-rejected',waiting_approval:'badge-pending',cancelled:'badge-draft'}

  return (
    <div>
      <h1 className="page-title">Workflows</h1>
      <p className="page-sub">Automated operational pipelines</p>
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        <button className="btn" onClick={()=>setTab('templates')} style={tab==='templates'?{background:'var(--accent)',color:'#fff',border:'none'}:{}}>Templates ({workflows.length})</button>
        <button className="btn" onClick={()=>setTab('runs')} style={tab==='runs'?{background:'var(--accent)',color:'#fff',border:'none'}:{}}>Runs ({runs.length})</button>
      </div>

      {tab==='templates' && workflows.map((w:any) => (
        <div key={w.id} className="card" style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div>
              <span style={{fontWeight:700,fontSize:15}}>{w.name}</span>
              {w.template && <span className="badge badge-draft" style={{marginLeft:8}}>{w.template}</span>}
            </div>
            <button className="btn" onClick={()=>runWorkflow(w.id)} style={{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}}>▶ Run</button>
          </div>
          <p style={{fontSize:13,color:'var(--muted)',marginBottom:8}}>{w.description}</p>
          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
            {(w.steps||[]).map((s:any,i:number) => (
              <span key={i} style={{display:'flex',alignItems:'center',gap:4}}>
                <span style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:4,padding:'2px 8px',fontSize:11,fontFamily:'var(--mono)'}}>{s.type}</span>
                {i<(w.steps||[]).length-1 && <span style={{color:'var(--muted)',fontSize:10}}>→</span>}
              </span>
            ))}
          </div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:8}}>Trigger: {w.trigger_type} · Status: {w.status}</div>
        </div>
      ))}

      {tab==='runs' && (runs.length===0 ? <div className="card empty">No workflow runs yet</div> : runs.map((r:any) => (
        <div key={r.id} className="card" style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <span style={{fontWeight:600,fontSize:14}}>{(r.workflows as any)?.name ?? r.workflow_id?.slice(0,8)}</span>
            <span className={`badge ${STATUS_BADGE[r.status]||'badge-draft'}`}>{r.status}</span>
          </div>
          <div style={{fontSize:12,color:'var(--muted)',display:'flex',gap:16}}>
            <span>Step: {r.current_step}</span>
            <span style={{fontFamily:'var(--mono)'}}>trace: {r.trace_id?.slice(0,8)}</span>
            <span>{new Date(r.started_at).toLocaleString('ko-KR')}</span>
          </div>
        </div>
      )))}
    </div>
  )
}
