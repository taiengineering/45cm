'use client'

import Providers from '@/components/45cm/Providers'
import DashboardLayout from '@/components/45cm/DashboardLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  )
}
