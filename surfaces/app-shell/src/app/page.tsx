"use client"
import { useState } from "react"

const PRIORITY_STYLE:Record<string,{icon:string,color:string}> = { critical:{icon:'🚨',color:'var(--red)'}, important:{icon:'⚠️',color:'var(--yellow)'}, recommended:{icon:'💡',color:'var(--accent)'}, informational:{icon:'ℹ️',color:'var(--muted)'} }
const TYPE_LABEL:Record<string,string> = { risk:'위험', approval:'승인', operational:'운영', recovery:'회복', event:'이벤트', insight:'인사이트', summary:'요약' }

const FEED = [
  {type:'event',priority:'critical',title:'행사 1일 남음: TAI Safety Expo',body:'Event cadence 준비가 필요합니다.',ch:'',action:'이벤트 준비'},
  {type:'approval',priority:'important',title:'승인 대기 2건',body:'CTA 강도 4 콘텐츠 승인이 필요합니다.',ch:'',action:'승인 확인'},
  {type:'risk',priority:'important',title:'Instagram 피로도 증가',body:'Instagram 피로도가 55%입니다. 오늘은 발행을 줄이는 것을 추천합니다.',ch:'Instagram',action:'오늘 쉬기'},
  {type:'operational',priority:'recommended',title:'오늘 LinkedIn authority 콘텐츠가 비어있습니다',body:'LinkedIn에 전문성 콘텐츠를 추가하세요.',ch:'LinkedIn',action:'Studio 열기'},
  {type:'recovery',priority:'recommended',title:'Blog trust recovery 추천',body:'Naver Blog에 trust 콘텐츠를 추가하면 브랜드 신뢰도가 회복됩니다.',ch:'Naver Blog',action:'Trust 콘텐츠'},
  {type:'insight',priority:'informational',title:'LinkedIn consistency 양호',body:'현재 LinkedIn 운영 리듬이 안정적입니다. 유지하세요.',ch:'LinkedIn',action:''},
]

export default function HomePage() {
  const [feed] = useState(FEED)
  return (
    <div>
      <h1 className="page-title">Today</h1>
      <p className="page-sub">오늘의 운영 상태 + 해야 할 것 + 위험 + 승인</p>

      {/* Summary Card */}
      <div className="card" style={{marginBottom:16,background:'var(--surface)',borderLeft:'4px solid var(--green)'}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>오늘 상태: 대체로 양호</div>
        <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>
          주의: Instagram 피로도 증가<br/>
          추천: Blog trust 콘텐츠 추가
        </div>
      </div>

      {/* Feed */}
      {feed.map((f,i)=>{
        const p = PRIORITY_STYLE[f.priority]??PRIORITY_STYLE.informational
        return <div key={i} className="card" style={{marginBottom:8,borderLeft:`3px solid ${p.color}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4}}>
                <span>{p.icon}</span>
                <span style={{fontSize:9,padding:'1px 6px',borderRadius:3,background:'var(--surface)',color:p.color,fontWeight:600}}>{TYPE_LABEL[f.type]}</span>
                {f.ch&&<span style={{fontSize:9,color:'var(--muted)'}}>{f.ch}</span>}
              </div>
              <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{f.title}</div>
              <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.6}}>{f.body}</div>
            </div>
            {f.action&&<button style={{fontSize:10,padding:'6px 14px',borderRadius:6,background:f.priority==='critical'?'var(--red)':'var(--accent)',color:'#fff',border:'none',cursor:'pointer',whiteSpace:'nowrap',marginLeft:12}}>{f.action}</button>}
          </div>
        </div>
      })}
    </div>
  )
}