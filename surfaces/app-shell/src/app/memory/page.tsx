"use client"
import { useState } from "react"

type NoteCategory = 'campaign'|'brand'|'cta'|'channel'|'publish'|'general'
const CATEGORIES: {id:NoteCategory,label:string,icon:string}[] = [
  {id:'campaign',label:'Campaign',icon:'🎯'},
  {id:'brand',label:'Brand',icon:'🎨'},
  {id:'cta',label:'CTA',icon:'📌'},
  {id:'channel',label:'Channel',icon:'📡'},
  {id:'publish',label:'Publish',icon:'🚀'},
  {id:'general',label:'General',icon:'📝'},
]

// Sample timeline data (would come from API in production)
const TIMELINE = [
  {date:'2026-05-17',category:'campaign' as NoteCategory,title:'LinkedIn 발행 빈도 감소',body:'콘텐츠 피로도 감지로 주 5회 → 3회로 조정. 반응률 회복 기대.',type:'decision'},
  {date:'2026-05-15',category:'brand' as NoteCategory,title:'Anti-AI 강도 상향',body:'Humanize 규칙 6개 추가. GPT 특유 마무리 제거 규칙 강화.',type:'change'},
  {date:'2026-05-14',category:'cta' as NoteCategory,title:'Soft CTA 전략 유지',body:'LinkedIn에서 Hard CTA 전환률이 높지만, 브랜드 일관성을 위해 당분간 Soft CTA 유지 결정.',type:'decision'},
  {date:'2026-05-12',category:'channel' as NoteCategory,title:'Facebook 반응 분석',body:'장문 콘텐츠 반응 낮음. 짧은 인사이트 중심으로 전환 검토.',type:'insight'},
  {date:'2026-05-10',category:'campaign' as NoteCategory,title:'중대재해 캔페인 시작',body:'목표: 중대재해처벌법 인지도 향상 + 무료진단 전환. LinkedIn 중심 운영.',type:'start'},
  {date:'2026-05-08',category:'brand' as NoteCategory,title:'채널별 Brand Voice 분리',body:'LinkedIn=전문성, Facebook=친근함, Naver Blog=정보형 설정 완료.',type:'change'},
  {date:'2026-05-05',category:'general' as NoteCategory,title:'45cm Marketing Engine 초기 세팅',body:'TAI Engineering 브랜드로 시작. 안전관리 실무 톤 설정.',type:'start'},
]

const RECOMMENDATIONS = [
  {title:'LinkedIn 발행 간격 증가',type:'suggestion',accepted:true,outcome:'반응률 12% 회복',comment:'적절한 타이밍이었음'},
  {title:'CTA 강도 증가 검토',type:'suggestion',accepted:false,outcome:null,comment:'브랜드 일관성 우선으로 거절'},
  {title:'FAQ형 콘텐츠 확대',type:'opportunity',accepted:true,outcome:'지식인 반응 28% 상승',comment:'효과적'},
]

const TYPE_ICON:Record<string,string> = {decision:'✅',change:'🔄',insight:'💡',start:'🌟'}

export default function StrategyMemoryPage() {
  const [filter, setFilter] = useState<NoteCategory|'all'>('all')
  const [tab, setTab] = useState<'timeline'|'recommendations'|'snapshots'>('timeline')
  const [newNote, setNewNote] = useState({category:'general' as NoteCategory,title:'',body:''})
  const [noteSaved, setNoteSaved] = useState(false)

  const filtered = filter==='all' ? TIMELINE : TIMELINE.filter(t=>t.category===filter)

  const saveNote = () => {
    if(!newNote.title) return
    TIMELINE.unshift({date:new Date().toISOString().slice(0,10),category:newNote.category,title:newNote.title,body:newNote.body,type:'decision'})
    setNewNote({category:'general',title:'',body:''})
    setNoteSaved(true)
    setTimeout(()=>setNoteSaved(false),2000)
  }

  return (
    <div>
      <h1 className="page-title">Strategy Memory</h1>
      <p className="page-sub">운영 전략 기록실 — 전략을 축적하고, 다음 판단을 더 쉽게</p>

      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {(['timeline','recommendations','snapshots'] as const).map(t => (
          <button key={t} className="btn" onClick={()=>setTab(t)} style={tab===t?{background:'var(--accent)',color:'#fff',border:'none',fontSize:12}:{fontSize:12}}>
            {t==='timeline'?'📅 Timeline':t==='recommendations'?'📊 Outcomes':'📸 Snapshots'}
          </button>
        ))}
      </div>

      {tab==='timeline' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16}}>
          <div>
            {/* Category filter */}
            <div style={{display:'flex',gap:4,marginBottom:16,flexWrap:'wrap'}}>
              <button className="btn" onClick={()=>setFilter('all')} style={filter==='all'?{background:'var(--accent)',color:'#fff',border:'none',fontSize:11}:{fontSize:11}}>전체</button>
              {CATEGORIES.map(c => (
                <button key={c.id} className="btn" onClick={()=>setFilter(c.id)} style={filter===c.id?{background:'var(--accent)',color:'#fff',border:'none',fontSize:11}:{fontSize:11}}>{c.icon} {c.label}</button>
              ))}
            </div>

            {/* Timeline */}
            <div style={{position:'relative',paddingLeft:24}}>
              <div style={{position:'absolute',left:7,top:0,bottom:0,width:2,background:'var(--border)'}} />
              {filtered.map((item,i) => (
                <div key={i} style={{position:'relative',marginBottom:20}}>
                  <div style={{position:'absolute',left:-20,top:4,width:12,height:12,borderRadius:'50%',background:'var(--card)',border:'2px solid var(--accent)',zIndex:1}} />
                  <div className="card" style={{marginLeft:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <span style={{fontSize:14}}>{TYPE_ICON[item.type]||'📝'}</span>
                        <span style={{fontSize:14,fontWeight:600}}>{item.title}</span>
                      </div>
                      <span style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{item.date}</span>
                    </div>
                    <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.7,margin:0}}>{item.body}</p>
                    <div style={{marginTop:6}}>
                      <span style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:'var(--surface)',color:'var(--accent)'}}>{CATEGORIES.find(c=>c.id===item.category)?.icon} {item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add note */}
          <div>
            <div className="card" style={{marginBottom:12}}>
              <div className="card-title" style={{marginBottom:10}}>전략 노트 추가</div>
              {noteSaved && <div style={{color:'var(--green)',fontSize:12,fontWeight:600,marginBottom:8}}>✅ 저장됨</div>}
              <select value={newNote.category} onChange={e=>setNewNote({...newNote,category:e.target.value as NoteCategory})} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12,marginBottom:8}}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
              <input value={newNote.title} onChange={e=>setNewNote({...newNote,title:e.target.value})} placeholder="제목 (예: LinkedIn 빈도 감소 결정)" style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12,marginBottom:8,boxSizing:'border-box'}} />
              <textarea value={newNote.body} onChange={e=>setNewNote({...newNote,body:e.target.value})} placeholder="이유와 맥락을 기록하세요" rows={3} style={{width:'100%',padding:'6px 10px',borderRadius:6,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:12,resize:'vertical',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
              <button className="btn" onClick={saveNote} style={{width:'100%',justifyContent:'center',fontSize:12}}>노트 저장</button>
            </div>
            <div className="card">
              <div className="card-title" style={{marginBottom:8}}>핵심 원칙</div>
              <p style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>엔진은 전략을 대신 결정하지 않습니다.<br/><br/>운영자의 전략과 판단을 축적하여,<br/>다음 판단을 더 쉽게 만들어줍니다.</p>
            </div>
          </div>
        </div>
      )}

      {tab==='recommendations' && (
        <div>
          <div className="card-title" style={{marginBottom:12}}>추천 결과 추적</div>
          {RECOMMENDATIONS.map((r,i) => (
            <div key={i} className="card" style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <span style={{fontSize:14,fontWeight:600}}>{r.title}</span>
                <span className={`badge ${r.accepted?'badge-approved':'badge-rejected'}`}>{r.accepted?'수용':'거절'}</span>
              </div>
              {r.outcome && <div style={{fontSize:12,color:'var(--green)',marginBottom:4}}>결과: {r.outcome}</div>}
              {r.comment && <div style={{fontSize:12,color:'var(--muted)'}}>메모: {r.comment}</div>}
            </div>
          ))}
        </div>
      )}

      {tab==='snapshots' && (
        <div>
          <div className="card-title" style={{marginBottom:12}}>전략 스냅샷</div>
          {[
            {label:'2026-05 초기 셋업',date:'2026-05-05',brand:'TAI Professional',cta:'Soft',rhythm:'주 3회',channels:'LinkedIn 중심'},
            {label:'2026-05 피로도 조정 후',date:'2026-05-17',brand:'TAI Professional + Anti-AI 강화',cta:'Soft 유지',rhythm:'주 2회',channels:'LinkedIn + Naver Blog 병행'},
          ].map((s,i) => (
            <div key={i} className="card" style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:14,fontWeight:600}}>📸 {s.label}</span>
                <span style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--mono)'}}>{s.date}</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {[{l:'Brand',v:s.brand},{l:'CTA',v:s.cta},{l:'Rhythm',v:s.rhythm},{l:'Channels',v:s.channels}].map(m => (
                  <div key={m.l} style={{fontSize:11}}><span style={{color:'var(--muted)'}}>{m.l}:</span> <span style={{fontWeight:600}}>{m.v}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}