"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

type Cap = 'publish_post'|'publish_image'|'publish_video'|'publish_comment'|'analytics'|'messaging'
const CAP_LABEL: Record<Cap,string> = {publish_post:'Post',publish_image:'Image',publish_video:'Video',publish_comment:'Comment',analytics:'Analytics',messaging:'Message'}

interface Provider { provider:string; name:string; icon:string; capabilities:Cap[]; status:string }
interface Integration { provider:string; status:string; profile_name?:string; publish_target_name?:string; capabilities?:Cap[]; expires_at?:string }

const STEPS = ['로그인','권한 승인','게시 대상 선택','연결 완료']

export default function SettingsPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [ws, setWs] = useState<any>(null)
  const [connecting, setConnecting] = useState<string|null>(null)
  const [testResult, setTestResult] = useState<Record<string,string>>({})

  useEffect(() => {
    fetch(API+'/integrations/providers').then(r=>r.json()).then(d=>Array.isArray(d)?setProviders(d):null).catch(()=>{})
    fetch(API+'/workspace/integrations').then(r=>r.json()).then(d=>Array.isArray(d)?setIntegrations(d):null).catch(()=>{})
    fetch(API+'/workspace/settings').then(r=>r.json()).then(setWs).catch(()=>{})
    // Check URL params for connection success
    if(typeof window!=='undefined'){
      const p=new URLSearchParams(window.location.search)
      for(const[k,v] of p.entries()){if(v==='connected')setConnecting(null)}
    }
  }, [])

  const getIntegration = (provider: string): Integration|undefined => integrations.find(i=>i.provider===provider)
  const isConnected = (provider: string) => getIntegration(provider)?.status === 'connected'
  const isExpired = (provider: string) => { const i=getIntegration(provider); return i?.expires_at ? new Date(i.expires_at)<new Date() : false }

  const handleConnect = (provider: string) => {
    setConnecting(provider)
    window.open(API+'/oauth/'+provider+'/start', '_self')
  }

  const handleTest = async (provider: string) => {
    setTestResult({...testResult, [provider]: 'testing...'})
    try {
      const r = await fetch(API+'/integrations/health')
      const d = await r.json()
      const h = (d as any[]).find((x:any)=>x.provider===provider)
      if(h?.publishReady) setTestResult({...testResult, [provider]: '✅ 게시 가능'})
      else if(h?.connected) setTestResult({...testResult, [provider]: '⚠️ 연결됨, 권한 확인 필요'})
      else setTestResult({...testResult, [provider]: '❌ 연결 필요'})
    } catch { setTestResult({...testResult, [provider]: '❌ 확인 실패'}) }
  }

  const getStatusUI = (provider: string) => {
    const conn = isConnected(provider)
    const exp = isExpired(provider)
    if(conn && !exp) return { label:'Connected', color:'var(--green)', bg:'var(--green-soft)', action:'Reconnect', actionStyle:{fontSize:11,color:'var(--muted)'} }
    if(conn && exp) return { label:'Reconnect 필요', color:'var(--yellow)', bg:'var(--yellow-soft)', action:'Reconnect', actionStyle:{fontSize:11,background:'var(--yellow)',color:'#fff',border:'none'} }
    return { label:'Available', color:'var(--accent)', bg:'var(--surface)', action:'Connect', actionStyle:{fontSize:11,background:'var(--accent)',color:'#fff',border:'none'} }
  }

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">채널 연결 및 운영 설정</p>

      {/* Connection Wizard (if connecting) */}
      {connecting && (
        <div className="card" style={{borderColor:'var(--accent)',marginBottom:20}}>
          <div className="card-title" style={{marginBottom:12}}>{providers.find(p=>p.provider===connecting)?.icon} {providers.find(p=>p.provider===connecting)?.name} 연결 중...</div>
          <div style={{display:'flex',gap:8,marginBottom:8}}>
            {STEPS.map((s,i) => (
              <div key={s} style={{flex:1,textAlign:'center'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:i===0?'var(--accent)':'var(--border)',color:i===0?'#fff':'var(--muted)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>{i+1}</div>
                <div style={{fontSize:10,color:i===0?'var(--fg)':'var(--muted)',marginTop:4}}>{s}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:'var(--muted)'}}>브라우저에서 로그인 및 권한 승인을 완료하면 자동으로 돌아옵니다.</p>
        </div>
      )}

      {/* Channel Cards */}
      <div className="card-title" style={{marginBottom:12}}>채널 연동</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:24}}>
        {providers.map(ch => {
          const st = getStatusUI(ch.provider)
          const conn = isConnected(ch.provider)
          const ig = getIntegration(ch.provider)
          const comingSoon = ch.status === 'coming_soon'

          return (
            <div key={ch.provider} className="card" style={conn?{borderColor:'var(--green)'}:{}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:28}}>{ch.icon}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:700}}>{ch.name}</div>
                    {conn && ig?.profile_name && <div style={{fontSize:11,color:'var(--green)'}}>✓ {ig.profile_name}</div>}
                    {conn && ig?.publish_target_name && <div style={{fontSize:10,color:'var(--muted)'}}>게시 대상: {ig.publish_target_name}</div>}
                    {!conn && <span style={{fontSize:10,padding:'1px 6px',borderRadius:3,background:st.bg,color:st.color}}>{comingSoon?'Coming Soon':st.label}</span>}
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:4,alignItems:'flex-end'}}>
                  {!comingSoon && (
                    <button className="btn" onClick={()=>handleConnect(ch.provider)} style={st.actionStyle}>{st.action}</button>
                  )}
                  {conn && <button className="btn" onClick={()=>handleTest(ch.provider)} style={{fontSize:10,padding:'2px 8px'}}>Test</button>}
                </div>
              </div>

              {/* Capabilities */}
              <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:testResult[ch.provider]?8:0}}>
                {ch.capabilities.map(cap => (
                  <span key={cap} style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:conn?'var(--green-soft)':'var(--surface)',color:conn?'var(--green)':'var(--muted)'}}>
                    {conn?'✓':comingSoon?'–':'✓'} {CAP_LABEL[cap]}
                  </span>
                ))}
              </div>

              {/* Test result */}
              {testResult[ch.provider] && <div style={{fontSize:11,color:'var(--accent)',fontWeight:600}}>{testResult[ch.provider]}</div>}
            </div>
          )
        })}
      </div>

      {/* Workspace Settings */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>운영 설정</div>
          {ws && (
            <div style={{fontSize:13,lineHeight:2.2,color:'var(--muted)'}}>
              <div>Workspace: <span style={{color:'var(--fg)',fontWeight:600}}>{ws.workspace_id?.slice(0,8)}</span></div>
              <div>Approval: <span style={{color:ws.approval_required?'var(--green)':'var(--muted)',fontWeight:600}}>{ws.approval_required?'Required':'Optional'}</span></div>
              <div>Publish Mode: <span style={{color:'var(--accent)',fontWeight:600}}>mock</span></div>
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>연결 도움말</div>
          <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
            <strong>Connect</strong> 버튼을 누르면 해당 채널 로그인 페이지로 이동합니다.<br/>
            로그인 후 권한을 승인하면 자동으로 연결됩니다.<br/>
            <strong>Test</strong> 버튼으로 게시 가능 여부를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  )
}