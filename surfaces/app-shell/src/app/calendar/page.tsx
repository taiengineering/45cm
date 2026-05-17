"use client"
import { useState, useEffect } from "react"
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.45cm.com"
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function CalendarPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { fetch(API+"/calendar").then(r=>r.json()).then(setItems).catch(()=>{}) }, [])

  const grouped: Record<string, any[]> = {}
  items.forEach(item => {
    const day = new Date(item.scheduled_at).toISOString().slice(0, 10)
    if (!grouped[day]) grouped[day] = []
    grouped[day].push(item)
  })

  const today = new Date()
  const weekDays = Array.from({length:7}, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - today.getDay() + 1 + i)
    return d.toISOString().slice(0, 10)
  })

  return (
    <div>
      <h1 className="page-title">Content Calendar</h1>
      <p className="page-sub">Scheduled publishes this week</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8}}>
        {weekDays.map((day, i) => {
          const isToday = day === today.toISOString().slice(0,10)
          const dayItems = grouped[day] || []
          return (
            <div key={day} className="card" style={{minHeight:120,...(isToday?{borderColor:'var(--accent)'}:{})}}>
              <div style={{fontSize:11,color:isToday?'var(--accent)':'var(--muted)',fontWeight:600,marginBottom:8}}>
                {DAYS[i]} {day.slice(5)}
              </div>
              {dayItems.map((item:any) => (
                <div key={item.id} style={{background:'var(--surface)',borderRadius:4,padding:'4px 8px',marginBottom:4,fontSize:11}}>
                  <span className={`badge ${item.status==='published'?'badge-approved':item.status==='scheduled'?'badge-humanized':'badge-draft'}`} style={{fontSize:9,padding:'1px 6px'}}>{item.status}</span>
                  <div style={{color:'var(--muted)',marginTop:2}}>{item.channel} · {new Date(item.scheduled_at).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})}</div>
                </div>
              ))}
              {dayItems.length===0 && <div style={{fontSize:11,color:'var(--border)',textAlign:'center',marginTop:20}}>—</div>}
            </div>
          )
        })}
      </div>
      {items.length === 0 && <div className="card empty" style={{marginTop:16}}>No scheduled publishes. Use /calendar/schedule API to add.</div>}
    </div>
  )
}
