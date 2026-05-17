"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
export default function QueuesPage() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { fetch(API+"/ops/queues").then(r=>r.json()).then(setData) }, [])
  if (!data) return <div style={{padding:24}}>Loading...</div>
  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Queue Status</h1>
      {Object.entries(data.queues||{}).map(([name,q]:any) => (
        <div key={name} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:16,marginBottom:12}}>
          <div style={{fontWeight:700,fontFamily:'monospace',marginBottom:8}}>{name}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,textAlign:'center'}}>
            {['waiting','active','completed','failed','delayed'].map(k => (
              <div key={k}><div style={{fontSize:20,fontWeight:700,color:k==='failed'&&q[k]>0?'#ef4444':'var(--fg)'}}>{q[k]??0}</div><div style={{fontSize:10,color:'var(--muted)'}}>{k}</div></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
