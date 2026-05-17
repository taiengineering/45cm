"use client"
import { useState } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"

export default function CampaignsPage() {
  const [form, setForm] = useState({ name:'', goal:'', channel:'linkedin', cta:'무료 법령진단', brandVoice:'tai', frequency:'weekly', approvalRequired:true })
  const [saved, setSaved] = useState(false)

  const create = async () => {
    await fetch(API+'/workflows',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      workspaceId:'a0000000-0000-0000-0000-000000000001', name:form.name, triggerType:'schedule', template:'campaign',
      steps:[{type:'collect',config:{keyword:form.goal}},{type:'generate',config:{}},{type:'humanize',config:{brand_voice:form.brandVoice}},{type:'approval',config:{required:form.approvalRequired}},{type:'publish',config:{channel:form.channel}}]
    })})
    setSaved(true)
    setTimeout(()=>setSaved(false),3000)
  }

  return (
    <div>
      <h1 className="page-title">Campaign Studio</h1>
      <p className="page-sub">캔페인 전략을 설정하면 엔진이 운영을 증폭합니다</p>
      {saved && <div className="card" style={{borderColor:'var(--green)',background:'var(--green-soft)',marginBottom:16}}><span style={{color:'var(--green)',fontWeight:600}}>✅ 캔페인 생성 완료</span></div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-header"><span className="card-title">캔페인 기본 설정</span></div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>캔페인 이름</label>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="예: 중대재해 주간 콘텐츠" style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14,boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>운영 목표 / 핵심 키워드</label>
            <textarea value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})} placeholder="이번 캔페인의 방향을 입력하세요.예: 중대재해처벌법 과태료 이슈 중심, 50인 미만 사업장 타겟" rows={3} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:13,boxSizing:'border-box',resize:'vertical',fontFamily:'inherit'}} />
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>CTA</label>
            <input value={form.cta} onChange={e=>setForm({...form,cta:e.target.value})} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14,boxSizing:'border-box'}} />
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">채널 및 운영 전략</span></div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>발행 채널</label>
            <select value={form.channel} onChange={e=>setForm({...form,channel:e.target.value})} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14}}>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="naver_blog">Naver Blog</option>
              <option value="naver_kin">Naver 지식인</option>
            </select>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>Brand Voice</label>
            <select value={form.brandVoice} onChange={e=>setForm({...form,brandVoice:e.target.value})} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14}}>
              <option value="tai">TAI Engineering (전문가)</option>
              <option value="neutral">Neutral (중립)</option>
              <option value="professional">Professional (격식)</option>
            </select>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:4}}>발행 빈도</label>
            <select value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})} style={{width:'100%',padding:'8px 12px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14}}>
              <option value="daily">매일</option>
              <option value="weekly">주 1회</option>
              <option value="biweekly">주 2회</option>
            </select>
          </div>
          <label style={{fontSize:13,color:'var(--muted)',display:'flex',alignItems:'center',gap:6,marginBottom:14}}>
            <input type="checkbox" checked={form.approvalRequired} onChange={e=>setForm({...form,approvalRequired:e.target.checked})} /> 발행 전 승인 필수
          </label>
          <button className="btn" onClick={create} style={{background:'var(--accent)',color:'#fff',border:'none',width:'100%',justifyContent:'center'}}>캔페인 생성</button>
        </div>
      </div>
    </div>
  )
}