"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

type Cap = 'publish_post'|'publish_image'|'publish_video'|'publish_comment'|'analytics'|'messaging'
const CAP_LABEL: Record<Cap,string> = {publish_post:'Post',publish_image:'Image',publish_video:'Video',publish_comment:'Comment',analytics:'Analytics',messaging:'Message'}

interface Channel { provider:string; name:string; icon:string; capabilities:Cap[]; status:'connected'|'available'|'coming_soon'; statusColor:string }

const CHANNELS: Channel[] = [
  {provider:'linkedin',name:'LinkedIn',icon:'🔗',capabilities:['publish_post','publish_image','publish_comment','analytics'],status:'available',statusColor:'var(--accent)'},
  {provider:'facebook',name:'Facebook',icon:'📘',capabilities:['publish_post','publish_image','publish_comment','analytics'],status:'available',statusColor:'var(--accent)'},
  {provider:'naver_blog',name:'Naver Blog',icon:'🟢',capabilities:['publish_post','publish_image'],status:'available',statusColor:'var(--accent)'},
  {provider:'instagram',name:'Instagram',icon:'📸',capabilities:['publish_image','publish_video','analytics'],status:'coming_soon',statusColor:'var(--muted)'},
  {provider:'youtube',name:'YouTube',icon:'🎥',capabilities:['publish_video','analytics'],status:'coming_soon',statusColor:'var(--muted)'},
  {provider:'x_twitter',name:'X (Twitter)',icon:'𝕏',capabilities:['publish_post','publish_image','analytics'],status:'coming_soon',statusColor:'var(--muted)'},
  {provider:'threads',name:'Threads',icon:'🧵',capabilities:['publish_post','publish_image'],status:'coming_soon',statusColor:'var(--muted)'},
]

export default function SettingsPage() {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [ws, setWs] = useState<any>(null)

  useEffect(() => {
    fetch(API+'/workspace/integrations').then(r=>r.json()).then(d=>Array.isArray(d)?setIntegrations(d):null).catch(()=>{})
    fetch(API+'/workspace/settings').then(r=>r.json()).then(setWs).catch(()=>{})
  }, [])

  const getStatus = (provider: string) => {
    const i = integrations.find((x:any)=>x.provider===provider)
    if (i) return i.status === 'connected' ? 'connected' : i.status
    return null
  }

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">운영 설정 및 채널 연동</p>

      {/* Channel Integrations */}
      <div className="card-title" style={{marginBottom:12}}>채널 연동</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:24}}>
        {CHANNELS.map(ch => {
          const st = getStatus(ch.provider)
          const isConnected = st === 'connected'
          return (
            <div key={ch.provider} className="card" style={isConnected?{borderColor:'var(--green)'}:{}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:28}}>{ch.icon}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:700}}>{ch.name}</div>
                    <span style={{fontSize:10,padding:'1px 6px',borderRadius:3,background:isConnected?'var(--green-soft)':ch.status==='coming_soon'?'var(--surface)':'var(--surface)',color:isConnected?'var(--green)':ch.statusColor}}>
                      {isConnected?'✓ Connected':ch.status==='coming_soon'?'Coming Soon':'Available'}
                    </span>
                  </div>
                </div>
                {ch.status!=='coming_soon' && (
                  <button className="btn" onClick={()=>window.open(API+'/oauth/'+ch.provider+'/start','_blank')} style={isConnected?{fontSize:11,color:'var(--muted)'}:{fontSize:11,background:'var(--accent)',color:'#fff',border:'none'}}>
                    {isConnected?'Reconnect':'Connect'}
                  </button>
                )}
              </div>
              {/* Capabilities */}
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {ch.capabilities.map(cap => (
                  <span key={cap} style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:'var(--surface)',color:'var(--fg)'}}>
                    {ch.status==='coming_soon'?'–':'✓'} {CAP_LABEL[cap]}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Workspace Settings */}
      <div className="card-title" style={{marginBottom:12}}>운영 설정</div>
      <div className="card">
        {ws && (
          <div style={{fontSize:13,lineHeight:2.2,color:'var(--muted)'}}>
            <div>Workspace: <span style={{color:'var(--fg)',fontWeight:600}}>{ws.workspace_id?.slice(0,8)}</span></div>
            <div>Approval Required: <span style={{color:ws.approval_required?'var(--green)':'var(--muted)',fontWeight:600}}>{ws.approval_required?'Yes':'No'}</span></div>
            <div>Publish Mode: <span style={{color:'var(--accent)',fontWeight:600}}>mock</span></div>
            <div>Default Channel: <span style={{fontWeight:600}}>LinkedIn</span></div>
          </div>
        )}
        {!ws && <div className="empty">설정을 불러오는 중...</div>}
      </div>

      {/* Integration Health */}
      <div className="card" style={{marginTop:16}}>
        <div className="card-title" style={{marginBottom:8}}>핵심 원칙</div>
        <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
          새 채널 추가 = Adapter 구현 + Registry 등록.<br/>
          모든 채널은 동일한 인터페이스를 사용합니다.<br/>
          connect → validate → publish → health
        </p>
      </div>
    </div>
  )
}