"use client"
import { useState } from "react"

const STATUS_STYLE:Record<string,{color:string,label:string}> = { new:{color:'var(--accent)',label:'New'}, active:{color:'var(--green)',label:'Active'}, stable:{color:'var(--green)',label:'Stable'}, fatigued:{color:'var(--red)',label:'Fatigued'}, archived:{color:'var(--muted)',label:'Archived'}, revivable:{color:'var(--yellow)',label:'Revivable'} }
const TYPES = ['hook','visual','cta','content','template','caption']
const TYPE_ICON:Record<string,string> = {hook:'🎣',visual:'🖼️',cta:'👉',content:'📝',template:'📄',caption:'💬'}

const ASSETS = [
  {id:'1',type:'hook',title:'산업재해 신고, 아직도 전화로 하세요?',score:85,reuse:8,status:'stable',ch:'Shorts'},
  {id:'2',type:'hook',title:'중대재해 예방, 3분이면 시작합니다',score:72,reuse:5,status:'active',ch:'LinkedIn'},
  {id:'3',type:'cta',title:'무료 진단 신청하기',score:68,reuse:12,status:'active',ch:'Blog'},
  {id:'4',type:'visual',title:'TAI 클린 카드 템플릿',score:77,reuse:6,status:'stable',ch:'Instagram'},
  {id:'5',type:'content',title:'산업안전 FAQ 시리즈',score:80,reuse:4,status:'active',ch:'Naver Blog'},
  {id:'6',type:'hook',title:'안전관리자가 꼭 알아야 할 3가지',score:45,reuse:2,status:'fatigued',ch:'Shorts'},
  {id:'7',type:'cta',title:'전문가 상담 예약',score:55,reuse:3,status:'revivable',ch:'LinkedIn'},
]

const PIPELINE = ['원본','추출','Hook','적응','CTA','미리보기','승인','발행','기억']

export default function AssetsPage() {
  const [filter,setFilter] = useState('all')
  const filtered = filter==='all' ? ASSETS : ASSETS.filter(a=>a.type===filter)
  return (
    <div>
      <h1 className="page-title">Brand Assets</h1>
      <p className="page-sub">브랜드 자산을 기억하고 재활용하고 진화시킵니다</p>

      {/* Pipeline */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-title" style={{marginBottom:8}}>Content Pipeline</div>
        <div style={{display:'flex',gap:2}}>
          {PIPELINE.map((s,i)=>(
            <div key={s} style={{flex:1,textAlign:'center',padding:'8px 4px',borderRadius:6,background:i<3?'var(--accent)':'var(--surface)',color:i<3?'#fff':'var(--muted)',fontSize:10,fontWeight:i<3?700:400}}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:4,marginBottom:12}}>
        <button onClick={()=>setFilter('all')} style={{fontSize:10,padding:'4px 10px',borderRadius:4,border:filter==='all'?'none':'1px solid var(--border)',background:filter==='all'?'var(--accent)':'transparent',color:filter==='all'?'#fff':'var(--muted)',cursor:'pointer'}}>전체 ({ASSETS.length})</button>
        {TYPES.map(t=>{
          const count = ASSETS.filter(a=>a.type===t).length
          return <button key={t} onClick={()=>setFilter(t)} style={{fontSize:10,padding:'4px 10px',borderRadius:4,border:filter===t?'none':'1px solid var(--border)',background:filter===t?'var(--accent)':'transparent',color:filter===t?'#fff':'var(--muted)',cursor:'pointer'}}>{TYPE_ICON[t]} {t} ({count})</button>
        })}
      </div>

      {/* Asset Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginBottom:16}}>
        {filtered.map(a=>{
          const st = STATUS_STYLE[a.status]
          return <div key={a.id} className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <span style={{fontSize:18}}>{TYPE_ICON[a.type]}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700}}>{a.title}</div>
                  <div style={{fontSize:9,color:'var(--muted)'}}>{a.ch}</div>
                </div>
              </div>
              <span style={{fontSize:9,padding:'2px 6px',borderRadius:3,color:st.color,fontWeight:600}}>{st.label}</span>
            </div>
            <div style={{display:'flex',gap:12,fontSize:10,color:'var(--muted)'}}>
              <span>Score: <strong style={{color:'var(--accent)'}}>{a.score}</strong></span>
              <span>Reuse: <strong>{a.reuse}</strong></span>
            </div>
            <div style={{height:3,borderRadius:2,background:'var(--surface)',marginTop:6,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${a.score}%`,borderRadius:2,background:st.color}} />
            </div>
          </div>
        })}
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="card-title" style={{marginBottom:8}}>자산 추천</div>
        <div style={{fontSize:11,color:'var(--muted)',lineHeight:2}}>
          <p>💡 "산업재해 신고" Hook이 Shorts에서 반응이 좋았습니다. 재활용을 추천합니다.</p>
          <p>⚠️ "안전관리자 3가지" Hook이 피로 상태입니다. 새 Hook을 준비하세요.</p>
          <p>🔄 "전문가 상담 예약" CTA가 재활용 가능합니다.</p>
        </div>
      </div>
    </div>
  )
}