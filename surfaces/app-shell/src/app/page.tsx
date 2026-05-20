"use client"
import { useState, useEffect } from "react"

// Warmth greeting
function getGreeting() {
  const h = new Date().getHours()
  if(h<12) return '좋은 아침입니다 ☕'
  if(h<18) return '오후도 파이팅 💪'
  return '수고하셨습니다 🌙'
}

const FEED = [
  {type:'이벤트',pri:'critical',title:'행사 1일 남음: TAI Safety Expo',body:'이벤트 콘텐츠 준비가 필요합니다.',action:'준비하기'},
  {type:'승인',pri:'important',title:'승인 대기 2건',body:'CTA 강도가 평소보다 높은 콘텐츠가 있습니다.',action:'검토하기'},
  {type:'주의',pri:'important',title:'인스타그램 운영량이 많아지고 있어요',body:'오늘은 발행을 줄이는 것을 추천합니다.',action:'오늘 쉬기'},
  {type:'추천',pri:'recommended',title:'블로그 운영이 부족해요',body:'신뢰 콘텐츠를 추가하면 브랜드 안정성이 높아집니다.',action:'신뢰 콘텐츠 작성'},
  {type:'참고',pri:'info',title:'링크드인 운영이 안정적입니다',body:'현재 리듬을 유지하세요.',action:''},
]
const PRI:Record<string,{cls:string,icon:string}> = { critical:{cls:'feed-item-critical',icon:'🚨'}, important:{cls:'feed-item-important',icon:'⚠️'}, recommended:{cls:'feed-item-recommended',icon:'💡'}, info:{cls:'feed-item-info',icon:'ℹ️'} }

export default function Home() {
  return (
    <div>
      {/* Warmth Greeting */}
      <div className="warmth-card" style={{marginBottom:20}}>
        <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>{getGreeting()}</div>
        <div style={{fontSize:13,color:'var(--muted)'}}>오늘 운영 상태를 확인하세요.</div>
      </div>

      {/* Status Summary */}
      <div className="grid-3" style={{marginBottom:16}}>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>오늘 상태</div>
          <div style={{fontSize:18,fontWeight:800,color:'var(--green)'}}>대체로 양호</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>승인 대기</div>
          <div style={{fontSize:24,fontWeight:800,color:'var(--yellow)',fontFamily:'var(--mono)'}}>2</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>이벤트</div>
          <div style={{fontSize:24,fontWeight:800,color:'var(--red)',fontFamily:'var(--mono)'}}>1</div>
        </div>
      </div>

      {/* Today Feed */}
      <div style={{marginBottom:8}}>
        <span style={{fontSize:13,fontWeight:700}}>오늘의 피드</span>
      </div>

      {FEED.map((f,i)=>{
        const p = PRI[f.pri]??PRI.info
        return <div key={i} className={`feed-item ${p.cls}`}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:5}}>
                <span style={{fontSize:14}}>{p.icon}</span>
                <span className={`status-badge ${f.pri==='critical'?'status-danger':f.pri==='important'?'status-warn':f.pri==='recommended'?'status-info':'status-safe'}`}>{f.type}</span>
              </div>
              <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>{f.title}</div>
              <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.5}}>{f.body}</div>
            </div>
            {f.action && <button className="btn btn-primary btn-sm" style={{whiteSpace:'nowrap',marginTop:4}}>{f.action}</button>}
          </div>
        </div>
      })}

      {/* Footer warmth */}
      <div style={{textAlign:'center',padding:'24px 0 8px',fontSize:12,color:'var(--muted)'}}>
        오늘도 좋은 운영 되세요 🙌
      </div>
    </div>
  )
}