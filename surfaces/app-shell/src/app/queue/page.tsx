"use client"
import { useState } from "react"

const QUEUE = [
  {type:'승인',title:'LinkedIn: TAI Safety Checker 소개',risk:'낮음',confidence:82,reason:'정기 전문성 콘텐츠'},
  {type:'이벤트',title:'서비스 점검 긴급 공지',risk:'높음',confidence:45,reason:'발행 리듬 변경이 필요합니다'},
  {type:'승인',title:'블로그 강한 CTA 콘텐츠',risk:'중간',confidence:60,reason:'CTA 강도가 평소보다 높습니다'},
  {type:'회복',title:'인스타그램 쉬어가기 권장',risk:'낮음',confidence:88,reason:'운영량이 많아져 피로해지고 있어요'},
]

export default function QueuePage() {
  return (
    <div>
      <h1 className="page-title">승인함</h1>
      <p className="page-sub">검토가 필요한 항목들입니다. 왜 검토가 필요한지 함께 보여드립니다.</p>

      <div className="grid-4" style={{marginBottom:16}}>
        {[{l:'승인',c:QUEUE.filter(q=>q.type==='승인').length,color:'var(--accent)'},{l:'이벤트',c:QUEUE.filter(q=>q.type==='이벤트').length,color:'var(--red)'},{l:'회복',c:QUEUE.filter(q=>q.type==='회복').length,color:'var(--green)'},{l:'전체',c:QUEUE.length,color:'var(--fg)'}].map(s=>
          <div key={s.l} className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,fontFamily:'var(--mono)',color:s.color}}>{s.c}</div>
            <div style={{fontSize:11,color:'var(--muted)'}}>{s.l}</div>
          </div>
        )}
      </div>

      {QUEUE.map((q,i)=>(
        <div key={i} className="feed-item" style={{borderLeft:`3px solid ${q.risk==='높음'?'var(--red)':q.risk==='중간'?'var(--yellow)':'var(--green)'}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:5}}>
                <span className={`status-badge ${q.type==='이벤트'?'status-danger':q.type==='회복'?'status-safe':'status-info'}`}>{q.type}</span>
                <span style={{fontSize:10,color:q.risk==='높음'?'var(--red)':q.risk==='중간'?'var(--yellow)':'var(--green)'}}>위험: {q.risk}</span>
                <span style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--mono)'}}>AI {q.confidence}%</span>
              </div>
              <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>{q.title}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>판단 근거: {q.reason}</div>
            </div>
            <div style={{display:'flex',gap:4,marginTop:4}}>
              <button className="btn btn-primary btn-sm">✅ 승인</button>
              <button className="btn btn-sm">❌ 거절</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}