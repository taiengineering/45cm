"use client"
import { useState, useEffect, useMemo } from "react"

const CHANNELS = [{id:'linkedin',name:'LinkedIn',desc:'B2B 전문성 중심'},{id:'facebook',name:'Facebook',desc:'친근한 대화형'},{id:'naver_blog',name:'Naver Blog',desc:'정보형 + SEO'},{id:'naver_kin',name:'지식인',desc:'전문가 답변'}]

const DEFAULTS: Record<string,Record<string,number>> = {
  linkedin:{tone:8,professionalism:9,friendliness:4,directness:7,ctaIntensity:5,humanization:8,antiAi:9},
  facebook:{tone:5,professionalism:5,friendliness:9,directness:5,ctaIntensity:6,humanization:7,antiAi:8},
  naver_blog:{tone:6,professionalism:7,friendliness:6,directness:6,ctaIntensity:7,humanization:8,antiAi:9},
  naver_kin:{tone:7,professionalism:8,friendliness:5,directness:8,ctaIntensity:4,humanization:9,antiAi:9},
}

const SAMPLES: Record<string,{topic:string,raw:string}> = {
  safety_alert:{topic:'안전 알림',raw:'중대재해처벌법에 따르면, 중대재해가 발생할 경우 사업주 또는 경영 책임자는 다음과 같은 과태료를 부과받을 수 있습니다. 첫째, 중대재해 발생 시 과태료는 최대 10억 원까지 부과될 수 있습니다. 둘째, 재해 예방 조치 미이행 시에도 과태료가 부과됩니다. 셋째, 처벌 기준으로는 징역형 또는 벌금형에 처해질 수 있습니다. 결론적으로, 법률 전문가와 상담하는 것이 좋습니다.'},
  soft_cta:{topic:'부드러운 CTA',raw:'위험성평가는 사업장 안전관리의 기본입니다. 요약하면, 위험성평가를 통해 사고를 예방할 수 있습니다. 도움이 되었으면 좋겠습니다. 추가적인 질문이 있으시면 말씀해주세요.'},
  hard_cta:{topic:'적극적 CTA',raw:'안전관리자 선임 의무는 모든 사업장에 적용됩니다. 첫째, 선임 기준을 확인하세요. 둘째, 자격 요건을 검토하세요. 셋째, 반드시 기한 내 선임하세요. 지금 바로 무료 법령진단을 받아보세요!'},
}

const PERSONAS = [
  {id:'expert',name:'Trusted Expert',icon:'🎓',keys:{professionalism:9,directness:7,friendliness:3,ctaIntensity:4}},
  {id:'advisor',name:'Friendly Advisor',icon:'🤝',keys:{friendliness:9,professionalism:5,directness:5,ctaIntensity:5}},
  {id:'consultant',name:'Direct Consultant',icon:'💼',keys:{directness:9,ctaIntensity:8,professionalism:7,friendliness:4}},
  {id:'quiet',name:'Quiet Professional',icon:'🧑\u200d💻',keys:{professionalism:8,friendliness:4,directness:4,ctaIntensity:3}},
  {id:'guide',name:'Warm Guide',icon:'🌟',keys:{friendliness:8,professionalism:6,directness:5,ctaIntensity:5}},
]

function generatePreview(v: Record<string,number>, channel: string): string {
  const pro = v.professionalism > 7
  const friendly = v.friendliness > 6
  const direct = v.directness > 6
  const strongCta = v.ctaIntensity > 6
  const highAntiAi = v.antiAi > 7

  const openings: Record<string,string> = {
    linkedin: pro ? '산업안전 실무에서 자주 마주치는 이슈가 있습니다.' : '요즘 안전관리 이슈가 많이 나오고 있는데요.',
    facebook: friendly ? '혹시 이런 고민 있으신가요? 안전관리, 생각보다 가까이 있는 문제입니다.' : '안전관리 관련 중요한 사항을 알려드립니다.',
    naver_blog: '중대재해처벌법 과태료 기준, 실무자라면 반드시 알아야 할 핵심 내용을 정리했습니다.',
    naver_kin: pro ? '실무적으로 보면, 중대재해처벌법의 과태료 기준은 위반 유형에 따라 다릅니다.' : '중대재해처벌법 과태료에 대해 알려드리겠습니다.',
  }
  const body = direct
    ? '현장에서는 50인 이상 사업장이 주요 대상이고, 과태료는 최대 10억원까지 부과될 수 있습니다. 특히 안전보건관리체계 미구축 사업장은 우선 점검 대상이 됩니다.'
    : '사업장 규모에 따라 적용 범위가 달라지는데요. 안전관리 체계를 미리 점검해보시는 것도 좋은 방법이 될 수 있습니다.'
  const cta = strongCta
    ? '\n\n👉 지금 바로 무료 법령진단을 받아보세요.'
    : friendly ? '\n\n궁금하신 점이 있으시면 편하게 문의해주세요.' : '\n\n참고하시면 도움이 될 수 있습니다.'
  const antiAiNote = highAntiAi ? '' : '\n\n요약하면, 안전관리는 매우 중요합니다.'
  return (openings[channel]||openings.linkedin) + '\n\n' + body + cta + antiAiNote
}

function calcAiSmell(v: Record<string,number>): {before:number,after:number,items:{name:string,removed:boolean}[]} {
  const base = 78
  const reduction = (v.humanization*3 + v.antiAi*4) / 2
  const after = Math.max(5, Math.round(base - reduction))
  return {
    before: base, after,
    items: [
      {name:'GPT 특유 마무리 제거', removed: v.antiAi > 6},
      {name:'반복 표현 감소', removed: v.humanization > 5},
      {name:'인간형 리듬 증가', removed: v.humanization > 7},
      {name:'과도한 정리체 감소', removed: v.antiAi > 7},
      {name:'CTA 자연화', removed: v.ctaIntensity < 8},
      {name:'나열 구조 제거', removed: v.antiAi > 5},
    ]
  }
}

function matchPersona(v: Record<string,number>): {name:string,icon:string,pct:number}[] {
  return PERSONAS.map(p => {
    const diffs = Object.entries(p.keys).map(([k,target]) => 1 - Math.abs((v[k]||5) - target) / 10)
    const pct = Math.round(diffs.reduce((a,b)=>a+b,0) / diffs.length * 100)
    return {name:p.name, icon:p.icon, pct}
  }).sort((a,b) => b.pct - a.pct)
}

function RadarChart({values}:{values:Record<string,number>}) {
  const keys = ['professionalism','friendliness','directness','ctaIntensity','humanization','antiAi']
  const labels = ['전문성','친근함','직설성','CTA','인간화','Anti-AI']
  const cx=120,cy=120,r=90
  const pts = keys.map((k,i) => {
    const angle = (Math.PI*2*i/keys.length) - Math.PI/2
    const val = (values[k]||5)/10
    return {x:cx+Math.cos(angle)*r*val, y:cy+Math.sin(angle)*r*val, lx:cx+Math.cos(angle)*(r+18), ly:cy+Math.sin(angle)*(r+18), label:labels[i]}
  })
  const gridLevels = [0.25,0.5,0.75,1]
  return (
    <svg viewBox="0 0 240 240" style={{width:'100%',maxWidth:240}}>
      {gridLevels.map(l => <polygon key={l} points={keys.map((_,i)=>{const a=(Math.PI*2*i/keys.length)-Math.PI/2;return`${cx+Math.cos(a)*r*l},${cy+Math.sin(a)*r*l}`}).join(' ')} fill="none" stroke="var(--border)" strokeWidth={0.5} />)}
      {keys.map((_,i) => {const a=(Math.PI*2*i/keys.length)-Math.PI/2;return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke="var(--border)" strokeWidth={0.5} />})}
      <polygon points={pts.map(p=>`${p.x},${p.y}`).join(' ')} fill="rgba(99,107,255,0.15)" stroke="var(--accent)" strokeWidth={1.5} />
      {pts.map((p,i) => <text key={i} x={p.lx} y={p.ly} fill="var(--muted)" fontSize={9} textAnchor="middle" dominantBaseline="middle">{p.label}</text>)}
      {pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--accent)" />)}
    </svg>
  )
}

const TABS = ['Live Preview','Before / After','AI Smell','Persona'] as const
type Tab = typeof TABS[number]

const sliders: {key:string,label:string,low:string,high:string}[] = [
  {key:'tone',label:'톤',low:'캠주얼',high:'포말'},
  {key:'professionalism',label:'전문성',low:'일반적',high:'전문가'},
  {key:'friendliness',label:'친근함',low:'거리감',high:'친근'},
  {key:'directness',label:'직설성',low:'원론적',high:'직설적'},
  {key:'ctaIntensity',label:'CTA 강도',low:'은은',high:'적극적'},
  {key:'humanization',label:'인간화',low:'낮음',high:'최대'},
  {key:'antiAi',label:'Anti-AI',low:'낮음',high:'최대'},
]

export default function BrandPage() {
  const [channel, setChannel] = useState('linkedin')
  const [values, setValues] = useState(DEFAULTS.linkedin)
  const [tab, setTab] = useState<Tab>('Live Preview')
  const [sample, setSample] = useState('safety_alert')
  const [saved, setSaved] = useState(false)

  useEffect(() => { setValues(DEFAULTS[channel] || DEFAULTS.linkedin) }, [channel])

  const preview = useMemo(() => generatePreview(values, channel), [values, channel])
  const smell = useMemo(() => calcAiSmell(values), [values])
  const personas = useMemo(() => matchPersona(values), [values])
  const humanScore = Math.round(100 - smell.after)

  return (
    <div>
      <h1 className="page-title">Brand Studio</h1>
      <p className="page-sub">브랜드를 조율하고, 결과를 체감하세요</p>
      {saved && <div className="card" style={{borderColor:'var(--green)',background:'var(--green-soft)',marginBottom:12}}><span style={{color:'var(--green)',fontWeight:600}}>✅ 저장됨</span></div>}

      {/* Channel selector */}
      <div style={{display:'flex',gap:6,marginBottom:16}}>
        {CHANNELS.map(ch => <button key={ch.id} className="btn" onClick={()=>setChannel(ch.id)} style={channel===ch.id?{background:'var(--accent)',color:'#fff',border:'none'}:{}}>{ch.name}</button>)}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:16}}>
        {/* Left: Sliders */}
        <div className="card" style={{position:'sticky',top:20,alignSelf:'start'}}>
          <div className="card-title" style={{marginBottom:12}}>브랜드 조절</div>
          {sliders.map(s => (
            <div key={s.key} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:2}}>
                <span style={{color:'var(--fg)',fontWeight:600}}>{s.label}</span>
                <span style={{color:'var(--accent)',fontFamily:'var(--mono)',fontSize:11}}>{(values as any)[s.key]}</span>
              </div>
              <input type="range" min={1} max={10} value={(values as any)[s.key]} onChange={e=>setValues({...values,[s.key]:parseInt(e.target.value)})} style={{width:'100%',accentColor:'var(--accent)',height:4}} />
              <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--border)'}}><span>{s.low}</span><span>{s.high}</span></div>
            </div>
          ))}
          <button className="btn" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000)}} style={{background:'var(--accent)',color:'#fff',border:'none',width:'100%',justifyContent:'center',marginTop:8}}>저장</button>
          {/* Radar */}
          <div style={{marginTop:16,display:'flex',justifyContent:'center'}}><RadarChart values={values} /></div>
        </div>

        {/* Right: Preview tabs */}
        <div>
          <div style={{display:'flex',gap:4,marginBottom:12}}>
            {TABS.map(t => <button key={t} className="btn" onClick={()=>setTab(t)} style={tab===t?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>{t}</button>)}
          </div>

          {tab === 'Live Preview' && (
            <div>
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                {Object.keys(SAMPLES).map(k => <button key={k} className="btn" onClick={()=>setSample(k)} style={sample===k?{background:'var(--card)',borderColor:'var(--accent)',fontSize:11}:{fontSize:11}}>{SAMPLES[k].topic}</button>)}
              </div>
              {/* Channel compare */}
              <div style={{display:'grid',gridTemplateColumns:channel==='all'?'repeat(3,1fr)':'1fr',gap:12}}>
                <div className="card">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <span className="card-title">{CHANNELS.find(c=>c.id===channel)?.name || channel}</span>
                    <span style={{fontSize:11,color:'var(--accent)',fontFamily:'var(--mono)'}}>Human: {humanScore}%</span>
                  </div>
                  <p style={{fontSize:13,lineHeight:1.8,whiteSpace:'pre-wrap',color:'var(--fg)'}}>{preview}</p>
                </div>
              </div>
              {/* Multi-channel compare */}
              <div style={{marginTop:16}}>
                <div className="card-title" style={{marginBottom:8}}>채널 비교</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                  {CHANNELS.filter(c=>c.id!==channel).map(ch => (
                    <div key={ch.id} className="card" style={{padding:14}}>
                      <div style={{fontSize:11,color:'var(--accent)',fontWeight:600,marginBottom:6}}>{ch.name}</div>
                      <p style={{fontSize:11,lineHeight:1.7,color:'var(--muted)',maxHeight:100,overflow:'hidden'}}>{generatePreview(DEFAULTS[ch.id]||values, ch.id).slice(0,200)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'Before / After' && (
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div className="card" style={{borderColor:'var(--red-soft)'}}>
                <div className="card-title" style={{marginBottom:8,color:'var(--red)'}}>❌ RAW AI 출력</div>
                <p style={{fontSize:13,lineHeight:1.8,color:'var(--muted)',whiteSpace:'pre-wrap'}}>{SAMPLES[sample]?.raw}</p>
                <div style={{marginTop:12,display:'flex',gap:6,flexWrap:'wrap'}}>
                  {['결론적으로','첫째/둘째/셋째','요약하면','GPT 마무리'].map(t => <span key={t} style={{background:'var(--red-soft)',color:'var(--red)',padding:'2px 6px',borderRadius:3,fontSize:10}}>{t}</span>)}
                </div>
              </div>
              <div className="card" style={{borderColor:'var(--green-soft)'}}>
                <div className="card-title" style={{marginBottom:8,color:'var(--green)'}}>✅ Brand 적용 결과</div>
                <p style={{fontSize:13,lineHeight:1.8,color:'var(--fg)',whiteSpace:'pre-wrap'}}>{preview}</p>
                <div style={{marginTop:12,display:'flex',gap:6,flexWrap:'wrap'}}>
                  {smell.items.filter(i=>i.removed).map(i => <span key={i.name} style={{background:'var(--green-soft)',color:'var(--green)',padding:'2px 6px',borderRadius:3,fontSize:10}}>✓ {i.name}</span>)}
                </div>
              </div>
            </div>
          )}

          {tab === 'AI Smell' && (
            <div>
              <div className="grid-3" style={{marginBottom:16}}>
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>AI 느낌</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                    <span style={{fontSize:28,fontWeight:700,color:'var(--red)',fontFamily:'var(--mono)'}}>{smell.before}%</span>
                    <span style={{fontSize:18,color:'var(--muted)'}}>→</span>
                    <span style={{fontSize:28,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{smell.after}%</span>
                  </div>
                </div>
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>자연스러움</div>
                  <div className="stat-value" style={{color:'var(--accent)'}}>{humanScore}%</div>
                </div>
                <div className="card" style={{textAlign:'center'}}>
                  <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>제거됨</div>
                  <div className="stat-value" style={{color:'var(--green)'}}>{smell.items.filter(i=>i.removed).length}/{smell.items.length}</div>
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{marginBottom:12}}>Humanization 세부 항목</div>
                {smell.items.map(item => (
                  <div key={item.name} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{fontSize:13}}>{item.name}</span>
                    <span className={`badge ${item.removed?'badge-approved':'badge-draft'}`}>{item.removed?'✓ 제거됨':'— 미적용'}</span>
                  </div>
                ))}
              </div>
              {/* AI Smell Meter */}
              <div className="card" style={{marginTop:12}}>
                <div className="card-title" style={{marginBottom:8}}>AI Smell Meter</div>
                <div style={{height:24,borderRadius:12,background:'var(--surface)',overflow:'hidden',position:'relative'}}>
                  <div style={{height:'100%',width:`${smell.after}%`,borderRadius:12,background:`linear-gradient(90deg, var(--green) 0%, ${smell.after>40?'var(--yellow)':'var(--green)'} 100%)`,transition:'width 0.5s'}} />
                  <span style={{position:'absolute',right:8,top:4,fontSize:11,fontWeight:600,color:'var(--fg)'}}>{smell.after}% AI 느낌 잔여</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'Persona' && (
            <div>
              <div className="grid-3" style={{marginBottom:16}}>
                {personas.slice(0,3).map((p,i) => (
                  <div key={p.name} className="card" style={{textAlign:'center',...(i===0?{borderColor:'var(--accent)'}:{})}}>
                    <div style={{fontSize:36,marginBottom:4}}>{p.icon}</div>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{p.name}</div>
                    <div style={{fontSize:28,fontWeight:700,color:i===0?'var(--accent)':'var(--muted)',fontFamily:'var(--mono)'}}>{p.pct}%</div>
                    {i===0 && <div style={{fontSize:11,color:'var(--accent)',marginTop:4}}>현재 브랜드와 가장 유사</div>}
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="card-title" style={{marginBottom:12}}>Persona Blend</div>
                {personas.map(p => (
                  <div key={p.name} style={{marginBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                      <span>{p.icon} {p.name}</span>
                      <span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>{p.pct}%</span>
                    </div>
                    <div style={{height:6,borderRadius:3,background:'var(--surface)',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${p.pct}%`,borderRadius:3,background:'var(--accent)',transition:'width 0.3s'}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}