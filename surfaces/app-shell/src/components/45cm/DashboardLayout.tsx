'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

type NavItem = { label: string; href: string; icon?: string }
type NavGroup = { label: string; icon: string; items: NavItem[] }
type NavEntry = NavItem | NavGroup

const NAV: NavEntry[] = [
  { label: '홈', href: '/home', icon: '🏠' },
  {
    label: '운영', icon: '📡',
    items: [
      { label: '스튜디오', href: '/studio' },
      { label: '승인함', href: '/queue' },
      { label: '이벤트', href: '/events' },
      { label: '운영 제어', href: '/control' },
    ],
  },
  {
    label: '브랜드', icon: '🎨',
    items: [
      { label: '채널 상태', href: '/surfaces' },
      { label: '브랜드 자산', href: '/assets' },
      { label: '브랜드 패턴', href: '/patterns' },
      { label: '메모리', href: '/memory' },
    ],
  },
  {
    label: '분석', icon: '📊',
    items: [
      { label: '운영 흐름', href: '/lifecycle' },
      { label: '캔페인', href: '/campaigns' },
      { label: '애널리틱스', href: '/analytics' },
    ],
  },
  {
    label: '설정', icon: '⚙️',
    items: [
      { label: '채널 연동', href: '/settings' },
      { label: '시스템', href: '/system' },
    ],
  },
]

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry
}

function DropdownNav({ group }: { group: NavGroup }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const isActive = group.items.some(i => pathname === i.href)

  return (
    <>
      <Button
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{
          color: isActive ? 'primary.main' : 'text.secondary',
          fontSize: '0.85rem',
          px: 1.5,
          minWidth: 'auto',
          '&:hover': { color: 'text.primary', bgcolor: 'rgba(124, 106, 242, 0.08)' },
        }}
        startIcon={<span style={{ fontSize: 16 }}>{group.icon}</span>}
        endIcon={<span style={{ fontSize: 10 }}>▾</span>}
      >
        {group.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { mt: 1, minWidth: 160 } }}
      >
        {group.items.map(item => (
          <MenuItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={() => setAnchorEl(null)}
            selected={pathname === item.href}
            sx={{ fontSize: '0.85rem' }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position='sticky' elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 0.5 }}>
          {/* Logo */}
          <Typography
            component={Link}
            href='/home'
            variant='h6'
            sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none', mr: 3, letterSpacing: -0.5 }}
          >
            45cm
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}>
            {NAV.map((entry, i) =>
              isGroup(entry) ? (
                <DropdownNav key={i} group={entry} />
              ) : (
                <Button
                  key={entry.href}
                  component={Link}
                  href={entry.href}
                  sx={{
                    color: pathname === entry.href ? 'primary.main' : 'text.secondary',
                    fontSize: '0.85rem',
                    px: 1.5,
                    minWidth: 'auto',
                    '&:hover': { color: 'text.primary', bgcolor: 'rgba(124, 106, 242, 0.08)' },
                  }}
                  startIcon={entry.icon ? <span style={{ fontSize: 16 }}>{entry.icon}</span> : undefined}
                >
                  {entry.label}
                </Button>
              )
            )}
          </Box>

          {/* Right side */}
          <Typography variant='caption' sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
            v0.8
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box component='main' sx={{ flex: 1, p: 3, maxWidth: 1440, width: '100%', mx: 'auto' }}>
        {children}
      </Box>

      {/* Footer */}
      <Box sx={{ py: 2, px: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant='caption' color='text.secondary'>
          45cm Marketing Engine · TAI Engineering
        </Typography>
      </Box>
    </Box>
  )
}
