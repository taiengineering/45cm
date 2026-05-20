// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@components/NotFound'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export const metadata: Metadata = {
  title: '45cm · 브랜드 운영 워크스페이스',
  description: 'AI Marketing Operations Engine'
}

const Layout = async ({ children }: Props) => {
  const direction = 'ltr'
  const systemMode = await getSystemMode()

  return (
    <html lang='ko' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction={direction}>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default Layout
