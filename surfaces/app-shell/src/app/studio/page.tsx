"use client"
import { useState } from "react"

const STUDIOS = [
  {id:'content',name:'Content Studio',icon:'📝',desc:'칄널별 콘텐츠 작성'},
  {id:'shorts',name:'Shorts Studio',icon:'🎬',desc:'순동영상 Hook + Scene 생성'},
  {id:'visual',name:'Visual Studio',icon:'🖼️',desc:'이미지/카드 생성'},
  {id:'preview',name:'Multi-Surface Preview',icon:'👁️',desc:'채널별 동시 미리보기'},
]

// Shorts Studio sub-features
const SHORTS_FLOW = ['Hook (3초)','Problem','Value','CTA']

export default function StudioPage() {
  const [active,setActive] = useState('content')
  const [hookText,setHookText] = useState('산업재해 신고, 아직도 전화로 하세요?')
  return (
    <div>
      <h1 className="page-title">Studio</h1>
      <p className="page-sub">콘텐츠 생성 + 쇼츠 + 비주얼 + 채널별 미리보기</p>

      {/* Studio Tabs */}
      <div style={{display:'flex',gap:6,marginBottom:16}}>
        {STUDIOS.map(s=>(
          <button key={s.id} onClick={()=>setActive(s.id)} className="card" style={{flex:1,textAlign:'center',cursor:'pointer',borderColor:active===s.id?'var(--accent)':'var(--border)',padding:'12px 8px'}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:active===s.id?700:400,color:active===s.id?'var(--accent)':'var(--fg)'}}>{s.name}</div>
          </button>
        ))}
      </div>

      {/* Content Studio */}
      {active==='content' && <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:10}}>Content Studio</div>
        <textarea placeholder="콘텐츠를 작성하세요..." style={{width:'100%',minHeight:120,padding:12,borderRadius:8,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,resize:'vertical'}} />
        <div style={{display:'flex',gap:6,marginTop:10}}>
          <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--accent)',color:'#fff',border:'none',cursor:'pointer'}}>AI 생성</button>
          <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--surface)',color:'var(--fg)',border:'1px solid var(--border)',cursor:'pointer'}}>Surface 적응</button>
          <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--surface)',color:'var(--fg)',border:'1px solid var(--border)',cursor:'pointer'}}>브랜드 검사</button>
          <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--surface)',color:'var(--fg)',border:'1px solid var(--border)',cursor:'pointer'}}>피로도 검사</button>
        </div>
      </div>}

      {/* Shorts Studio */}
      {active==='shorts' && <div>
        <div className="card" style={{marginBottom:12}}>
          <div className="card-title" style={{marginBottom:10}}>🎬 Shorts Studio</div>
          <p style={{fontSize:11,color:'var(--muted)',marginBottom:12}}>전문 영상툴이 아니라, 운영자가 쇼츠를 생산 가능한 Runtime</p>
          {/* Scene Flow */}
          <div style={{display:'flex',gap:4,marginBottom:16}}>
            {SHORTS_FLOW.map((s,i)=>(
              <div key={s} style={{flex:1,textAlign:'center',padding:'10px 6px',borderRadius:8,background:i===0?'var(--accent)':'var(--surface)',color:i===0?'#fff':'var(--muted)',fontSize:11,fontWeight:i===0?700:400}}>
                <div style={{fontSize:16,marginBottom:4}}>{i===0?'🎬':i===1?'❓':i===2?'✅':'👉'}</div>
                {s}
              </div>
            ))}
          </div>
          {/* Hook Generator */}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:'var(--muted)',display:'block',marginBottom:4}}>3초 Hook (첫 문장)</label>
            <input value={hookText} onChange={e=>setHookText(e.target.value)} style={{width:'100%',padding:'8px 12px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13}} />
          </div>
          <div style={{display:'flex',gap:6}}>
            <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--accent)',color:'#fff',border:'none',cursor:'pointer'}}>Hook AI 생성</button>
            <button style={{fontSize:11,padding:'6px 14px',borderRadius:6,background:'var(--surface)',border:'1px solid var(--border)',cursor:'pointer',color:'var(--fg)'}}>CTA 검사</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>Shorts Surface Adaptation</div>
          <div style={{fontSize:11,color:'var(--muted)',lineHeight:2}}>
            ✅ fast pacing · ✅ visual hook · ✅ discovery optimized · ✅ CTA softening
          </div>
        </div>
      </div>}

      {/* Multi-Surface Preview */}
      {active==='preview' && <div className="card">
        <div className="card-title" style={{marginBottom:10}}>Multi-Surface Preview</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
          {['Instagram','LinkedIn','Blog','Shorts'].map(ch=>(
            <div key={ch} style={{padding:12,borderRadius:8,border:'1px solid var(--border)',background:'var(--surface)'}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>{ch} 버전</div>
              <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.8,minHeight:60}}>
                {ch==='Instagram'?'[Visual Hook] 산업안전 무료진단 시작하세요 → Soft CTA':ch==='LinkedIn'?'TAI에서 산업안전 무료 진단을 시작합니다. 중대재해 예방을 위한 첫 번째 단계...':ch==='Blog'?'[SEO 중심] 산업재해 예방 진단이란? TAI의 접근방식과 사례를 상세히 설명합니다...':'🎬 3초 Hook: "산업재해 신고, 아직도 전화로?"'}
              </div>
            </div>
          ))}
        </div>
      </div>}

      {/* Visual Studio redirect */}
      {active==='visual' && <div className="card">
        <div className="card-title">Visual Studio</div>
        <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>
          <a href="/visual" style={{color:'var(--accent)'}}>→ Visual Studio로 이동</a>
        </p>
      </div>}
    </div>
  )
}