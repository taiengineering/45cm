'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const STAGES = ['채널 연결', '현황 분석', '운영 정보', '전략 설정', '정기 운영', '이벤트', '회복']
const CHANNELS = [
  { ch: 'LinkedIn', status: '안정', score: 82, cadence: '주 2.5회', fatigue: '15%', color: 'success' as const },
  { ch: 'Naver Blog', status: '휴면', score: 25, cadence: '주 0회', fatigue: '5%', color: 'default' as const },
  { ch: 'Facebook', status: '회복 중', score: 48, cadence: '주 1회', fatigue: '30%', color: 'warning' as const },
]

export default function LifecyclePage() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>운영 흐름</Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>브랜드 운영 Lifecycle</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card><CardContent>
          <Typography variant='h6' sx={{ mb: 2 }}>운영 단계</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {STAGES.map((s, i) => <Chip key={s} label={s} color={i <= 1 ? 'primary' : 'default'} variant={i <= 1 ? 'filled' : 'outlined'} />)}
          </Box>
        </CardContent></Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card><CardContent>
          <Typography variant='h6' sx={{ mb: 2 }}>Presence Health</Typography>
          {CHANNELS.map(ch => (
            <Box key={ch.ch} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>{ch.ch}</Typography>
                <Chip label={ch.status} size='small' color={ch.color} sx={{ mt: 0.5 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Typography variant='body2' color='text.secondary'>{ch.cadence}</Typography>
                <Typography variant='body2' color='text.secondary'>Fatigue {ch.fatigue}</Typography>
                <Typography variant='h6' sx={{ fontWeight: 700, minWidth: 30 }}>{ch.score}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent></Card>
      </Grid>
    </Grid>
  )
}
