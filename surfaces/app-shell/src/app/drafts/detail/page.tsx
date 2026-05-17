"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
const BADGE:Record<string,string> = {draft:'badge-draft',humanized:'badge-humanized',pending_approval:'badge-pending',approved:'badge-approved',rejected:'badge-rejected',failed:'badge-failed',published:'badge-approved',publishing:'badge-humanized'}

const PRESETS = [
  {id:'tai_pro',name:'TAI Professional',bg:'#0f172a',fg:'#e2e8f0',accent:'#3b82f6'},
  {id:'safety_alert',name:'Safety Alert',bg:'#1e1e1e',fg:'#fef2f2',accent:'#f97316'},
  {id:'clean_corp',name:'Clean Corporate',bg:'#ffffff',fg:'#0f172a',accent:'#0ea5e9'},
]

function DraftDetail() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [d, setD] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview'|'visual'|'publish'|'timeline'>('overview')
  const [preset, setPreset] = useState(PRESETS[0])
  const [ctaLevel, setCtaLevel] = useState(3)
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('09:00')
  const [scheduled, setScheduled] = useState(false)

  useEffect(() => { if(!id){setLoading(false);return;} fetch(API+"/drafts/"+id).then(r=>r.json()).then(data=>{setD(data);setLoading(false)}).catch(()=>setLoading(false)) }, [id])

  if (loading) return <div><div className="skeleton" /><div className="skeleton" style={{marginTop:10}} /></div>
  if (!d) return <div className="card empty">Draft not found. <a href="/drafts" style={{color:'var(--accent)'}}>Back</a></div>

  const title = (d.humanized_body || d.body || '').split('\n')[0]?.slice(0, 60) || '중대재해처벌법 핵심 정리'
  const body = d.humanized_body || d.body || ''
  const ctaTexts: Record<number,string> = {1:'참고해보세요',2:'자세히 보기',3:'무료 진단 받기',4:'지금 바로 신청',5:'👉 지금 바로 신청!'}

  const steps = [
    {label:'Draft',done:true,icon:'📝'},
    {label:'Humanize',done:!!d.humanized_body,icon:'✨'},
    {label:'Visual',done:false,icon:'🖼️'},
    {label:'Schedule',done:scheduled||d.status==='publishing'||d.status==='published',icon:'📅'},
    {label:'Approval',done:d.status==='approved'||d.status==='published',icon:'✅'},
    {label:'Publish',done:d.status==='published',icon:'🚀'},
  ]

  const handleSchedule = async () => {
    if(!scheduleDate) return
    await fetch(API+'/calendar/schedule',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({workspaceId:'a0000000-0000-0000-0000-000000000001',draftId:id,channel:'linkedin',scheduledAt:scheduleDate+'T'+scheduleTime+':00+09:00'})})
    setScheduled(true)
  }

  const handleApproval = async () => {
    await fetch(API+'/approval/request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({workspaceId:'a0000000-0000-0000-0000-000000000001',draftId:id})})
    window.location.reload()
  }

  const TABS = [{id:'overview' as const,label:'Overview'},{id:'visual' as const,label:'Visual Assets'},{id:'publish' as const,label:'Publish Preview'},{id:'timeline' as const,label:'Timeline'}]

  return (
    <div>
      <a href="/drafts" style={{fontSize:13,color:'var(--accent)',marginBottom:12,display:'inline-block'}}>← Drafts</a>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <h1 className="page-title">Draft Detail</h1>
        <span className={`badge ${BADGE[d.status]||'badge-draft'}`}>{d.status}</span>
      </div>

      {/* Flow Steps */}
      <div className="card" style={{marginBottom:16,padding:16}}>
        <div style={{display:'flex',alignItems:'center'}}>
          {steps.map((s,i) => (
            <div key={s.label} style={{display:'flex',alignItems:'center',flex:1}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:s.done?'var(--accent)':'var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>{s.done?s.icon:i+1}</div>
              <span style={{fontSize:11,marginLeft:4,color:s.done?'var(--fg)':'var(--muted)',fontWeight:s.done?600:400}}>{s.label}</span>
              {i<steps.length-1 && <div style={{flex:1,height:2,background:s.done?'var(--accent)':'var(--border)',margin:'0 6px'}} />}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {TABS.map(t => <button key={t.id} className="btn" onClick={()=>setActiveTab(t.id)} style={activeTab===t.id?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>{t.label}</button>)}
      </div>

      {/* Overview */}
      {activeTab==='overview' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div className="card">
            <div className="card-header"><span className="card-title">Humanized</span></div>
            <p style={{fontSize:13,lineHeight:1.8,whiteSpace:'pre-wrap'}}>{d.humanized_body||'(아직 humanize 안 됨)'}</p>
          </div>
          <div>
            <div className="card" style={{marginBottom:12}}>
              <div className="card-header"><span className="card-title">Info</span></div>
              <div style={{fontSize:12,color:'var(--muted)',lineHeight:2.2}}>
                <div>Type: {d.draft_type}</div>
                <div>Created: {new Date(d.created_at).toLocaleString('ko-KR')}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:11}}>ID: {d.id}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:11}}>Trace: {d.metadata?.trace_id||'—'}</div>
              </div>
            </div>
            {d.ai_usage && (
              <div className="card" style={{marginBottom:12}}>
                <div className="card-header"><span className="card-title">AI Usage</span></div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:2}}>
                  <div>Model: {d.ai_usage.model}</div>
                  <div>Cost: ${d.ai_usage.estimated_cost_usd}</div>
                  <div>Latency: {d.ai_usage.latency_ms}ms</div>
                </div>
              </div>
            )}
            {/* Actions */}
            <div className="card">
              <div className="card-header"><span className="card-title">Actions</span></div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                <button className="btn" onClick={()=>setActiveTab('visual')} style={{justifyContent:'center'}}>🖼️ Visual Assets 생성</button>
                <button className="btn" onClick={()=>setActiveTab('publish')} style={{justifyContent:'center'}}>🚀 Publish Preview</button>
                {d.status==='humanized' && <button className="btn" onClick={handleApproval} style={{background:'var(--accent)',color:'#fff',border:'none',justifyContent:'center'}}>✅ Slack 승인 요청</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Assets */}
      {activeTab==='visual' && (
        <div>
          <div style={{display:'flex',gap:8,marginBottom:16}}>
            {PRESETS.map(p => <button key={p.id} className="btn" onClick={()=>setPreset(p)} style={preset.id===p.id?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>{p.name}</button>)}
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:12,color:'var(--muted)',marginRight:8}}>CTA 강도:</label>
            <input type="range" min={1} max={5} value={ctaLevel} onChange={e=>setCtaLevel(parseInt(e.target.value))} style={{accentColor:'var(--accent)',verticalAlign:'middle'}} />
            <span style={{fontSize:12,color:'var(--accent)',marginLeft:8,fontFamily:'var(--mono)'}}>{ctaLevel}/5</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {['LinkedIn Card','CTA Banner','Blog Cover','FAQ Card'].map(type => (
              <div key={type} className="card" style={{padding:0,overflow:'hidden'}}>
                <div style={{background:preset.bg,color:preset.fg,padding:24,minHeight:type==='CTA Banner'?100:160,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontSize:9,fontWeight:600,color:preset.accent,textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>TAI Engineering</div>
                    <div style={{fontSize:type==='CTA Banner'?16:18,fontWeight:700,lineHeight:1.3,maxWidth:'85%'}}>{title}</div>
                    {type!=='CTA Banner' && <div style={{width:30,height:2,background:preset.accent,borderRadius:1,marginTop:8}} />}
                  </div>
                  {ctaLevel > 0 && <div style={{marginTop:12}}><span style={{background:preset.accent,color:preset.bg==='#ffffff'?'#fff':preset.fg,padding:'6px 14px',borderRadius:5,fontSize:11,fontWeight:600}}>{ctaTexts[ctaLevel]}</span></div>}
                </div>
                <div style={{padding:'8px 12px',fontSize:11,color:'var(--muted)',display:'flex',justifyContent:'space-between'}}>
                  <span>{type}</span>
                  <span>{preset.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish Preview */}
      {activeTab==='publish' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
          <div>
            <div className="card-title" style={{marginBottom:12}}>LinkedIn 게시 미리보기</div>
            <div className="card" style={{padding:0,overflow:'hidden'}}>
              {/* LinkedIn post mockup */}
              <div style={{padding:16,display:'flex',alignItems:'center',gap:10,borderBottom:'1px solid var(--border)'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#fff'}}>T</div>
                <div><div style={{fontSize:14,fontWeight:600}}>TAI Engineering</div><div style={{fontSize:11,color:'var(--muted)'}}>1,234 followers · Just now</div></div>
              </div>
              <div style={{padding:16}}><p style={{fontSize:13,lineHeight:1.8,whiteSpace:'pre-wrap'}}>{body.slice(0,400)}{body.length>400?'...':''}</p></div>
              <div style={{background:preset.bg,color:preset.fg,padding:20,borderTop:'1px solid var(--border)'}}>
                <div style={{fontSize:9,fontWeight:600,color:preset.accent,textTransform:'uppercase',letterSpacing:1,marginBottom:4}}>TAI Engineering</div>
                <div style={{fontSize:16,fontWeight:700,lineHeight:1.3}}>{title}</div>
                {ctaLevel>2 && <div style={{marginTop:10}}><span style={{background:preset.accent,color:'#fff',padding:'6px 14px',borderRadius:5,fontSize:11,fontWeight:600}}>{ctaTexts[ctaLevel]}</span></div>}
              </div>
              <div style={{padding:'10px 16px',display:'flex',gap:20,fontSize:12,color:'var(--muted)',borderTop:'1px solid var(--border)'}}>
                <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>📨 Send</span>
              </div>
            </div>
          </div>
          <div>
            <div className="card" style={{marginBottom:12}}>
              <div className="card-title" style={{marginBottom:8}}>예약 발행</div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>날짜</label>
                <input type="date" value={scheduleDate} onChange={e=>setScheduleDate(e.target.value)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,boxSizing:'border-box'}} />
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>시간</label>
                <input type="time" value={scheduleTime} onChange={e=>setScheduleTime(e.target.value)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,boxSizing:'border-box'}} />
              </div>
              {scheduled ? <div style={{color:'var(--green)',fontSize:13,fontWeight:600}}>✅ 예약 완료</div> : <button className="btn" onClick={handleSchedule} style={{width:'100%',justifyContent:'center',background:'var(--accent)',color:'#fff',border:'none'}}>📅 예약 등록</button>}
            </div>
            <div className="card" style={{marginBottom:12}}>
              <div className="card-title" style={{marginBottom:8}}>발행 전 검사</div>
              {[
                {name:'Humanized 콘텐츠',ok:!!d.humanized_body},
                {name:'Brand Voice 적용',ok:true},
                {name:'CTA 설정',ok:ctaLevel>0},
                {name:'채널 설정',ok:true},
                {name:'Visual Asset',ok:false},
              ].map(c => (
                <div key={c.name} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'4px 0'}}>
                  <span>{c.name}</span>
                  <span className={`badge ${c.ok?'badge-approved':'badge-draft'}`}>{c.ok?'✓':'—'}</span>
                </div>
              ))}
            </div>
            {d.status==='humanized' && <button className="btn" onClick={handleApproval} style={{width:'100%',justifyContent:'center',background:'var(--green)',color:'#fff',border:'none'}}>✅ Slack 승인 요청</button>}
          </div>
        </div>
      )}

      {/* Timeline */}
      {activeTab==='timeline' && (
        <div>
          <div className="grid-3">
            <div className="card">
              <div className="card-title" style={{marginBottom:8}}>Approvals ({d.approvals?.length||0})</div>
              {(d.approvals||[]).map((a:any) => (
                <div key={a.id} style={{fontSize:12,color:'var(--muted)',marginBottom:6}}>
                  <span className={`badge ${BADGE[a.status]||'badge-draft'}`} style={{marginRight:6}}>{a.status}</span>
                  {new Date(a.created_at).toLocaleString('ko-KR')}
                </div>
              ))}
              {!d.approvals?.length && <p style={{fontSize:12,color:'var(--muted)'}}>None</p>}
            </div>
            <div className="card">
              <div className="card-title" style={{marginBottom:8}}>Publishes ({d.publishes?.length||0})</div>
              {(d.publishes||[]).map((p:any) => (
                <div key={p.id} style={{fontSize:12,color:'var(--muted)',marginBottom:6}}>
                  <span className={`badge ${BADGE[p.status]||'badge-draft'}`} style={{marginRight:6}}>{p.status}</span>
                  {p.channel} · {new Date(p.created_at).toLocaleString('ko-KR')}
                </div>
              ))}
              {!d.publishes?.length && <p style={{fontSize:12,color:'var(--muted)'}}>None</p>}
            </div>
            <div className="card">
              <div className="card-title" style={{marginBottom:8}}>AI Usage</div>
              {d.ai_usage ? (
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:2}}>
                  <div>Model: {d.ai_usage.model}</div>
                  <div>Tokens: {(d.ai_usage.prompt_tokens||0)+(d.ai_usage.completion_tokens||0)}</div>
                  <div>Cost: ${d.ai_usage.estimated_cost_usd}</div>
                  <div>Latency: {d.ai_usage.latency_ms}ms</div>
                </div>
              ) : <p style={{fontSize:12,color:'var(--muted)'}}>No data</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DraftDetailPage() {
  return <Suspense fallback={<div><div className="skeleton" /></div>}><DraftDetail /></Suspense>
}