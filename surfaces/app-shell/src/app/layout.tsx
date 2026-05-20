// Next Imports
import type { Metadata } from 'next'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@core/styles/index.css'

export const metadata: Metadata = {
  title: '45cm · 브랜드 운영 워크스페이스',
  description: 'AI Marketing Operations Engine',
  icons: [
    { url: 'https://vwlahtguyggrhvslabax.supabase.co/storage/v1/object/public/site-assets/tai-icon-48.png', sizes: '48x48', type: 'image/png' },
    { url: 'https://vwlahtguyggrhvslabax.supabase.co/storage/v1/object/public/site-assets/tai-icon-192.png', sizes: '192x192', type: 'image/png' },
  ]
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko' dir='ltr'>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
