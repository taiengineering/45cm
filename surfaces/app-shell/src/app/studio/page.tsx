"use client"
import { useState } from "react"

const STUDIOS = [
  {id:'content',icon:'📝',name:'콘텐츠 작성',desc:'채널에 맞는 콘텐츠를 작성하세요'},
  {id:'shorts',icon:'🎬',name:'쇼츠 제작',desc:'Hook → 장면 → 자막 → CTA'},
  {id:'preview',icon:'👁️',name:'채널별 미리보기',desc:'링크드인/블로그/인스타 동시 봐요'},
]
const SCENES = [{n:'Hook',s:3,icon:'🎬'},{n:'문제제기',s:8,icon:'❓'},{n:'가치전달',s:12,icon:'✅'},{n:'CTA',s:7,icon:'👉'}]

export default function StudioPage() {
  const [tab,setTab]=useState('content')
  const [hook,setHook]=useState('산업재해 신고, 아직도 전화로 하세요?')
  return (
    <div>
      <h1 className="page-title">스튜디오</h1>
      <p className="page-sub">콘텐츠를 만들고, 쇼츠를 제작하고, 채널별로 미리보세요</p>

      <div className="grid-3" style={{marginBottom:16}}>
        {STUDIOS.map(s=>(
          <div key={s.id} onClick={()=>setTab(s.id)} className="card" style={{cursor:'pointer',textAlign:'center',borderColor:tab===s.id?'var(--accent)':'var(--border)'}}>
            <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:13,fontWeight:tab===s.id?700:500,color:tab===s.id?'var(--accent)':'var(--fg)'}}>{s.name}</div>
            <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {tab==='content' && <div className="card">
        <div className="card-title" style={{marginBottom:12}}>콘텐츠 작성</div>
        <textarea placeholder="원본 아이디어를 입력하세요... 제품 정보, 메모, 공지, 아이디어 다 됩니다" style={{width:'100%',minHeight:140,padding:14,borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,resize:'vertical',fontFamily:'var(--font)'}} />
        <div style={{display:'flex',gap:6,marginTop:12,flexWrap:'wrap'}}>
          <button className="btn btn-primary">AI로 작성하기</button>
          <button className="btn">채널에 맞게 적응</button>
          <button className="btn">브랜드 검사</button>
          <button className="btn">피로도 검사</button>
        </div>
      </div>}

      {tab==='shorts' && <div className="card">
        <div className="card-title" style={{marginBottom:12}}>🎬 쇼츠 제작</div>
        <p style={{fontSize:12,color:'var(--muted)',marginBottom:16}}>전문 영상 툴이 아님니다. 운영자가 쉽게 쇼츠를 만들 수 있어요.</p>
        <div className="grid-4" style={{marginBottom:16}}>
          {SCENES.map((s,i)=>(
            <div key={s.n} style={{textAlign:'center',padding:'12px 8px',borderRadius:'var(--radius-sm)',background:i===0?'var(--accent)':'var(--surface)',color:i===0?'#fff':'var(--muted)'}}>
              <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:11,fontWeight:i===0?700:400}}>{s.n}</div>
              <div style={{fontSize:9}}>{s.s}초</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>3초 Hook (첫 문장)</label>
          <input value={hook} onChange={e=>setHook(e.target.value)} style={{width:'100%',padding:'10px 14px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,fontFamily:'var(--font)'}} />
        </div>
        <div style={{display:'flex',gap:6}}>
          <button className="btn btn-primary">Hook AI 생성</button>
          <button className="btn">CTA 검사</button>
        </div>
      </div>}

      {tab==='preview' && <div className="card">
        <div className="card-title" style={{marginBottom:12}}>채널별 미리보기</div>
        <div className="grid-2">
          {[{ch:'인스타그램',txt:'[시각 Hook] 산업안전 무료진단 → Soft CTA'},{ch:'링크드인',txt:'전문성 중심 B2B 톤으로 적응'},{ch:'블로그',txt:'신뢰 확보를 위해 상세하게 설명'},{ch:'쇼츠',txt:'🎬 3초 Hook: "아직도 전화로?"'}].map(p=>(
            <div key={p.ch} style={{padding:14,borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)'}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>{p.ch} 버전</div>
              <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.7,minHeight:40}}>{p.txt}</div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}