"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
export default function SystemPage() {
  const [h, setH] = useState<any>(null)
  const [o, setO] = useState<any>(null)
  const [r, setR] = useState<any>(null)
  useEffect(() => {
    fetch(API+"/health").then(r=>r.json()).then(setH).catch(()=>{})
    fetch(API+"/debug/openai").then(r=>r.json()).then(setO).catch(()=>{})
    fetch(API+"/debug/redis").then(r=>r.json()).then(setR).catch(()=>{})
  }, [])
  const Dot = ({ok}:{ok?:boolean}) => <span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:ok?'#22c55e':ok===false?'#ef4444':'gray',marginRight:6}} />
  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:16}}>System Status</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:16}}>
          <div style={{fontWeight:700,marginBottom:8}}>API</div>
          <Dot ok={h?.status==='healthy'} />{h?.status||'checking...'} {h?.v&&'— v'+h.v}
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:16}}>
          <div style={{fontWeight:700,marginBottom:8}}>OpenAI</div>
          <Dot ok={o?.ok} />{o?.ok?o.model+' — '+o.latency_ms+'ms':o?.error||'checking...'}
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:16}}>
          <div style={{fontWeight:700,marginBottom:8}}>Redis</div>
          <Dot ok={r?.ok} />{r?.ok?'Connected — '+r.latency_ms+'ms':r?.error||'checking...'}
        </div>
      </div>
    </div>
  )
}
