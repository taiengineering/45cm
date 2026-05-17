export default function DashboardPage() {
  return (
    <div style={{padding:24}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:16}}>45cm Operations Console</h1>
      <p style={{color:'var(--muted)'}}>Dashboard — coming soon</p>
      <nav style={{marginTop:24,display:'flex',gap:16}}>
        <a href="/drafts" style={{color:'var(--accent)'}}>Drafts</a>
        <a href="/queues" style={{color:'var(--accent)'}}>Queues</a>
        <a href="/analytics" style={{color:'var(--accent)'}}>Analytics</a>
        <a href="/system" style={{color:'var(--accent)'}}>System</a>
      </nav>
    </div>
  )
}
