'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const CHANNELS = [
  { ch: 'LinkedIn', status: '연결됨', auto: '자동', color: 'success' as const },
  { ch: 'Facebook', status: '연결 가능', auto: '자동', color: 'primary' as const },
  { ch: 'Naver Blog', status: '연결 가능', auto: '어시스트', color: 'primary' as const },
  { ch: 'Instagram', status: '준비 중', auto: '자동', color: 'default' as const },
  { ch: 'Kakao', status: '준비 중', auto: '어시스트', color: 'default' as const },
  { ch: 'YouTube', status: '준비 중', auto: '자동', color: 'default' as const },
]

const SettingsPage = () => (
  <Grid container spacing={6}>
    <Grid size={{ xs: 12 }}>
      <Typography variant='h4' sx={{ fontWeight: 700 }}>채널 연동</Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        18개 범용 채널 — Connect 버튼으로 연동하세요
      </Typography>
    </Grid>

    {CHANNELS.map(ch => (
      <Grid key={ch.ch} size={{ xs: 12, sm: 6, md: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>{ch.ch}</Typography>
              <Chip label={ch.status} size='small' color={ch.color} variant='tonal' />
            </Box>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              자동화: {ch.auto}
            </Typography>
            <Button variant={ch.color === 'success' ? 'outlined' : 'contained'} fullWidth size='small'>
              {ch.color === 'success' ? 'Reconnect' : 'Connect'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)

export default SettingsPage
