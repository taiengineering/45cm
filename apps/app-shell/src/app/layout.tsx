import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '45cm Operations Console',
  description: '45cm Operational Runtime Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <nav className="sidebar">
            <div className="sidebar-logo">45cm</div>
            <span className="sidebar-badge">Operations Console</span>
            {[
              { href: '/dashboard', icon: '📊', label: 'Dashboard' },
              { href: '/drafts', icon: '📝', label: 'Drafts' },
              { href: '/queues', icon: '⚡', label: 'Queues' },
              { href: '/analytics', icon: '📈', label: 'Analytics' },
              { href: '/system', icon: '⚙️', label: 'System' },
            ].map(item => (
              <a key={item.href} href={item.href} className="nav-item">
                <span className="nav-icon">{item.icon}</span>{item.label}
              </a>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 11, color: 'var(--muted)', padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
              api.45cm.com
            </div>
          </nav>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
