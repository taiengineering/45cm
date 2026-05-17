"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function EngagementPage() {
  const [engagements, setEngagements] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  useEffect(() => {
    fetch(API+'/engagement').then(r=>r.json()).then(setEngagements).catch(()=>{})
    fetch(API+'/comments').then(r=>r.json()).then(setComments).catch(()=>{})
  }, [])

  return (
    <div>
      <h1 className="page-title">Engagement Console</h1>
      <p className="page-sub">반응 추적 및 댓글 운영 — 초안만 생성, 자동 댓글 금지</p>
      <div className="grid-3">
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--accent)'}}>{engagements.length}</div>
          <div className="stat-label">추적된 반응</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--green)'}}>{comments.filter((c:any)=>c.status==='approved').length}</div>
          <div className="stat-label">승인된 댓글</div>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div className="stat-value" style={{color:'var(--yellow)'}}>{comments.filter((c:any)=>c.status==='draft').length}</div>
          <div className="stat-label">댓글 초안</div>
        </div>
      </div>
      {engagements.length > 0 && (
        <div className="card" style={{marginBottom:16}}>
          <div className="card-header"><span className="card-title">최근 반응</span></div>
          {engagements.map((e:any) => (
            <div key={e.id} className="event-row">
              <span style={{fontWeight:600}}>{e.channel}</span>
              <span style={{fontSize:12,color:'var(--muted)'}}>Likes: {e.likes} · Comments: {e.comments} · Shares: {e.shares}</span>
              <span style={{fontSize:12,color:'var(--accent)',fontFamily:'var(--mono)'}}>Score: {e.engagement_score}</span>
            </div>
          ))}
        </div>
      )}
      {engagements.length === 0 && <div className="card empty" style={{marginBottom:16}}>반응 데이터가 아직 없습니다. 채널 발행 후 추적됩니다.</div>}
      <div className="card">
        <div className="card-header"><span className="card-title">댓글 초안</span></div>
        {comments.length === 0 ? <div className="empty">아직 댓글 초안이 없습니다</div> : comments.map((c:any) => (
          <div key={c.id} className="draft-card" style={{marginBottom:8}}>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>원본: {c.original_comment?.slice(0,100)}</div>
            <div style={{fontSize:13,lineHeight:1.6}}>{c.reply_draft}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{c.channel} · <span className={`badge ${c.status==='approved'?'badge-approved':'badge-draft'}`}>{c.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}