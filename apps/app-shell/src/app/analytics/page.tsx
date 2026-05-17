"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
export default function AnalyticsPage() {
  const [s, setS] = useState<any>(null)
  useEffect(() => { fetch(API+"/analytics/summary").then(r=>r.json()).then(setS) }, [])
  if (!s) return <div style={{padding:24}}>Loading...</div>
  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Analytics</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
        {[{l:'Drafts',v:s.drafts,c:'#3b82f6'},{l:'CTA Clicks',v:s.cta_clicks,c:'#22c55e'},{l:'Leads',v:s.leads,c:'#f59e0b'},{l:'AI Cost',v:'$'+s.ai_cost_usd?.toFixed(4),c:'#8b5cf6'}].map(x => (
          <div key={x.l} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:20,textAlign:'center'}}>
            <div style={{fontSize:28,fontWeight:700,color:x.c}}>{x.v}</div>
            <div style={{fontSize:13,color:'var(--muted)',marginTop:4}}>{x.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
