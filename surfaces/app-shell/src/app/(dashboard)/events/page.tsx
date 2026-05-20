'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const EVENT_TYPES = ['신제품', '행사', '공지', '장애', '이슈', '채용', '바이럴', '시즌성']

const EVENTS = [
  { type: '공지', title: '서비스 점검 안내', priority: '높음', channels: 2, status: '완료', color: 'success' as const },
  { type: '신제품', title: 'TAI Safety Checker v2 출시', priority: '높음', channels: 3, status: '준비', color: 'warning' as const },
]

const EventsPage = () => (
  <Grid container spacing={6}>
    <Grid size={{ xs: 12 }}>
      <Typography variant='h4' sx={{ fontWeight: 700 }}>이벤트</Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        이벤트성 운영 — 긴급 공지, 신제품, 장애 대응
      </Typography>
    </Grid>

    {['준비', '진행', '완료'].map(s => (
      <Grid key={s} size={{ xs: 4 }}>
        <Card><CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>{EVENTS.filter(e => e.status === s).length}</Typography>
          <Typography variant='body2' color='text.secondary'>{s}</Typography>
        </CardContent></Card>
      </Grid>
    ))}

    {EVENTS.map((e, i) => (
      <Grid key={i} size={{ xs: 12 }}>
        <Card>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip label={e.type} size='small' color='primary' variant='tonal' />
                <Chip label={e.priority} size='small' color='warning' variant='outlined' />
              </Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>{e.title}</Typography>
              <Typography variant='body2' color='text.secondary'>{e.channels}채널 대상</Typography>
            </Box>
            <Chip label={e.status} color={e.color} />
          </CardContent>
        </Card>
      </Grid>
    ))}

    <Grid size={{ xs: 12 }}>
      <Card sx={{ bgcolor: 'action.hover' }}>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 1 }}>이벤트 유형</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {EVENT_TYPES.map(t => <Chip key={t} label={t} variant='outlined' />)}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

export default EventsPage
