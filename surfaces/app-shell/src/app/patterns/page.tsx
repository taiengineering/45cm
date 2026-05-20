"use client"
import { useState } from "react"

const DSL = { tone:{authority:'high',humor:'low',trust:'high'}, cta:{intensity:'soft',frequency:'low'}, structure:['hook','insight','proof','CTA'], shorts:{pacing:'medium_fast',captionDensity:'medium'} }
const PATTERNS = [
  {type:'tone',status:'stable',perf:82,desc:'professional, trustworthy'},
  {type:'structure',status:'active',perf:75,desc:'hook → insight → proof → CTA'},
  {type:'cta_style',status:'stable',perf:78,desc:'soft, advisory'},
  {type:'hook_style',status:'active',perf:68,desc:'question-first, pain-point'},
  {type:'pacing',status:'active',perf:72,desc:'medium_fast (Shorts)'},
  {type:'authority_level',status:'stable',perf:85,desc:'high authority'},
  {type:'caption_density',status:'experimental',perf:55,desc:'medium density'},
]
const STATUS_STYLE:Record<string,{color:string,label:string}> = { experimental:{color:'var(--yellow)',label:'Experimental'}, active:{color:'var(--accent)',label:'Active'}, stable:{color:'var(--green)',label:'Stable'}, fatigued:{color:'var(--red)',label:'Fatigued'}, deprecated:{color:'var(--muted)',label:'Deprecated'}, revivable:{color:'var(--yellow)',label:'Revivable'} }
const VARIATIONS = [
  {area:'hook',allowed:true,current:'question-first',example:'바뀔: "아직도 전화로?" → "신고 절차가 달라졌습니다"'},
  {area:'intro',allowed:true,current:'pain-point lead',example:'바뀔: 문제제기 → 해결사례 도입'},
  {area:'cta_wording',allowed:true,current:'soft advisory',example:'바뀔: "진단 신청" → "무료 상담 예약"'},
  {area:'brand tone',allowed:false,current:'professional, trustworthy',example:'❌ 변경 불가 (브랜드 정체성)'},
  {area:'CTA intensity',allowed:false,current:'soft limit',example:'❌ 변경 불가 (CTA 정책)'},
]

export default function PatternsPage() {
  const [tab,setTab] = useState<'patterns'|'dsl'|'variation'|'lab'>('patterns')
  return (
    <div>
      <h1 className="page-title">Brand Patterns</h1>
      <p className="page-sub">패턴은 유지하고 표현만 변화시킵니다 — Controlled Variation</p>

      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {[{id:'patterns' as const,label:'패턴'},{id:'dsl' as const,label:'Brand DSL'},{id:'variation' as const,label:'Variation'},{id:'lab' as const,label:'Pattern Lab'}].map(t=>
          <button key={t.id} onClick={()=>setTab(t.id)} style={{fontSize:11,padding:'6px 14px',borderRadius:6,border:tab===t.id?'none':'1px solid var(--border)',background:tab===t.id?'var(--accent)':'transparent',color:tab===t.id?'#fff':'var(--muted)',cursor:'pointer'}}>{t.label}</button>
        )}
      </div>

      {tab==='patterns' && <>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginBottom:16}}>
          {PATTERNS.map(p=>{
            const st = STATUS_STYLE[p.status]
            return <div key={p.type} className="card">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:700}}>{p.type}</span>
                <span style={{fontSize:9,color:st.color,fontWeight:600}}>{st.label}</span>
              </div>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:6}}>{p.desc}</div>
              <div style={{height:4,borderRadius:2,background:'var(--surface)',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${p.perf}%`,borderRadius:2,background:st.color}} />
              </div>
              <div style={{fontSize:9,color:'var(--muted)',marginTop:2,textAlign:'right'}}>Performance: {p.perf}%</div>
            </div>
          })}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>패턴 추천</div>
          <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>💡 브랜드 패턴이 안정적입니다. 현재 운영을 유지하세요.</p>
        </div>
      </>}

      {tab==='dsl' && <div className="card">
        <div className="card-title" style={{marginBottom:10}}>Brand Operational DSL</div>
        <pre style={{fontSize:11,color:'var(--accent)',background:'var(--surface)',padding:16,borderRadius:8,lineHeight:1.8,overflow:'auto'}}>{`tone:\n  authority: ${DSL.tone.authority}\n  humor: ${DSL.tone.humor}\n  trust: ${DSL.tone.trust}\n\ncta:\n  intensity: ${DSL.cta.intensity}\n  frequency: ${DSL.cta.frequency}\n\nstructure:\n  - ${DSL.structure.join('\n  - ')}\n\nshorts:\n  pacing: ${DSL.shorts.pacing}\n  caption_density: ${DSL.shorts.captionDensity}`}</pre>
        <p style={{fontSize:10,color:'var(--muted)',marginTop:10,lineHeight:1.6}}>DSL은 브랜드 운영 규칙을 정의합니다. 패턴은 유지되고, 표현만 변화합니다.</p>
      </div>}

      {tab==='variation' && <div className="card">
        <div className="card-title" style={{marginBottom:10}}>Controlled Variation</div>
        {VARIATIONS.map((v,i)=>(
          <div key={i} style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:12,fontWeight:700}}>{v.area}</span>
              <span style={{fontSize:10,color:v.allowed?'var(--green)':'var(--red)',fontWeight:600}}>{v.allowed?'✅ 변경 가능':'🔒 고정'}</span>
            </div>
            <div style={{fontSize:10,color:'var(--muted)'}}>{v.example}</div>
          </div>
        ))}
      </div>}

      {tab==='lab' && <div className="card">
        <div className="card-title" style={{marginBottom:10}}>Pattern Lab</div>
        <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,marginBottom:12}}>패턴을 수정하고 variation을 테스트하세요. fatigue simulation과 surface adaptation preview가 가능합니다.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{padding:12,borderRadius:8,background:'var(--surface)'}}>
            <div style={{fontSize:11,fontWeight:700,marginBottom:6}}>Authority Slider</div>
            <input type="range" min={0} max={100} defaultValue={85} style={{width:'100%',accentColor:'var(--accent)'}} />
            <div style={{fontSize:9,color:'var(--muted)',textAlign:'right'}}>85%</div>
          </div>
          <div style={{padding:12,borderRadius:8,background:'var(--surface)'}}>
            <div style={{fontSize:11,fontWeight:700,marginBottom:6}}>Trust Slider</div>
            <input type="range" min={0} max={100} defaultValue={80} style={{width:'100%',accentColor:'var(--green)'}} />
            <div style={{fontSize:9,color:'var(--muted)',textAlign:'right'}}>80%</div>
          </div>
          <div style={{padding:12,borderRadius:8,background:'var(--surface)'}}>
            <div style={{fontSize:11,fontWeight:700,marginBottom:6}}>CTA Intensity</div>
            <input type="range" min={0} max={100} defaultValue={25} style={{width:'100%',accentColor:'var(--yellow)'}} />
            <div style={{fontSize:9,color:'var(--muted)',textAlign:'right'}}>25% (soft)</div>
          </div>
          <div style={{padding:12,borderRadius:8,background:'var(--surface)'}}>
            <div style={{fontSize:11,fontWeight:700,marginBottom:6}}>Hook Variation</div>
            <input type="range" min={0} max={100} defaultValue={60} style={{width:'100%',accentColor:'var(--accent)'}} />
            <div style={{fontSize:9,color:'var(--muted)',textAlign:'right'}}>60% (medium)</div>
          </div>
        </div>
        <button style={{marginTop:12,fontSize:11,padding:'8px 20px',borderRadius:6,background:'var(--accent)',color:'#fff',border:'none',cursor:'pointer'}}>Variation 테스트</button>
      </div>}
    </div>
  )
}