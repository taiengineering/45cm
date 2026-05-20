"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

type Cat = 'social'|'blog'|'short_video'|'video'|'community'|'messaging'|'search_presence'
const CATS:{id:Cat,name:string,icon:string}[] = [
  {id:'social',name:'SNS',icon:'📱'},{id:'blog',name:'Blog',icon:'📝'},{id:'short_video',name:'Short Video',icon:'🎬'},
  {id:'video',name:'Video',icon:'🎥'},{id:'community',name:'Community',icon:'💬'},{id:'messaging',name:'Messaging',icon:'✉️'},{id:'search_presence',name:'Search',icon:'🔍'},
]

interface Ch {id:string;name:string;nameKo:string;category:Cat;icon:string;status:string;riskLevel:string;ctaSensitivity:string;cadence:string;caps:string[]}

const CHANNELS: Ch[] = [
  {id:'instagram',name:'Instagram',nameKo:'인스타그램',category:'social',icon:'📸',status:'coming_soon',riskLevel:'medium',ctaSensitivity:'low',cadence:'주 3-5회',caps:['Image','Video','Short','Story','Comment','Analytics']},
  {id:'facebook',name:'Facebook Page',nameKo:'페이스북',category:'social',icon:'📘',status:'available',riskLevel:'low',ctaSensitivity:'medium',cadence:'주 2-3회',caps:['Text','Image','Video','Story','Comment','Analytics']},
  {id:'linkedin',name:'LinkedIn',nameKo:'링크드인',category:'social',icon:'🔗',status:'active',riskLevel:'low',ctaSensitivity:'high',cadence:'주 2-3회',caps:['Text','Image','Comment','Analytics']},
  {id:'threads',name:'Threads',nameKo:'쓰레드',category:'social',icon:'🧵',status:'coming_soon',riskLevel:'low',ctaSensitivity:'low',cadence:'주 3-5회',caps:['Text','Image']},
  {id:'naver_blog',name:'Naver Blog',nameKo:'네이버 블로그',category:'blog',icon:'🟢',status:'available',riskLevel:'low',ctaSensitivity:'medium',cadence:'주 1-2회',caps:['Text','Image','Video','Comment','Analytics']},
  {id:'tistory',name:'Tistory',nameKo:'티스토리',category:'blog',icon:'📙',status:'planning',riskLevel:'low',ctaSensitivity:'medium',cadence:'주 1-2회',caps:['Text','Image','Video','Comment']},
  {id:'brunch',name:'Brunch',nameKo:'브런치',category:'blog',icon:'☕',status:'planning',riskLevel:'low',ctaSensitivity:'low',cadence:'주 1회',caps:['Text','Image']},
  {id:'youtube_shorts',name:'YouTube Shorts',nameKo:'유튜브 쇼츠',category:'short_video',icon:'▶️',status:'coming_soon',riskLevel:'high',ctaSensitivity:'low',cadence:'주 3-5회',caps:['Short','Analytics']},
  {id:'instagram_reels',name:'Instagram Reels',nameKo:'인스타 릴스',category:'short_video',icon:'🎬',status:'coming_soon',riskLevel:'high',ctaSensitivity:'low',cadence:'주 3-5회',caps:['Short','Analytics']},
  {id:'tiktok',name:'TikTok',nameKo:'틱톡',category:'short_video',icon:'🎵',status:'coming_soon',riskLevel:'high',ctaSensitivity:'low',cadence:'주 5-7회',caps:['Short','Comment','Analytics']},
  {id:'youtube',name:'YouTube',nameKo:'유튜브',category:'video',icon:'🎥',status:'coming_soon',riskLevel:'medium',ctaSensitivity:'medium',cadence:'주 1-2회',caps:['Long Video','Text','Comment','Analytics']},
  {id:'naver_cafe',name:'Naver Cafe',nameKo:'네이버 카페',category:'community',icon:'☕',status:'planning',riskLevel:'medium',ctaSensitivity:'high',cadence:'주 2-3회',caps:['Text','Image','Comment']},
  {id:'kakao_channel',name:'Kakao Channel',nameKo:'카카오 채널',category:'messaging',icon:'📨',status:'planning',riskLevel:'high',ctaSensitivity:'medium',cadence:'주 1-2회',caps:['Message','Analytics']},
  {id:'email',name:'Email',nameKo:'이메일',category:'messaging',icon:'✉️',status:'planning',riskLevel:'medium',ctaSensitivity:'medium',cadence:'주 1회',caps:['Email','Analytics']},
  {id:'sms',name:'SMS',nameKo:'SMS',category:'messaging',icon:'📱',status:'planning',riskLevel:'high',ctaSensitivity:'high',cadence:'월 2-4회',caps:['Message']},
  {id:'alimtalk',name:'Alimtalk',nameKo:'알림톡',category:'messaging',icon:'📢',status:'planning',riskLevel:'high',ctaSensitivity:'medium',cadence:'주 1-2회',caps:['Message','Analytics']},
  {id:'naver_place',name:'Naver Place',nameKo:'네이버 플레이스',category:'search_presence',icon:'📍',status:'planning',riskLevel:'low',ctaSensitivity:'low',cadence:'월 1-2회',caps:['Profile','Review','Analytics']},
  {id:'google_business',name:'Google Business',nameKo:'구글 비즈니스',category:'search_presence',icon:'🌐',status:'planning',riskLevel:'low',ctaSensitivity:'low',cadence:'월 1-2회',caps:['Profile','Review','Text','Image','Analytics']},
]

const STATUS_STYLE:Record<string,{label:string,color:string,bg:string}> = {
  active:{label:'Connected',color:'var(--green)',bg:'var(--green-soft)'},
  available:{label:'Available',color:'var(--accent)',bg:'var(--surface)'},
  coming_soon:{label:'Coming Soon',color:'var(--muted)',bg:'var(--surface)'},
  planning:{label:'Planning',color:'var(--muted)',bg:'var(--surface)'},
  manual:{label:'Manual',color:'var(--yellow)',bg:'var(--surface)'},
}
const RISK_COLOR:Record<string,string> = {low:'var(--green)',medium:'var(--yellow)',high:'var(--red)'}
const CTA_COLOR:Record<string,string> = {low:'var(--green)',medium:'var(--yellow)',high:'var(--red)'}

export default function SettingsPage() {
  const [cat, setCat] = useState<Cat|'all'>('all')
  const [integrations, setIntegrations] = useState<any[]>([])
  const [ws, setWs] = useState<any>(null)
  const [testResult, setTestResult] = useState<Record<string,string>>({})

  useEffect(() => {
    fetch(API+'/workspace/integrations').then(r=>r.json()).then(d=>Array.isArray(d)?setIntegrations(d):null).catch(()=>{})
    fetch(API+'/workspace/settings').then(r=>r.json()).then(setWs).catch(()=>{})
  }, [])

  const isConnected = (id:string) => integrations.find(i=>i.provider===id)?.status==='connected'
  const filtered = cat==='all' ? CHANNELS : CHANNELS.filter(c=>c.category===cat)

  const handleTest = async (id:string) => {
    setTestResult({...testResult,[id]:'testing...'})
    try { const r=await fetch(API+'/integrations/health'); const d=await r.json(); const h=(d as any[]).find((x:any)=>x.provider===id); setTestResult({...testResult,[id]:h?.publishReady?'✅ 게시 가능':h?.connected?'⚠️ 권한 확인':'❌ 연결 필요'}) } catch { setTestResult({...testResult,[id]:'❌ 확인 실패'}) }
  }

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">채널 연동 및 운영 설정 — 18개 범용 채널</p>

      {/* Category Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn" onClick={()=>setCat('all')} style={cat==='all'?{background:'var(--accent)',color:'#fff',border:'none',fontSize:11}:{fontSize:11}}>전체 ({CHANNELS.length})</button>
        {CATS.map(c => {
          const count = CHANNELS.filter(ch=>ch.category===c.id).length
          return <button key={c.id} className="btn" onClick={()=>setCat(c.id)} style={cat===c.id?{background:'var(--accent)',color:'#fff',border:'none',fontSize:11}:{fontSize:11}}>{c.icon} {c.name} ({count})</button>
        })}
      </div>

      {/* Channel Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:24}}>
        {filtered.map(ch => {
          const conn = isConnected(ch.id)
          const st = conn ? STATUS_STYLE.active : STATUS_STYLE[ch.status] ?? STATUS_STYLE.planning
          return (
            <div key={ch.id} className="card" style={conn?{borderColor:'var(--green)'}:{}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:24}}>{ch.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700}}>{ch.name}</div>
                    <div style={{fontSize:10,color:'var(--muted)'}}>{ch.nameKo}</div>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:3,alignItems:'flex-end'}}>
                  <span style={{fontSize:9,padding:'1px 6px',borderRadius:3,background:st.bg,color:st.color,fontWeight:600}}>{st.label}</span>
                  {(ch.status==='active'||ch.status==='available') && <button className="btn" onClick={()=>window.open(API+'/oauth/'+ch.id+'/start','_self')} style={{fontSize:10,padding:'2px 8px',...(conn?{}:{background:'var(--accent)',color:'#fff',border:'none'})}}>{conn?'Reconnect':'Connect'}</button>}
                  {conn && <button className="btn" onClick={()=>handleTest(ch.id)} style={{fontSize:9,padding:'1px 6px'}}>Test</button>}
                </div>
              </div>

              {/* Info row */}
              <div style={{display:'flex',gap:8,marginBottom:6,fontSize:10}}>
                <span style={{color:RISK_COLOR[ch.riskLevel]}}>⚠️ {ch.riskLevel}</span>
                <span style={{color:CTA_COLOR[ch.ctaSensitivity]}}>CTA: {ch.ctaSensitivity}</span>
                <span style={{color:'var(--muted)'}}>{ch.cadence}</span>
              </div>

              {/* Capabilities */}
              <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
                {ch.caps.map(c => <span key={c} style={{fontSize:9,padding:'1px 5px',borderRadius:3,background:conn?'var(--green-soft)':'var(--surface)',color:conn?'var(--green)':'var(--muted)'}}>{conn?'✓':'·'} {c}</span>)}
              </div>

              {testResult[ch.id] && <div style={{fontSize:10,color:'var(--accent)',fontWeight:600,marginTop:4}}>{testResult[ch.id]}</div>}
            </div>
          )
        })}
      </div>

      {/* Workspace */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>운영 설정</div>
          {ws && <div style={{fontSize:12,color:'var(--muted)',lineHeight:2.2}}>
            <div>Workspace: <span style={{color:'var(--fg)',fontWeight:600}}>{ws.workspace_id?.slice(0,8)}</span></div>
            <div>Approval: <span style={{fontWeight:600}}>{ws.approval_required?'Required':'Optional'}</span></div>
            <div>Publish Mode: <span style={{color:'var(--accent)',fontWeight:600}}>mock</span></div>
            <div>Emergency Stop: <span style={{color:ws.emergency_stop?'var(--red)':'var(--green)',fontWeight:600}}>{ws.emergency_stop?'ACTIVE':'Normal'}</span></div>
          </div>}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>채널 구조</div>
          <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>
            범용 기업 채널 18개 지원.<br/>
            Commerce/IT 특화 채널 제외.<br/>
            Connect 버튼으로 연동, Test로 검증.
          </p>
        </div>
      </div>
    </div>
  )
}