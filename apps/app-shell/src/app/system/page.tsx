"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function SystemPage() {
  const [h, setH] = useState<any>(null)
  const [o, setO] = useState<any>(null)
  const [r, setR] = useState<any>(null)
  const reload = () => {
    fetch(API+"/health").then(r=>r.json()).then(setH).catch(()=>setH({status:'error'}))
    fetch(API+"/debug/openai").then(r=>r.json()).then(setO).catch(()=>setO({ok:false,error:'unreachable'}))
    fetch(API+"/debug/redis").then(r=>r.json()).then(setR).catch(()=>setR({ok:false,error:'unreachable'}))
  }
  useEffect(reload, [])

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
        <h1 className="page-title">System Status</h1>
        <button className="btn" onClick={reload}>↻ Check</button>
      </div>
      <p className="page-sub">Runtime service health</p>
      <div className="grid-3">
        <div className="card">
          <div className="card-header"><span className="card-title">API Server</span></div>
          <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
            <span className={`dot ${h?.status==='healthy'?'dot-ok':h?'dot-err':'dot-loading'}`}></span>
            <span style={{fontSize:15,fontWeight:600}}>{h?.status==='healthy'?'Healthy':'Down'}</span>
          </div>
          {h?.v && <div style={{fontSize:12,color:'var(--muted)'}}>Version: {h.v}</div>}
          {h?.ts && <div style={{fontSize:12,color:'var(--muted)'}}>Time: {new Date(h.ts).toLocaleTimeString('ko-KR')}</div>}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">OpenAI</span></div>
          <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
            <span className={`dot ${o?.ok?'dot-ok':o?'dot-err':'dot-loading'}`}></span>
            <span style={{fontSize:15,fontWeight:600}}>{o?.ok?'Connected':o?.error?.slice(0,30)||'Checking...'}</span>
          </div>
          {o?.model && <div style={{fontSize:12,color:'var(--muted)'}}>Model: {o.model}</div>}
          {o?.latency_ms!=null && <div style={{fontSize:12,color:'var(--muted)'}}>Latency: {o.latency_ms}ms</div>}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Redis</span></div>
          <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
            <span className={`dot ${r?.ok?'dot-ok':r?'dot-err':'dot-loading'}`}></span>
            <span style={{fontSize:15,fontWeight:600}}>{r?.ok?'Connected':r?.error?.slice(0,30)||'Checking...'}</span>
          </div>
          {r?.latency_ms!=null && <div style={{fontSize:12,color:'var(--muted)'}}>Latency: {r.latency_ms}ms</div>}
        </div>
      </div>
    </div>
  )
}
