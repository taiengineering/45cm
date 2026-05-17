"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

function SettingsContent() {
  const searchParams = useSearchParams()
  const linkedinStatus = searchParams.get('linkedin')
  const [s, setS] = useState<any>(null)
  const [integrations, setIntegrations] = useState<any[]>([])
  const [plan, setPlan] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(API+"/workspace/settings").then(r=>r.json()).then(setS).catch(()=>{})
    fetch(API+"/workspace/integrations").then(r=>r.json()).then(setIntegrations).catch(()=>{})
    fetch(API+"/workspace/plan").then(r=>r.json()).then(setPlan).catch(()=>{})
  }, [])

  const save = async () => { setSaving(true); await fetch(API+"/workspace/settings",{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(s)}); setSaving(false) }

  const connectLinkedIn = async () => {
    const res = await fetch(API+"/oauth/linkedin/start").then(r=>r.json())
    if (res.url) window.location.href = res.url
    else alert(res.error || 'LinkedIn not configured')
  }

  const linkedin = integrations.find((i:any) => i.provider === 'linkedin')

  if (!s) return <div style={{padding:24}}><div className="skeleton" /></div>

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Workspace configuration</p>

      {linkedinStatus === 'connected' && (
        <div className="card" style={{marginBottom:16,borderColor:'var(--green)',background:'var(--green-soft)'}}>
          <span style={{color:'var(--green)',fontWeight:600}}>✅ LinkedIn connected successfully!</span>
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">General</span></div>
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
          </div>
          <button className="btn" onClick={save} style={{background:'var(--accent)',color:'#fff',border:'none'}}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header"><span className="card-title">LinkedIn Integration</span></div>
            {linkedin ? (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <span className={`dot ${linkedin.status==='connected'?'dot-ok':'dot-err'}`}></span>
                  <span style={{fontSize:14,fontWeight:600}}>{linkedin.status === 'connected' ? 'Connected' : linkedin.status}</span>
                </div>
                {linkedin.expires_at && <div style={{fontSize:12,color:'var(--muted)'}}>Expires: {new Date(linkedin.expires_at).toLocaleDateString('ko-KR')}</div>}
              </div>
            ) : (
              <div>
                <p style={{fontSize:13,color:'var(--muted)',marginBottom:12}}>Connect LinkedIn to publish drafts directly.</p>
                <button className="btn" onClick={connectLinkedIn} style={{background:'#0a66c2',color:'#fff',border:'none'}}>
                  🔗 Connect LinkedIn
                </button>
              </div>
            )}
          </div>

          {plan && (
            <div className="card">
              <div className="card-header"><span className="card-title">Plan & Usage</span></div>
              <div style={{fontSize:13,lineHeight:2,color:'var(--muted)'}}>
                <div>Plan: <span style={{color:'var(--fg)',fontWeight:600}}>{plan.plan?.plan || 'free'}</span></div>
                <div>AI Cost Limit: ${plan.plan?.max_ai_cost_per_month}/month</div>
                <div>Current AI Cost: ${(plan.usage?.ai_cost_usd || 0).toFixed(4)}</div>
                <div>Drafts this month: {plan.usage?.draft_count || 0}</div>
                <div>Publishes this month: {plan.usage?.publish_count || 0}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return <Suspense fallback={<div style={{padding:24}}><div className="skeleton" /></div>}><SettingsContent /></Suspense>
}
