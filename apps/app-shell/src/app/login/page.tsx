"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    if (!email) return
    setSent(true)
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'var(--bg)'}}>
      <div style={{width:380,padding:40,background:'var(--card)',border:'1px solid var(--border)',borderRadius:12}}>
        <div style={{fontSize:28,fontWeight:700,marginBottom:4,background:'linear-gradient(135deg,#636bff,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>45cm</div>
        <p style={{color:'var(--muted)',fontSize:14,marginBottom:28}}>Operations Console Login</p>
        {!sent ? (
          <>
            <label style={{fontSize:13,color:'var(--muted)',display:'block',marginBottom:6}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"
              style={{width:'100%',padding:'10px 14px',borderRadius:7,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--fg)',fontSize:14,outline:'none',marginBottom:16,boxSizing:'border-box'}} />
            <button onClick={handleLogin}
              style={{width:'100%',padding:'10px 0',borderRadius:7,border:'none',background:'var(--accent)',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer'}}>
              Send Magic Link
            </button>
          </>
        ) : (
          <div style={{textAlign:'center',padding:20}}>
            <div style={{fontSize:40,marginBottom:12}}>📧</div>
            <p style={{fontSize:15,fontWeight:600,marginBottom:4}}>Check your email</p>
            <p style={{fontSize:13,color:'var(--muted)'}}>We sent a login link to {email}</p>
          </div>
        )}
      </div>
    </div>
  )
}