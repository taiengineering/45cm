"use client"
import { useState, useMemo } from "react"

// Client-side world engine (mirrors runtime)
function runWorld(channels:string[], campaigns:{id:string,ch:string,ppw:number,cta:'soft'|'advisory'|'hard',ctaI:number}[], days:number) {
  const states: any[] = [];
  const chs: Record<string,{h:number,f:number,as:number,ct:number}> = {};
  for(const ch of channels) chs[ch]={h:80,f:10,as:70,ct:60};
  let aud={ei:60,cr:20,bf:10,cf:5,ts:50}, op={ab:0,rf:0};
  for(let d=1;d<=days;d++){
    for(const c of campaigns){
      const s=chs[c.ch]; const pt=c.ppw/7;
      s.f=Math.max(0,Math.min(100,s.f+pt*8+c.ctaI*3-4+(Math.random()-0.5)*3));
      s.h=Math.max(0,Math.min(100,100-s.f*0.4));
      s.as=Math.max(20,s.as-s.f*0.02+(100-s.f)*0.01);
      s.ct=Math.max(10,s.ct-c.ctaI*2+(100-s.f)*0.05);
    }
    const avgCta=campaigns.reduce((s,c)=>s+c.ctaI,0)/campaigns.length;
    aud.ei=Math.max(10,Math.min(100,aud.ei+6*0.5-aud.cf*0.1+(Math.random()-0.5)*3));
    aud.cr=Math.min(90,aud.cr+avgCta*1.5-(100-aud.cf)*0.05);
    aud.bf=Math.min(100,aud.bf+0.3);
    aud.cf=Math.max(0,Math.min(100,aud.cf+1.5-(100-aud.cf)*0.02));
    aud.ts=Math.max(10,Math.min(100,aud.ts+6*0.2-avgCta*0.8));
    op.ab=Math.max(0,op.ab+campaigns.length*0.3-2);
    op.rf=Math.min(100,Math.max(0,op.rf+campaigns.length*1-5));
    states.push({day:d,channels:{...Object.fromEntries(Object.entries(chs).map(([k,v])=>([k,{...v}])))},aud:{...aud},op:{...op}});
  }
  return states;
}

export default function WorldPage() {
  const [days,setDays]=useState(60)
  const [speed,setSpeed]=useState('1day/tick')
  const campaigns = [{id:'c1',ch:'linkedin',ppw:3,cta:'soft' as const,ctaI:3},{id:'c2',ch:'naver_blog',ppw:2,cta:'advisory' as const,ctaI:2},{id:'c3',ch:'facebook',ppw:1,cta:'soft' as const,ctaI:1}]
  const channels = ['linkedin','naver_blog','facebook']

  const states = useMemo(()=>runWorld(channels,campaigns,days),[days])
  const last = states[states.length-1]
  const CH_LABEL:Record<string,string> = {linkedin:'LinkedIn',naver_blog:'Naver Blog',facebook:'Facebook'}

  return (
    <div>
      <h1 className="page-title">Simulation World</h1>
      <p className="page-sub">시간이 흐르며 살아 움직이는 운영 세계</p>

      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <div style={{fontSize:12,color:'var(--muted)',display:'flex',alignItems:'center',gap:6}}>
          기간: <input type="range" min={14} max={180} value={days} onChange={e=>setDays(parseInt(e.target.value))} style={{accentColor:'var(--accent)',width:120}} /> {days}일
        </div>
        <select value={speed} onChange={e=>setSpeed(e.target.value)} style={{padding:'4px 8px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12}}>
          <option value="1hour/tick">1hour/tick</option>
          <option value="1day/tick">1day/tick</option>
          <option value="1week/tick">1week/tick</option>
          <option value="1month/tick">1month/tick</option>
        </select>
      </div>

      {/* Channel Health Evolution */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Channel Health Evolution</span></div>
        <div style={{display:'flex',gap:1,alignItems:'flex-end',height:100}}>
          {states.map((s,i)=><div key={i} style={{flex:1,display:'flex',flexDirection:'column',gap:1,justifyContent:'flex-end',height:'100%'}}>
            {channels.map(ch=><div key={ch} style={{height:`${(s.channels[ch]?.h??0)/channels.length}%`,background:ch==='linkedin'?'var(--accent)':ch==='facebook'?'var(--yellow)':'var(--green)',opacity:0.7,minHeight:1,borderRadius:'1px 1px 0 0'}} />)}
          </div>)}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginTop:4}}><span>Day 1</span><span>Day {days}</span></div>
        <div style={{display:'flex',gap:12,marginTop:8}}>{channels.map(ch=><span key={ch} style={{fontSize:10,display:'flex',alignItems:'center',gap:4}}><span style={{width:8,height:8,borderRadius:2,background:ch==='linkedin'?'var(--accent)':ch==='facebook'?'var(--yellow)':'var(--green)'}} />{CH_LABEL[ch]}</span>)}</div>
      </div>

      {/* Channel States */}
      <div className="grid-3" style={{marginBottom:16}}>
        {channels.map(ch=>{
          const s=last?.channels[ch]
          return <div key={ch} className="card">
            <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>{CH_LABEL[ch]}</div>
            {[{l:'Health',v:s?.h??0,c:s?.h>60?'var(--green)':'var(--red)'},{l:'Fatigue',v:s?.f??0,c:s?.f<40?'var(--green)':'var(--red)'},{l:'Audience Sens.',v:s?.as??0,c:'var(--accent)'},{l:'CTA Tolerance',v:s?.ct??0,c:'var(--yellow)'}].map(m=><div key={m.l} style={{marginBottom:6}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:2}}><span style={{color:'var(--muted)'}}>{m.l}</span><span style={{fontFamily:'var(--mono)',color:m.c}}>{m.v}%</span></div>
              <div style={{height:4,borderRadius:2,background:'var(--surface)',overflow:'hidden'}}><div style={{height:'100%',width:`${m.v}%`,borderRadius:2,background:m.c}} /></div>
            </div>)}
          </div>
        })}
      </div>

      {/* Audience & Operator */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>Audience State</div>
          {last&&[{l:'Engagement Interest',v:last.aud.ei},{l:'CTA Resistance',v:last.aud.cr},{l:'Brand Familiarity',v:last.aud.bf},{l:'Content Fatigue',v:last.aud.cf},{l:'Trust Score',v:last.aud.ts}].map(m=><div key={m.l} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'4px 0',borderBottom:'1px solid var(--border)'}}><span>{m.l}</span><span style={{fontFamily:'var(--mono)',color:'var(--accent)'}}>{Math.round(m.v)}%</span></div>)}
        </div>
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>Operator Load</div>
          {last&&[{l:'Approval Backlog',v:last.op.ab},{l:'Review Fatigue',v:last.op.rf}].map(m=><div key={m.l} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'4px 0',borderBottom:'1px solid var(--border)'}}><span>{m.l}</span><span style={{fontFamily:'var(--mono)',color:m.v>50?'var(--red)':'var(--green)'}}>{Math.round(m.v)}</span></div>)}
          <p style={{fontSize:11,color:'var(--muted)',marginTop:8,lineHeight:1.7}}>Active Campaigns: {campaigns.length}<br/>Channels: {channels.length}</p>
        </div>
      </div>

      {/* Fatigue Accumulation */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">Fatigue Accumulation</span></div>
        <div style={{display:'flex',gap:1,alignItems:'flex-end',height:80}}>
          {states.map((s,i)=>{const maxF=Math.max(...channels.map(ch=>s.channels[ch]?.f??0)); return <div key={i} style={{flex:1,height:`${maxF}%`,background:maxF>60?'var(--red)':maxF>30?'var(--yellow)':'var(--green)',borderRadius:'1px 1px 0 0',opacity:0.7,minHeight:1}} />})}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginTop:4}}><span>Day 1</span><span>Day {days}</span></div>
      </div>

      <div className="card">
        <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
          Persistent Simulation World는 시간이 흐르며 살아 움직이는 운영 세계입니다.
          채널 건강도, 피로도, Audience 신뢰, CTA 저항, 운영자 부하가 지속적으로 변화합니다.
          이 데이터를 통해 장기 운영 전략을 수립할 수 있습니다.
        </p>
      </div>
    </div>
  )
}