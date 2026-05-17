"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

const CHANNELS = [{id:'linkedin',name:'LinkedIn',desc:'전문성 중심 B2B'},{id:'facebook',name:'Facebook',desc:'친근한 대화형'},{id:'naver_blog',name:'Naver Blog',desc:'정보형 + SEO'},{id:'naver_kin',name:'Naver 지식인',desc:'전문가 답변 느낌'}]

const DEFAULTS: Record<string,{tone:number,professionalism:number,friendliness:number,directness:number,ctaIntensity:number,humanization:number,antiAi:number}> = {
  linkedin:{tone:8,professionalism:9,friendliness:4,directness:7,ctaIntensity:5,humanization:8,antiAi:9},
  facebook:{tone:5,professionalism:5,friendliness:9,directness:5,ctaIntensity:6,humanization:7,antiAi:8},
  naver_blog:{tone:6,professionalism:7,friendliness:6,directness:6,ctaIntensity:7,humanization:8,antiAi:9},
  naver_kin:{tone:7,professionalism:8,friendliness:5,directness:8,ctaIntensity:4,humanization:9,antiAi:9},
}

export default function BrandPage() {
  const [channel, setChannel] = useState('linkedin')
  const [values, setValues] = useState(DEFAULTS.linkedin)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setValues(DEFAULTS[channel] || DEFAULTS.linkedin) }, [channel])

  const sliders: {key:string,label:string,low:string,high:string}[] = [
    {key:'tone',label:'톤',low:'캠주얼',high:'포말'},
    {key:'professionalism',label:'전문성',low:'일반적',high:'전문가'},
    {key:'friendliness',label:'친근함',low:'거리감',high:'친근'},
    {key:'directness',label:'직설성',low:'원론적',high:'직설적'},
    {key:'ctaIntensity',label:'CTA 강도',low:'은은',high:'적극적'},
    {key:'humanization',label:'인간화 수준',low:'낮음',high:'최대'},
    {key:'antiAi',label:'Anti-AI 강도',low:'낮음',high:'최대'},
  ]

  return (
    <div>
      <h1 className="page-title">Brand Studio</h1>
      <p className="page-sub">채널별 브랜드 보이스를 조절하세요. AI 느낌 제거 강도를 설정합니다.</p>
      {saved && <div className="card" style={{borderColor:'var(--green)',background:'var(--green-soft)',marginBottom:16}}><span style={{color:'var(--green)',fontWeight:600}}>✅ 저장됨</span></div>}
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {CHANNELS.map(ch => (
          <button key={ch.id} className="btn" onClick={()=>setChannel(ch.id)} style={channel===ch.id?{background:'var(--accent)',color:'#fff',border:'none'}:{}}>
            {ch.name}
          </button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">{CHANNELS.find(c=>c.id===channel)?.name} 브랜드 설정</span></div>
          <p style={{fontSize:12,color:'var(--muted)',marginBottom:16}}>{CHANNELS.find(c=>c.id===channel)?.desc}</p>
          {sliders.map(s => (
            <div key={s.key} style={{marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                <span style={{color:'var(--fg)',fontWeight:600}}>{s.label}</span>
                <span style={{color:'var(--accent)',fontFamily:'var(--mono)'}}>{(values as any)[s.key]}/10</span>
              </div>
              <input type="range" min={1} max={10} value={(values as any)[s.key]} onChange={e=>setValues({...values,[s.key]:parseInt(e.target.value)})} style={{width:'100%',accentColor:'var(--accent)'}} />
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--muted)'}}>
                <span>{s.low}</span><span>{s.high}</span>
              </div>
            </div>
          ))}
          <button className="btn" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000)}} style={{background:'var(--accent)',color:'#fff',border:'none',width:'100%',justifyContent:'center',marginTop:8}}>저장</button>
        </div>
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-title" style={{marginBottom:8}}>프리뷰</div>
            <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
              {values.professionalism > 7 ? '전문성이 높은 톤으로 ' : '친근한 톤으로 '}
              {values.directness > 6 ? '직설적이고 ' : '부드럽고 '}
              {values.friendliness > 6 ? '다정한 ' : '객관적인 '}
              느낌으로 작성됩니다.
              {values.antiAi > 7 ? ' AI 느낌을 최대한 제거합니다.' : ''}
              {values.ctaIntensity > 6 ? ' CTA를 적극적으로 노출합니다.' : ' CTA는 자연스럽게 노출됩니다.'}
            </p>
          </div>
          <div className="card">
            <div className="card-title" style={{marginBottom:8}}>핵심 원칙</div>
            <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.8}}>
              사람이 전략과 브랜드를 설정하고,<br/>
              엔진이 운영을 증폭합니다.<br/><br/>
              AI가 방향을 정하지 않습니다.<br/>
              운영자가 방향을 정합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}