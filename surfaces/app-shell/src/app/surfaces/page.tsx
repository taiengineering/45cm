"use client"
import { useState } from "react"

const SURFACES = [
  {ch:'LinkedIn',surface:'Authority Feed',health:78,fatigue:15,trust:82,freshness:70,consistency:75,cta:'consultative',density:'high',explanation:'LinkedIn은 전문성 중심 B2B 톤으로 적응했습니다.'},
  {ch:'Naver Blog',surface:'Trust Blog',health:35,fatigue:5,trust:70,freshness:20,consistency:40,cta:'advisory',density:'very_high',explanation:'Naver Blog은 신뢰 확보를 위해 상세 설명을 유지했습니다.'},
  {ch:'Instagram',surface:'Social Feed',health:55,fatigue:40,trust:50,freshness:60,consistency:55,cta:'soft only',density:'medium',explanation:'Instagram은 visual presence 중심으로 축약했습니다.'},
  {ch:'YouTube Shorts',surface:'Short Discovery',health:45,fatigue:55,trust:40,freshness:50,consistency:45,cta:'none',density:'very_low',explanation:'YouTube Shorts는 hook-first 방식으로 discovery 최적화했습니다.'},
  {ch:'Kakao Channel',surface:'Direct Messaging',health:60,fatigue:10,trust:65,freshness:80,consistency:70,cta:'direct',density:'low',explanation:'Kakao는 간결한 다이렉트 메시지로 변환했습니다.'},
]
const HEALTH_COLOR = (v:number) => v>70?'var(--green)':v>40?'var(--yellow)':'var(--red)'

export default function SurfacesPage() {
  const [selected,setSelected] = useState(0)
  const s = SURFACES[selected]
  return (
    <div>
      <h1 className="page-title">Content Surfaces</h1>
      <p className="page-sub">채널별 브랜드 Surface 상태 — 같은 콘텐츠를 복붙하지 않고 채널에 맞게 적응합니다</p>

      {/* Surface Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:16}}>
        {SURFACES.map((sf,i)=>(
          <div key={sf.ch} className="card" onClick={()=>setSelected(i)} style={{cursor:'pointer',textAlign:'center',borderColor:i===selected?'var(--accent)':'var(--border)'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{sf.ch}</div>
            <div style={{fontSize:10,color:'var(--muted)',marginBottom:6}}>{sf.surface}</div>
            <div style={{fontSize:20,fontWeight:700,fontFamily:'var(--mono)',color:HEALTH_COLOR(sf.health)}}>{sf.health}</div>
            <div style={{fontSize:9,color:'var(--muted)'}}>Health Score</div>
          </div>
        ))}
      </div>

      {/* Selected Surface Detail */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-title" style={{marginBottom:10}}>{s.ch} — {s.surface}</div>
          {[{l:'Health',v:s.health},{l:'Freshness',v:s.freshness},{l:'Trust',v:s.trust},{l:'Consistency',v:s.consistency},{l:'Fatigue',v:s.fatigue}].map(m=>(
            <div key={m.l} style={{marginBottom:8}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:2}}>
                <span style={{color:'var(--muted)'}}>{m.l}</span>
                <span style={{fontFamily:'var(--mono)',color:m.l==='Fatigue'?(m.v<30?'var(--green)':'var(--red)'):HEALTH_COLOR(m.v)}}>{m.v}%</span>
              </div>
              <div style={{height:5,borderRadius:3,background:'var(--surface)',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${m.v}%`,borderRadius:3,background:m.l==='Fatigue'?(m.v<30?'var(--green)':'var(--red)'):HEALTH_COLOR(m.v)}} />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:10}}>적응 정보</div>
          <div style={{fontSize:12,color:'var(--muted)',lineHeight:2.2}}>
            <div>Density: <span style={{fontWeight:600,color:'var(--fg)'}}>{s.density}</span></div>
            <div>CTA: <span style={{fontWeight:600,color:'var(--fg)'}}>{s.cta}</span></div>
          </div>
          <div style={{marginTop:12,padding:12,borderRadius:8,background:'var(--surface)',fontSize:11,color:'var(--accent)',lineHeight:1.8}}>
            💡 {s.explanation}
          </div>
        </div>
      </div>

      {/* Brand Surface Graph */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Brand Surface Graph</span></div>
        <div style={{display:'flex',gap:1,alignItems:'flex-end',height:100}}>
          {SURFACES.map(sf=>(
            <div key={sf.ch} style={{flex:1,display:'flex',flexDirection:'column',gap:2,justifyContent:'flex-end',height:'100%'}}>
              <div style={{height:`${sf.trust*0.5}%`,background:'var(--accent)',borderRadius:'2px 2px 0 0',opacity:0.8,minHeight:2}} title={`Trust: ${sf.trust}`} />
              <div style={{height:`${sf.fatigue*0.5}%`,background:'var(--red)',borderRadius:'2px 2px 0 0',opacity:0.6,minHeight:1}} title={`Fatigue: ${sf.fatigue}`} />
              <div style={{height:`${sf.freshness*0.5}%`,background:'var(--green)',borderRadius:'2px 2px 0 0',opacity:0.7,minHeight:1}} title={`Fresh: ${sf.freshness}`} />
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginTop:4}}>{SURFACES.map(sf=><span key={sf.ch}>{sf.ch}</span>)}</div>
        <div style={{display:'flex',gap:12,marginTop:6}}>
          {[{l:'Trust',c:'var(--accent)'},{l:'Fatigue',c:'var(--red)'},{l:'Freshness',c:'var(--green)'}].map(x=><span key={x.l} style={{fontSize:9,display:'flex',alignItems:'center',gap:3}}><span style={{width:8,height:8,borderRadius:2,background:x.c}} />{x.l}</span>)}
        </div>
      </div>

      <div className="card">
        <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
          같은 콘텐츠를 복붙하지 않습니다. 각 채널 Surface에 맞게 운영 목적, 리듬, 신뢰, 피로도에 따라 적응시킵니다.
          AI가 왓 그렇게 적응했는지 설명합니다.
        </p>
      </div>
    </div>
  )
}