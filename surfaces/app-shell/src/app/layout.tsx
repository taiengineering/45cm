import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '45cm · 브랜드 운영 워크스페이스',
  description: 'AI Marketing Operations Engine',
  icons: [
    { url: 'https://vwlahtguyggrhvslabax.supabase.co/storage/v1/object/public/site-assets/tai-icon-48.png', sizes: '48x48', type: 'image/png' },
    { url: 'https://vwlahtguyggrhvslabax.supabase.co/storage/v1/object/public/site-assets/tai-icon-192.png', sizes: '192x192', type: 'image/png' },
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <link rel='preconnect' href='https://cdn.jsdelivr.net' />
        <link href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css' rel='stylesheet' />
      </head>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
