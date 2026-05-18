"use client"
import { useState, useMemo } from "react"

// Client-side simulation engine (mirrors runtime logic)
const COEFF: Record<string,{base:number,decay:number,ctaSens:number,fatFact:number,recov:number}> = {
  linkedin:{base:4.2,decay:0.08,ctaSens:0.7,fatFact:0.12,recov:0.3},
  facebook:{base:5.5,decay:0.15,ctaSens:0.4,fatFact:0.18,recov:0.5},
  naver_blog:{base:3.0,decay:0.03,ctaSens:0.3,fatFact:0.05,recov:0.2},
}

function runSim(ch:string,ppw:number,ctaType:'soft'|'advisory'|'hard',ctaInt:number,days:number) {
  const c = COEFF[ch]||COEFF.linkedin
  const daily: {day:number,eng:number,fat:number,cta:number,leads:number}[] = []
  let fat=0,totLeads=0
  for(let d=1;d<=days;d++){
    const dp=Math.max(0,(ppw-2)*c.fatFact*8), cp=ctaInt>3?(ctaInt-3)*c.ctaSens*3:0
    fat=Math.max(0,Math.min(100,fat+dp+cp+d*0.3-fat*c.recov*0.05+(Math.random()-0.5)*5))
    const eng=Math.max(0.5,c.base*(1-c.decay*Math.max(0,ppw-3))*(1-fat/100*c.fatFact*3)+(Math.random()-0.5)*0.8)
    const ctaBase={soft:1.2,advisory:2.0,hard:3.5}[ctaType]
    const conv=Math.max(0.1,ctaBase*(1-fat/100*c.ctaSens)*(1-d*0.005)+(Math.random()-0.5)*0.3)
    const leads=Math.max(0,Math.round(conv*0.3+(Math.random()-0.5)))
    totLeads+=leads
    daily.push({day:d,eng:Math.round(eng*10)/10,fat:Math.round(fat),cta:Math.round(conv*10)/10,leads})
  }
  const avgEng=daily.reduce((s,d)=>s+d.eng,0)/days
  const avgCta=daily.reduce((s,d)=>s+d.cta,0)/days
  return {daily,summary:{avgEng:Math.round(avgEng*10)/10,avgCta:Math.round(avgCta*10)/10,totalLeads:totLeads,finalFatigue:daily[daily.length-1]?.fat??0}}
}

export default function SimulationPage() {
  const [ch, setCh] = useState('linkedin')
  const [ppw, setPpw] = useState(3)
  const [ctaType, setCtaType] = useState<'soft'|'advisory'|'hard'>('soft')
  const [ctaInt, setCtaInt] = useState(3)
  const [days, setDays] = useState(30)
  const [compareMode, setCompareMode] = useState(false)
  const [ch2, setCh2] = useState('facebook')
  const [ppw2, setPpw2] = useState(5)

  const sim = useMemo(() => runSim(ch, ppw, ctaType, ctaInt, days), [ch, ppw, ctaType, ctaInt, days])
  const sim2 = useMemo(() => compareMode ? runSim(ch2, ppw2, ctaType, ctaInt, days) : null, [compareMode, ch2, ppw2, ctaType, ctaInt, days])

  const maxEng = Math.max(...sim.daily.map(d=>d.eng), ...(sim2?.daily.map(d=>d.eng)??[1]))

  return (
    <div>
      <h1 className="page-title">Simulation</h1>
      <p className="page-sub">운영 시나리오를 시뮬레이션하세요 — 비용 없이 운영 리듬을 실험합니다</p>

      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:16}}>
        {/* Config */}
        <div className="card" style={{alignSelf:'start'}}>
          <div className="card-title" style={{marginBottom:12}}>시뮬레이션 설정</div>
          <div style={{marginBottom:10}}>
            <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>채널</label>
            <select value={ch} onChange={e=>setCh(e.target.value)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12}}>
              <option value="linkedin">LinkedIn</option><option value="facebook">Facebook</option><option value="naver_blog">Naver Blog</option>
            </select>
          </div>
          <div style={{marginBottom:10}}>
            <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>발행 빈도 (주): {ppw}</label>
            <input type="range" min={1} max={7} value={ppw} onChange={e=>setPpw(parseInt(e.target.value))} style={{width:'100%',accentColor:'var(--accent)'}} />
          </div>
          <div style={{marginBottom:10}}>
            <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>CTA 유형</label>
            <select value={ctaType} onChange={e=>setCtaType(e.target.value as any)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12}}>
              <option value="soft">Soft</option><option value="advisory">Advisory</option><option value="hard">Hard</option>
            </select>
          </div>
          <div style={{marginBottom:10}}>
            <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>CTA 강도: {ctaInt}</label>
            <input type="range" min={1} max={5} value={ctaInt} onChange={e=>setCtaInt(parseInt(e.target.value))} style={{width:'100%',accentColor:'var(--accent)'}} />
          </div>
          <div style={{marginBottom:10}}>
            <label style={{fontSize:12,color:'var(--muted)',display:'block',marginBottom:4}}>기간: {days}일</label>
            <input type="range" min={7} max={90} value={days} onChange={e=>setDays(parseInt(e.target.value))} style={{width:'100%',accentColor:'var(--accent)'}} />
          </div>
          <label style={{fontSize:12,color:'var(--muted)',display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
            <input type="checkbox" checked={compareMode} onChange={e=>setCompareMode(e.target.checked)} /> 비교 모드
          </label>
          {compareMode && <>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:11,color:'var(--yellow)',display:'block',marginBottom:4}}>비교 채널</label>
              <select value={ch2} onChange={e=>setCh2(e.target.value)} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12}}>
                <option value="linkedin">LinkedIn</option><option value="facebook">Facebook</option><option value="naver_blog">Naver Blog</option>
              </select>
            </div>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:11,color:'var(--yellow)',display:'block',marginBottom:4}}>비교 빈도: {ppw2}/w</label>
              <input type="range" min={1} max={7} value={ppw2} onChange={e=>setPpw2(parseInt(e.target.value))} style={{width:'100%',accentColor:'var(--yellow)'}} />
            </div>
          </>}
        </div>

        {/* Results */}
        <div>
          {/* Summary Cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--accent)',fontFamily:'var(--mono)'}}>{sim.summary.avgEng}%</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>Avg Engagement</div>
              {sim2 && <div style={{fontSize:11,color:'var(--yellow)',marginTop:4}}>비교: {sim2.summary.avgEng}%</div>}
            </div>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{sim.summary.avgCta}%</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>Avg CTA Conv</div>
              {sim2 && <div style={{fontSize:11,color:'var(--yellow)',marginTop:4}}>비교: {sim2.summary.avgCta}%</div>}
            </div>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{sim.summary.totalLeads}</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>Total Leads</div>
              {sim2 && <div style={{fontSize:11,color:'var(--yellow)',marginTop:4}}>비교: {sim2.summary.totalLeads}</div>}
            </div>
            <div className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:sim.summary.finalFatigue>60?'var(--red)':'var(--green)',fontFamily:'var(--mono)'}}>{sim.summary.finalFatigue}%</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>Final Fatigue</div>
              {sim2 && <div style={{fontSize:11,color:'var(--yellow)',marginTop:4}}>비교: {sim2.summary.finalFatigue}%</div>}
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header"><span className="card-title">Engagement Trend</span></div>
            <div style={{display:'flex',gap:1,alignItems:'flex-end',height:100}}>
              {sim.daily.map((d,i) => <div key={i} style={{flex:1,display:'flex',flexDirection:'column',gap:1,alignItems:'center',justifyContent:'flex-end',height:'100%'}}>
                <div style={{width:'100%',height:`${d.eng/maxEng*100}%`,background:'var(--accent)',borderRadius:'2px 2px 0 0',opacity:0.8,minHeight:2}} />
                {sim2 && <div style={{width:'100%',height:`${(sim2.daily[i]?.eng??0)/maxEng*100}%`,background:'var(--yellow)',borderRadius:'2px 2px 0 0',opacity:0.6,minHeight:1}} />}
              </div>)}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginTop:4}}><span>Day 1</span><span>Day {days}</span></div>
          </div>

          {/* Fatigue Chart */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header"><span className="card-title">Fatigue Progression</span></div>
            <div style={{display:'flex',gap:1,alignItems:'flex-end',height:80}}>
              {sim.daily.map((d,i) => <div key={i} style={{flex:1,height:`${d.fat}%`,background:d.fat>60?'var(--red)':d.fat>30?'var(--yellow)':'var(--green)',borderRadius:'2px 2px 0 0',opacity:0.7,minHeight:1}} />)}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginTop:4}}><span>Day 1</span><span>Day {days}</span></div>
          </div>

          {/* Principle */}
          <div className="card">
            <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
              시뮬레이션은 실제 운영 전 비용 없이 운영 리듬을 실험할 수 있습니다.
              채널별 반응 차이, 피로도 변화, CTA 전략 비교를 통해 최적의 운영 전략을 찾으세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}