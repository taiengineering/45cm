'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const CHANNELS = [
  { ch: 'LinkedIn', status: '안정', score: 82, cadence: '주 2.5회', fatigue: '15%', color: 'success' as const },
  { ch: 'Naver Blog', status: '휴면', score: 25, cadence: '주 0회', fatigue: '5%', color: 'default' as const },
  { ch: 'Facebook', status: '회복 중', score: 48, cadence: '주 1회', fatigue: '30%', color: 'warning' as const },
]

const STAGES = ['채널 연결', '현황 분석', '운영 정보', '전략 설정', '정기 운영', '이벤트', '회복']

const RECS = [
  { ch: 'LinkedIn', text: '운영이 안정적입니다. 현재 리듬을 유지하세요.', sev: 'success' as const },
  { ch: 'Naver Blog', text: '30일 이상 업데이트되지 않았습니다. 주 1회 시작하세요.', sev: 'warning' as const },
  { ch: 'Facebook', text: '피로도가 높습니다. trust 콘텐츠를 늘려주세요.', sev: 'error' as const },
]

const LifecyclePage = () => (
  <Grid container spacing={6}>
    <Grid size={{ xs: 12 }}>
      <Typography variant='h4' sx={{ fontWeight: 700 }}>운영 흐름</Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        브랜드 운영 Lifecycle — 분석 → 세팅 → 정기운영 → 이벤트 → 회복
      </Typography>
    </Grid>

    {/* Stages */}
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2 }}>운영 단계</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {STAGES.map((s, i) => (
              <Chip key={s} label={s} color={i <= 1 ? 'primary' : 'default'} variant={i <= 1 ? 'filled' : 'outlined'} sx={{ flex: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Presence Health */}
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2 }}>Presence Health</Typography>
          {CHANNELS.map(ch => (
            <Box key={ch.ch} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>{ch.ch}</Typography>
                <Chip label={ch.status} size='small' color={ch.color} variant='tonal' sx={{ mt: 0.5 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Typography variant='body2' color='text.secondary'>{ch.cadence}</Typography>
                <Typography variant='body2' color='text.secondary'>Fatigue {ch.fatigue}</Typography>
                <Typography variant='h6' color={`${ch.color === 'default' ? 'text.secondary' : ch.color + '.main'}`} sx={{ fontWeight: 700, minWidth: 30 }}>{ch.score}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>

    {/* Recommendations */}
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2 }}>운영 추천</Typography>
          {RECS.map((r, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Chip label={r.ch} size='small' color={r.sev} variant='tonal' />
              <Typography variant='body2'>{r.text}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

export default LifecyclePage
