import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: '45cm', description: '브랜드 운영 워크스페이스' }
const ICON = 'https://vwlahtguyggrhvslabax.supabase.co/storage/v1/object/public/site-assets'

const NAV = [
  {href:'/',label:'🏠 홈'},
  {href:'/studio',label:'✏️ 스튜디오'},
  {href:'/queue',label:'📥 승인함'},
  {href:'/surfaces',label:'📡 채널상태'},
  {href:'/lifecycle',label:'🔄 운영흐름'},
  {href:'/events',label:'⚡ 이벤트'},
  {href:'/patterns',label:'🧩 패턴'},
  {href:'/assets',label:'📦 자산'},
  {href:'/memory',label:'💾 메모리'},
  {href:'/control',label:'🎮 제어'},
  {href:'/settings',label:'⚙️ 설정'},
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/png" sizes="48x48" href={`${ICON}/tai-icon-48.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${ICON}/tai-icon-192.png`} />
        <link rel="apple-touch-icon" href={`${ICON}/tai-icon-192.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="app-layout">
          <nav className="top-nav">
            <a href="/" className="nav-brand">45cm</a>
            <div className="nav-links">
              {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
            </div>
            <span className="nav-sys">v0.8</span>
          </nav>
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  )
}