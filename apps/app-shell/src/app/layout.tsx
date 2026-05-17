import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '45cm Operations Console',
  description: '45cm Operational Runtime Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin:0,fontFamily:"'DM Sans',system-ui,sans-serif",background:'#0f1117',color:'#e4e4e7',minHeight:'100vh',display:'flex'}}>
        <nav style={{width:200,borderRight:'1px solid #2a2d3a',padding:'20px 12px',display:'flex',flexDirection:'column',gap:4,position:'fixed',height:'100vh',background:'#0f1117'}}>
          <div style={{fontSize:20,fontWeight:700,padding:'8px 12px',marginBottom:12,letterSpacing:-0.5}}>45cm</div>
          {[
            {href:'/dashboard',icon:'📊',label:'Dashboard'},
            {href:'/drafts',icon:'📝',label:'Drafts'},
            {href:'/queues',icon:'⚡',label:'Queues'},
            {href:'/analytics',icon:'📈',label:'Analytics'},
            {href:'/system',icon:'⚙️',label:'System'},
          ].map(item => (
            <a key={item.href} href={item.href} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderRadius:6,textDecoration:'none',color:'#a1a1aa',fontSize:14,fontWeight:500}}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
        </nav>
        <main style={{marginLeft:200,flex:1,minHeight:'100vh'}}>{children}</main>
      </body>
    </html>
  )
}
