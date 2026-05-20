'use client'

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import type { ReactNode } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7C6AF2' },
    secondary: { main: '#6D788D' },
    success: { main: '#72E128' },
    error: { main: '#FF4D49' },
    warning: { main: '#FDB528' },
    info: { main: '#26C6F9' },
    background: {
      default: '#25293C',
      paper: '#2F3349',
    },
    text: {
      primary: '#E7E3FC',
      secondary: '#9A95B1',
    },
    divider: 'rgba(231, 227, 252, 0.12)',
  },
  typography: {
    fontFamily: '"Pretendard", "Inter", -apple-system, sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
})

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
