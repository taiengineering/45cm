import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: '45cm Operations Console', description: '45cm Operational Runtime Platform' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <nav className="sidebar">
            <div className="sidebar-logo">45cm</div>
            <span className="sidebar-badge">Operations Console</span>
            {[
              { href:'/dashboard', icon:'📊', label:'Dashboard' },
              { href:'/drafts', icon:'📝', label:'Drafts' },
              { href:'/workflows', icon:'🔄', label:'Workflows' },
              { href:'/queues', icon:'⚡', label:'Queues' },
              { href:'/analytics', icon:'📈', label:'Analytics' },
              { href:'/alerts', icon:'🔔', label:'Alerts' },
              { href:'/system', icon:'⚙️', label:'System' },
              { href:'/settings', icon:'🔧', label:'Settings' },
            ].map(item => (
              <a key={item.href} href={item.href} className="nav-item">
                <span className="nav-icon">{item.icon}</span>{item.label}
              </a>
            ))}
            <div style={{ flex: 1 }} />
            <a href="/login" className="nav-item" style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
              <span className="nav-icon">🔑</span>Login
            </a>
            <div style={{ fontSize: 11, color: 'var(--muted)', padding: '8px 14px' }}>api.45cm.com · v0.6.0</div>
          </nav>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
