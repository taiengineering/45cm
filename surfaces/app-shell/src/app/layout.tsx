import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: '45cm Marketing Engine', description: 'AI Marketing Operations Engine' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <nav className="sidebar">
            <div className="sidebar-logo">45cm</div>
            <span className="sidebar-badge">Marketing Engine</span>
            {[
              { href:'/dashboard', icon:'📊', label:'Dashboard' },
              { href:'/campaigns', icon:'🎯', label:'Campaigns' },
              { href:'/drafts', icon:'📝', label:'Drafts' },
              { href:'/calendar', icon:'📅', label:'Calendar' },
              { href:'/brand', icon:'🎨', label:'Brand Studio' },
              { href:'/visual', icon:'🖼️', label:'Visual Studio' },
              { href:'/leads', icon:'📌', label:'Leads' },
              { href:'/engagement', icon:'💬', label:'Engagement' },
              { href:'/analytics', icon:'📈', label:'Analytics' },
              { href:'/settings', icon:'🔧', label:'Settings' },
            ].map(item => (
              <a key={item.href} href={item.href} className="nav-item">
                <span className="nav-icon">{item.icon}</span>{item.label}
              </a>
            ))}
            <div style={{ flex: 1 }} />
            <a href="/queues" className="nav-item" style={{fontSize:12,color:'var(--border)'}}>
              <span className="nav-icon">⚙️</span>System
            </a>
            <div style={{ fontSize: 11, color: 'var(--muted)', padding: '8px 14px', borderTop:'1px solid var(--border)',marginTop:4 }}>v0.7.0 · Marketing Engine</div>
          </nav>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}