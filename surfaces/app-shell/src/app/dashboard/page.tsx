"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [drafts, setDrafts] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetch(API+'/analytics/summary').then(r=>r.json()).then(setSummary).catch(()=>{})
    fetch(API+'/campaigns').then(r=>r.json()).then(d=>Array.isArray(d)?setCampaigns(d):null).catch(()=>{})
    fetch(API+'/drafts?limit=5').then(r=>r.json()).then(d=>Array.isArray(d)?setDrafts(d):null).catch(()=>{})
    fetch(API+'/analytics/events?limit=10').then(r=>r.json()).then(d=>Array.isArray(d)?setEvents(d):null).catch(()=>{})
  }, [])

  const pendingApproval = drafts.filter(d=>d.status==='pending_approval').length
  const todayPublished = drafts.filter(d=>d.status==='published').length
  const failed = drafts.filter(d=>d.status==='failed').length
  const ctaClicks = events.filter(e=>e.event_type==='cta.clicked').length

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">오늘의 마케팅 운영 현황</p>

      {/* Today's Actions */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10,marginBottom:20}}>
        <div className="card" style={{textAlign:'center',borderColor:pendingApproval>0?'var(--yellow)':'var(--border)'}}>
          <div style={{fontSize:28,fontWeight:700,color:pendingApproval>0?'var(--yellow)':'var(--muted)',fontFamily:'var(--mono)'}}>{pendingApproval}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>승인 대기</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:28,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{todayPublished}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>발행 완료</div>
        </div>
        <div className="card" style={{textAlign:'center',borderColor:failed>0?'var(--red)':'var(--border)'}}>
          <div style={{fontSize:28,fontWeight:700,color:failed>0?'var(--red)':'var(--muted)',fontFamily:'var(--mono)'}}>{failed}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>발행 실패</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:28,fontWeight:700,color:'var(--accent)',fontFamily:'var(--mono)'}}>{ctaClicks}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>CTA 클릭</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:28,fontWeight:700,color:'var(--green)',fontFamily:'var(--mono)'}}>{summary?.leads??0}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>신규 리드</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
        {/* Active Campaigns */}
        <div className="card">
          <div className="card-header"><span className="card-title">활성 캔페인 ({campaigns.filter(c=>c.status==='active').length})</span></div>
          {campaigns.filter(c=>c.status==='active').length===0 && <div className="empty">활성 캔페인이 없습니다. <a href="/campaigns" style={{color:'var(--accent)'}}>Campaign 생성</a></div>}
          {campaigns.filter(c=>c.status==='active').map(c => (
            <div key={c.id} style={{padding:'10px 0',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600}}>{c.name}</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>{c.channel} · {c.brand_preset} · {c.publish_frequency}</div>
              </div>
              <span style={{fontSize:10,padding:'2px 8px',borderRadius:4,background:'var(--green-soft)',color:'var(--green)',fontWeight:600}}>Active</span>
            </div>
          ))}
        </div>

        {/* Recent Drafts */}
        <div className="card">
          <div className="card-header"><span className="card-title">최근 Draft ({drafts.length})</span></div>
          {drafts.length===0 && <div className="empty">아직 Draft가 없습니다</div>}
          {drafts.map(d => (
            <a key={d.id} href={`/drafts/detail/?id=${d.id}`} style={{display:'block',padding:'8px 0',borderBottom:'1px solid var(--border)',textDecoration:'none',color:'var(--fg)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:13,maxWidth:'70%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(d.humanized_body||d.body||'').slice(0,60)}</span>
                <span className={`badge badge-${d.status==='approved'?'approved':d.status==='pending_approval'?'pending':d.status==='published'?'approved':d.status==='failed'?'failed':'draft'}`} style={{fontSize:10}}>{d.status}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{marginBottom:16}}>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--fg)'}}>{summary?.drafts??'—'}</div>
          <div className="stat-label">전체 Draft</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--accent)'}}>{summary?.published??'—'}</div>
          <div className="stat-label">전체 발행</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--green)'}}>{summary?.cta_clicks??'—'}</div>
          <div className="stat-label">전체 CTA</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--yellow)'}}>${summary?.ai_cost_usd??'—'}</div>
          <div className="stat-label">AI 비용</div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="card">
        <div className="card-header"><span className="card-title">최근 이벤트</span></div>
        {events.length===0 && <div className="empty">아직 이벤트가 없습니다</div>}
        {events.slice(0,8).map((e:any,i:number) => (
          <div key={e.id||i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
            <span style={{fontWeight:600}}>{e.event_type}</span>
            <span style={{color:'var(--muted)',fontFamily:'var(--mono)'}}>{new Date(e.created_at).toLocaleString('ko-KR')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}