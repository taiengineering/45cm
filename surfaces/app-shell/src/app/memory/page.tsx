"use client"
import { useState } from "react"

const BRAND_MEM = [
  {type:'tone',value:'professional, trustworthy',conf:78},
  {type:'cta_level',value:'soft~advisory 선호',conf:85},
  {type:'content_preference',value:'trust + authority 중심',conf:72},
  {type:'visual_style',value:'clean, minimal B2B',conf:65},
  {type:'trust_focus',value:'신뢰 중심 운영',conf:80},
]
const OP_PATTERNS = [
  {type:'승인 성향',value:'Soft CTA 항상 승인',count:12},
  {type:'거절 성향',value:'Hard CTA 자주 거절',count:8},
  {type:'선호 Surface',value:'LinkedIn authority > Instagram',count:15},
  {type:'무시 추천',value:'일반 insight 자주 리스트',count:6},
]
const RECOVERY = [
  {ch:'LinkedIn',strategy:'Blog trust recovery',effectiveness:82},
  {ch:'Instagram',strategy:'Cooldown 3일',effectiveness:75},
  {ch:'Facebook',strategy:'Soft CTA 전환',effectiveness:68},
]
const TRUST_TREND = {score:72,trend:'improving' as const}
const MEMORY_CONF = 'learning'
const PERSONALITY = 'trust_oriented'
const MATURITY = 'growing'

const CONF_STYLE:Record<string,{color:string,label:string}> = { low_memory:{color:'var(--muted)',label:'학습 초기'}, learning:{color:'var(--yellow)',label:'학습 중'}, stable:{color:'var(--accent)',label:'안정'}, high_confidence:{color:'var(--green)',label:'높은 신뢰도'} }

export default function MemoryPage() {
  return (
    <div>
      <h1 className="page-title">Intelligence Memory</h1>
      <p className="page-sub">브랜드와 운영자를 점점 이해해가는 적응형 기억</p>

      {/* Status Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:10,color:'var(--muted)'}}>Memory 신뢰도</div>
          <div style={{fontSize:16,fontWeight:700,color:CONF_STYLE[MEMORY_CONF].color}}>{CONF_STYLE[MEMORY_CONF].label}</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:10,color:'var(--muted)'}}>AI 신뢰도</div>
          <div style={{fontSize:16,fontWeight:700,fontFamily:'var(--mono)',color:'var(--accent)'}}>{TRUST_TREND.score}%</div>
          <div style={{fontSize:9,color:TRUST_TREND.trend==='improving'?'var(--green)':'var(--muted)'}}>↑ {TRUST_TREND.trend}</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:10,color:'var(--muted)'}}>Workspace 성격</div>
          <div style={{fontSize:14,fontWeight:700,color:'var(--accent)'}}>{PERSONALITY}</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:10,color:'var(--muted)'}}>Brand 성숙도</div>
          <div style={{fontSize:14,fontWeight:700,color:'var(--green)'}}>{MATURITY}</div>
        </div>
      </div>

      {/* Brand Memory */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><span className="card-title">브랜드 기억</span></div>
        {BRAND_MEM.map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
            <div>
              <span style={{fontSize:10,color:'var(--muted)',marginRight:8}}>{m.type}</span>
              <span style={{fontSize:12,fontWeight:600}}>{m.value}</span>
            </div>
            <div style={{width:60}}>
              <div style={{height:5,borderRadius:3,background:'var(--surface)',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${m.conf}%`,borderRadius:3,background:'var(--accent)'}} />
              </div>
              <div style={{fontSize:9,color:'var(--muted)',textAlign:'right',marginTop:1}}>{m.conf}%</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        {/* Operator Patterns */}
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>운영자 패턴</div>
          {OP_PATTERNS.map((p,i)=>(
            <div key={i} style={{padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
              <span style={{color:'var(--muted)',fontSize:10}}>{p.type}</span>
              <div style={{fontWeight:600}}>{p.value} <span style={{color:'var(--accent)',fontFamily:'var(--mono)',fontSize:10}}>x{p.count}</span></div>
            </div>
          ))}
        </div>

        {/* Recovery Memory */}
        <div className="card">
          <div className="card-title" style={{marginBottom:8}}>회복 기억</div>
          {RECOVERY.map((r,i)=>(
            <div key={i} style={{padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
              <span style={{fontWeight:600}}>{r.ch}</span>
              <div style={{color:'var(--muted)',fontSize:11}}>{r.strategy}</div>
              <div style={{marginTop:2}}>
                <div style={{height:4,borderRadius:2,background:'var(--surface)',overflow:'hidden',width:100}}>
                  <div style={{height:'100%',width:`${r.effectiveness}%`,borderRadius:2,background:'var(--green)'}} />
                </div>
                <span style={{fontSize:9,color:'var(--green)'}}>효과 {r.effectiveness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8,margin:0}}>
          Intelligence Memory는 운영 경험을 축적하여 브랜드와 운영자를 점점 이해합니다.
          추천이 개인화되고, 승인이 적응되고, 회복 전략이 학습됩니다.
          Memory 신뢰도가 낮을 때는 과한 personalization을 제한합니다.
        </p>
      </div>
    </div>
  )
}