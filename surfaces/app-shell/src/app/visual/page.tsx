"use client"
import { useState, useMemo } from "react"

const PRESETS = [
  {id:'tai_pro',name:'TAI Professional',colors:['#0f172a','#1e40af','#3b82f6','#e2e8f0'],bg:'#0f172a',fg:'#e2e8f0',accent:'#3b82f6',desc:'산업안전 + 전문성',icon:'🏢'},
  {id:'clean_corp',name:'Clean Corporate',colors:['#ffffff','#f8fafc','#0ea5e9','#0f172a'],bg:'#ffffff',fg:'#0f172a',accent:'#0ea5e9',desc:'기업형 클린',icon:'💼'},
  {id:'tech_insight',name:'Technical Insight',colors:['#18181b','#27272a','#a78bfa','#e4e4e7'],bg:'#18181b',fg:'#e4e4e7',accent:'#a78bfa',desc:'기술 블로그형',icon:'🖥️'},
  {id:'safety_alert',name:'Safety Alert',colors:['#fef2f2','#dc2626','#f97316','#1e1e1e'],bg:'#1e1e1e',fg:'#fef2f2',accent:'#f97316',desc:'경고/안전형',icon:'⚠️'},
  {id:'minimal_b2b',name:'Minimal B2B',colors:['#fafafa','#e5e5e5','#171717','#525252'],bg:'#fafafa',fg:'#171717',accent:'#171717',desc:'미니말 B2B',icon:'◻'},
  {id:'industrial',name:'Industrial Modern',colors:['#1a1a2e','#16213e','#e94560','#eaeaea'],bg:'#1a1a2e',fg:'#eaeaea',accent:'#e94560',desc:'산업형 다크톤',icon:'⚙️'},
]

const CARD_TYPES = ['LinkedIn Card','Blog Cover','CTA Banner','Campaign Card'] as const
const CHANNELS_VIS = ['LinkedIn','Facebook','Naver Blog'] as const
const TABS = ['Live Preview','Channel Compare','CTA Preview','Brand Consistency'] as const
type Tab = typeof TABS[number]

const CTA_TEXTS: Record<number,string> = {
  1:'참고하시면 도움이 될 수 있습니다.',
  2:'자세한 내용은 아래를 확인해보세요.',
  3:'무료 법령진단을 받아보세요.',
  4:'지금 바로 무료 진단 신청하세요 →',
  5:'👉 지금 바로 신청! 무료 법령진단 →',
}

function CardPreview({preset,type,title,ctaLevel}:{preset:typeof PRESETS[0],type:string,title:string,ctaLevel:number}) {
  const isLinkedin = type === 'LinkedIn Card'
  const isCta = type === 'CTA Banner'
  const isBlog = type === 'Blog Cover'
  const w = isLinkedin ? 520 : isCta ? 520 : 520
  const h = isLinkedin ? 270 : isCta ? 160 : isBlog ? 240 : 270
  const ctaText = CTA_TEXTS[ctaLevel] || CTA_TEXTS[3]

  return (
    <div style={{width:'100%',maxWidth:w,borderRadius:10,overflow:'hidden',border:'1px solid var(--border)',fontFamily:'var(--font)'}}>
      <div style={{background:preset.bg,color:preset.fg,padding:isCta?'20px 28px':'28px 32px',minHeight:h,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          {!isCta && <div style={{fontSize:10,fontWeight:600,color:preset.accent,textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>{preset.name}</div>}
          <div style={{fontSize:isCta?18:22,fontWeight:700,lineHeight:1.3,marginBottom:isCta?8:16,maxWidth:'80%'}}>{title}</div>
          {!isCta && <div style={{width:40,height:3,background:preset.accent,borderRadius:2,marginBottom:12}} />}
          {!isCta && <p style={{fontSize:12,lineHeight:1.7,opacity:0.7,maxWidth:'70%'}}>실무자를 위한 핵심 정보를 정리했습니다.</p>}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:isCta?0:12}}>
          {ctaLevel > 0 && (
            <div style={{background:preset.accent,color:preset.bg==='#ffffff'?'#fff':preset.fg,padding:isCta?'8px 20px':'6px 16px',borderRadius:6,fontSize:isCta?14:12,fontWeight:600}}>
              {ctaText}
            </div>
          )}
          {isLinkedin && <div style={{fontSize:10,opacity:0.5}}>taieng.co.kr</div>}
        </div>
      </div>
    </div>
  )
}

function ConsistencyMeter({value}:{value:number}) {
  const color = value > 80 ? 'var(--green)' : value > 60 ? 'var(--yellow)' : 'var(--red)'
  return (
    <div style={{textAlign:'center'}}>
      <svg viewBox="0 0 120 120" style={{width:100,height:100}}>
        <circle cx={60} cy={60} r={50} fill="none" stroke="var(--border)" strokeWidth={8} />
        <circle cx={60} cy={60} r={50} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${value*3.14} ${314-value*3.14}`} strokeLinecap="round" transform="rotate(-90 60 60)" />
        <text x={60} y={56} textAnchor="middle" fill="var(--fg)" fontSize={24} fontWeight={700} fontFamily="var(--mono)">{value}</text>
        <text x={60} y={72} textAnchor="middle" fill="var(--muted)" fontSize={9}>%</text>
      </svg>
    </div>
  )
}

export default function VisualPage() {
  const [presetId, setPresetId] = useState('tai_pro')
  const [tab, setTab] = useState<Tab>('Live Preview')
  const [cardType, setCardType] = useState<typeof CARD_TYPES[number]>('LinkedIn Card')
  const [ctaLevel, setCtaLevel] = useState(3)
  const [title, setTitle] = useState('중대재해처벌법 과태료, 실무자가 반드시 \n알아야 할 3가지')
  const [saved, setSaved] = useState(false)

  const preset = PRESETS.find(p => p.id === presetId) || PRESETS[0]

  const consistency = useMemo(() => {
    const base = 75
    const bonus = preset.id === 'tai_pro' ? 16 : preset.id === 'clean_corp' ? 12 : 8
    return Math.min(98, base + bonus)
  }, [preset])

  const aiSmell = useMemo(() => {
    return { before: 68, after: Math.max(8, 68 - (preset.id === 'tai_pro' ? 55 : preset.id === 'minimal_b2b' ? 50 : 40)) }
  }, [preset])

  return (
    <div>
      <h1 className="page-title">Visual Studio</h1>
      <p className="page-sub">브랜드 시각 운영 조종실 — 템플릿 기반, 브랜드 일관성 유지</p>
      {saved && <div className="card" style={{borderColor:'var(--green)',background:'var(--green-soft)',marginBottom:12}}><span style={{color:'var(--green)',fontWeight:600}}>✅ 저장됨</span></div>}

      {/* Preset selector */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,marginBottom:20}}>
        {PRESETS.map(p => (
          <div key={p.id} className="card" onClick={()=>setPresetId(p.id)} style={{cursor:'pointer',padding:12,textAlign:'center',...(presetId===p.id?{borderColor:'var(--accent)'}:{})}}>
            <div style={{fontSize:24,marginBottom:4}}>{p.icon}</div>
            <div style={{fontSize:11,fontWeight:600,marginBottom:2}}>{p.name}</div>
            <div style={{display:'flex',gap:3,justifyContent:'center'}}>
              {p.colors.map((c,i) => <div key={i} style={{width:12,height:12,borderRadius:3,background:c,border:'1px solid var(--border)'}} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {TABS.map(t => <button key={t} className="btn" onClick={()=>setTab(t)} style={tab===t?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>{t}</button>)}
      </div>

      {tab === 'Live Preview' && (
        <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:16}}>
          <div className="card" style={{alignSelf:'start'}}>
            <div className="card-title" style={{marginBottom:12}}>카드 설정</div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>카드 유형</label>
              <select value={cardType} onChange={e=>setCardType(e.target.value as any)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13}}>
                {CARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>헤드라인</label>
              <textarea value={title} onChange={e=>setTitle(e.target.value)} rows={3} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,resize:'vertical',fontFamily:'inherit',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>CTA 강도</label>
              <input type="range" min={0} max={5} value={ctaLevel} onChange={e=>setCtaLevel(parseInt(e.target.value))} style={{width:'100%',accentColor:'var(--accent)'}} />
              <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)'}}><span>없음</span><span>최대</span></div>
            </div>
            <div style={{marginBottom:12}}>
              <div className="card-title" style={{marginBottom:8}}>현재 Preset</div>
              <div style={{display:'flex',gap:4}}>{preset.colors.map((c,i)=><div key={i} style={{width:24,height:24,borderRadius:4,background:c,border:'1px solid var(--border)'}} />)}</div>
              <p style={{fontSize:11,color:'var(--muted)',marginTop:6}}>{preset.desc}</p>
            </div>
            <button className="btn" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000)}} style={{background:'var(--accent)',color:'#fff',border:'none',width:'100%',justifyContent:'center'}}>프리셋 저장</button>
          </div>
          <div>
            <CardPreview preset={preset} type={cardType} title={title.replace(/\\n/g,'\n')} ctaLevel={ctaLevel} />
            {/* AI Visual Smell */}
            <div className="card" style={{marginTop:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="card-title">AI Visual Smell</span>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:20,fontWeight:700,color:'var(--red)',fontFamily:'var(--mono)'}}>{aiSmell.before}%</span>
                  <span style={{color:'var(--muted)'}}>→</span>
                  <span style={{fontSize:20,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{aiSmell.after}%</span>
                </div>
              </div>
              <div style={{height:8,borderRadius:4,background:'var(--surface)',marginTop:8,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${100-aiSmell.after}%`,borderRadius:4,background:'linear-gradient(90deg,var(--green),var(--accent))',transition:'width 0.5s'}} />
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Channel Compare' && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
          {CHANNELS_VIS.map(ch => (
            <div key={ch}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:'var(--accent)'}}>{ch}</div>
              <CardPreview preset={preset} type={ch==='LinkedIn'?'LinkedIn Card':'Blog Cover'} title={title.replace(/\\n/g,'\n')} ctaLevel={ctaLevel} />
            </div>
          ))}
        </div>
      )}

      {tab === 'CTA Preview' && (
        <div>
          <p style={{fontSize:13,color:'var(--muted)',marginBottom:16}}>CTA 강도별 비교</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {[1,3,5].map(level => (
              <div key={level}>
                <div style={{fontSize:12,fontWeight:600,marginBottom:6,color:level===1?'var(--muted)':level===5?'var(--red)':'var(--accent)'}}>CTA Level {level}</div>
                <CardPreview preset={preset} type="CTA Banner" title={title.replace(/\\n/g,'\n')} ctaLevel={level} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Brand Consistency' && (
        <div className="grid-3">
          <div className="card" style={{textAlign:'center'}}>
            <div className="card-title" style={{marginBottom:12}}>Brand Consistency</div>
            <ConsistencyMeter value={consistency} />
          </div>
          <div className="card">
            <div className="card-title" style={{marginBottom:12}}>일관성 항목</div>
            {[
              {name:'색상 일관성',v:preset.id==='tai_pro'?95:85},
              {name:'레이아웃 일관성',v:92},
              {name:'CTA 일관성',v:88},
              {name:'채널 정렬',v:preset.id==='tai_pro'?90:78},
              {name:'톤 정렬',v:86},
            ].map(item => (
              <div key={item.name} style={{marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:3}}>
                  <span>{item.name}</span>
                  <span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>{item.v}%</span>
                </div>
                <div style={{height:4,borderRadius:2,background:'var(--surface)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${item.v}%`,borderRadius:2,background:item.v>85?'var(--green)':'var(--yellow)'}} />
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title" style={{marginBottom:12}}>Visual DNA</div>
            <svg viewBox="0 0 200 200" style={{width:'100%'}}>
              {(() => {
                const items = [{l:'전문성',v:preset.id==='tai_pro'?9:7},{l:'명확성',v:8},{l:'CTA',v:ctaLevel*2},{l:'미니말',v:preset.id==='minimal_b2b'?9:6},{l:'기술감',v:preset.id==='tech_insight'?9:7},{l:'온기',v:preset.id==='safety_alert'?4:6}]
                const cx=100,cy=100,r=70
                const pts = items.map((item,i) => {
                  const angle = (Math.PI*2*i/items.length) - Math.PI/2
                  const val = item.v/10
                  return {x:cx+Math.cos(angle)*r*val,y:cy+Math.sin(angle)*r*val,lx:cx+Math.cos(angle)*(r+16),ly:cy+Math.sin(angle)*(r+16),label:item.l}
                })
                return <>
                  {[0.25,0.5,0.75,1].map(l => <polygon key={l} points={items.map((_,i)=>{const a=(Math.PI*2*i/items.length)-Math.PI/2;return`${cx+Math.cos(a)*r*l},${cy+Math.sin(a)*r*l}`}).join(' ')} fill="none" stroke="var(--border)" strokeWidth={0.5} />)}
                  <polygon points={pts.map(p=>`${p.x},${p.y}`).join(' ')} fill="rgba(99,107,255,0.12)" stroke="var(--accent)" strokeWidth={1.5} />
                  {pts.map((p,i) => <text key={i} x={p.lx} y={p.ly} fill="var(--muted)" fontSize={9} textAnchor="middle">{p.label}</text>)}
                  {pts.map((p,i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="var(--accent)" />)}
                </>
              })()}
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}