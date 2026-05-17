"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function SettingsPage() {
  const [s, setS] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { fetch(API+"/workspace/settings").then(r=>r.json()).then(setS).catch(()=>{}) }, [])

  const save = async () => {
    setSaving(true)
    await fetch(API+"/workspace/settings",{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(s)})
    setSaving(false)
  }

  if (!s) return <div style={{padding:24}}><div className="skeleton" /></div>

  return (
    <div style={{padding:24}}>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Workspace configuration</p>
      <div className="card" style={{maxWidth:500}}>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:6}}>Brand Voice</label>
          <select value={s.brand_voice||'tai'} onChange={e=>setS({...s,brand_voice:e.target.value})}
            style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14}}>
            <option value="tai">TAI Engineering</option>
            <option value="neutral">Neutral</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:6}}>Default CTA</label>
          <input value={s.default_cta||''} onChange={e=>setS({...s,default_cta:e.target.value})}
            style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14,boxSizing:'border-box'}} />
        </div>
        <div style={{marginBottom:16,display:'flex',gap:16}}>
          <label style={{fontSize:13,color:'var(--muted)',display:'flex',alignItems:'center',gap:6}}>
            <input type="checkbox" checked={s.approval_required??true} onChange={e=>setS({...s,approval_required:e.target.checked})} /> Approval Required
          </label>
          <label style={{fontSize:13,color:'var(--muted)',display:'flex',alignItems:'center',gap:6}}>
            <input type="checkbox" checked={s.linkedin_enabled??false} onChange={e=>setS({...s,linkedin_enabled:e.target.checked})} /> LinkedIn Enabled
          </label>
        </div>
        <button className="btn" onClick={save} style={{background:'var(--accent)',color:'#fff',border:'none'}}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}