'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const SURFACES = [
  { ch: 'LinkedIn', surface: 'Authority Feed', health: 78, fatigue: 15, trust: 82, status: '안정', color: 'success' as const },
  { ch: 'Naver Blog', surface: 'Trust Blog', health: 35, fatigue: 5, trust: 70, status: '휴면', color: 'default' as const },
  { ch: 'Instagram', surface: 'Social Feed', health: 55, fatigue: 40, trust: 50, status: '주의', color: 'warning' as const },
  { ch: 'YouTube Shorts', surface: 'Short Discovery', health: 45, fatigue: 55, trust: 40, status: '피로', color: 'error' as const },
  { ch: 'Kakao', surface: 'Direct Messaging', health: 60, fatigue: 10, trust: 65, status: '안정', color: 'success' as const },
]

export default function SurfacesPage() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>채널 상태</Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>채널별 브랜드 Surface 건강도를 확인하세요</Typography>
      </Grid>
      {SURFACES.map(s => (
        <Grid key={s.ch} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>{s.ch}</Typography>
                <Chip label={s.status} size='small' color={s.color} />
              </Box>
              <Typography variant='caption' color='text.secondary'>{s.surface}</Typography>
              {[{ l: '건강도', v: s.health, c: 'primary' }, { l: '신뢰', v: s.trust, c: 'success' }, { l: '피로', v: s.fatigue, c: 'error' }].map(m => (
                <Box key={m.l} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant='body2'>{m.l}</Typography>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>{m.v}%</Typography>
                  </Box>
                  <LinearProgress variant='determinate' value={m.v} color={m.c as any} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
