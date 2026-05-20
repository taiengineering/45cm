"use client"
import { useState } from "react"

const QUEUE = [
  {type:'approval',title:'LinkedIn: TAI Safety Checker 소개',risk:'low',confidence:82,reason:'정기 authority 콘텐츠'},
  {type:'event',title:'서비스 점검 긴급 공지',risk:'high',confidence:45,reason:'cadence override 필요'},
  {type:'approval',title:'Blog Hard CTA 게시',risk:'medium',confidence:60,reason:'trust surface에서 CTA 강도 높음'},
  {type:'recovery',title:'Instagram cooldown 권장',risk:'low',confidence:88,reason:'피로도 55% 초과'},
  {type:'surface',title:'Shorts→Blog 라우팅 변경',risk:'low',confidence:75,reason:'순동영상 과밀, trust 회복 필요'},
]
const TYPE_LABEL:Record<string,{label:string,color:string}> = { approval:{label:'승인',color:'var(--accent)'}, event:{label:'이벤트',color:'var(--red)'}, recovery:{label:'회복',color:'var(--green)'}, surface:{label:'Surface',color:'var(--yellow)'} }

export default function QueuePage() {
  return (
    <div>
      <h1 className="page-title">Queue</h1>
      <p className="page-sub">운영자 검토 대기열 — 승인, 이벤트, 회복, Surface 적응</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        {['approval','event','recovery','surface'].map(t=>{
          const s = TYPE_LABEL[t]
          const count = QUEUE.filter(q=>q.type===t).length
          return <div key={t} className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:700,fontFamily:'var(--mono)',color:s.color}}>{count}</div>
            <div style={{fontSize:10,color:'var(--muted)'}}>{s.label}</div>
          </div>
        })}
      </div>

      {QUEUE.map((q,i)=>{
        const s = TYPE_LABEL[q.type]??TYPE_LABEL.approval
        return <div key={i} className="card" style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4}}>
                <span style={{fontSize:9,padding:'1px 6px',borderRadius:3,background:'var(--surface)',color:s.color,fontWeight:600}}>{s.label}</span>
                <span style={{fontSize:9,color:q.risk==='high'?'var(--red)':q.risk==='medium'?'var(--yellow)':'var(--green)'}}>Risk: {q.risk}</span>
                <span style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--mono)'}}>AI {q.confidence}%</span>
              </div>
              <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{q.title}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>판단 근거: {q.reason}</div>
            </div>
            <div style={{display:'flex',gap:4,marginLeft:12}}>
              <button style={{fontSize:10,padding:'5px 12px',borderRadius:5,background:'var(--green)',color:'#fff',border:'none',cursor:'pointer'}}>✅</button>
              <button style={{fontSize:10,padding:'5px 12px',borderRadius:5,background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)',cursor:'pointer'}}>❌</button>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}