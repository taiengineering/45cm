"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
export default function DraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetch(API+"/drafts").then(r=>r.json()).then(d=>{setDrafts(d);setLoading(false)}).catch(()=>setLoading(false)) }, [])
  if (loading) return <div style={{padding:24}}>Loading...</div>
  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Drafts ({drafts.length})</h1>
      {drafts.map((d:any) => (
        <div key={d.id} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:16,marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <span style={{background:d.status==='humanized'?'#3b82f6':d.status==='approved'?'#22c55e':'#6b7280',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:12}}>{d.status}</span>
            <span style={{fontSize:11,color:'var(--muted)',fontFamily:'monospace'}}>{d.id?.slice(0,8)}</span>
          </div>
          <p style={{fontSize:13,color:'var(--fg)',maxHeight:80,overflow:'hidden'}}>{(d.humanized_body||d.body||'').slice(0,200)}</p>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:8}}>trace: {d.metadata?.trace_id?.slice(0,8)} | {new Date(d.created_at).toLocaleString('ko-KR')}</div>
        </div>
      ))}
    </div>
  )
}
