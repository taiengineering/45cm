'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return '좋은 아침입니다 ☕'
  if (h < 18) return '오후도 파이팅 💪'
  return '수고하셨습니다 🌙'
}

const FEED = [
  { type: '이벤트', pri: 'error' as const, title: '행사 1일 남음: TAI Safety Expo', body: '이벤트 콘텐츠 준비가 필요합니다.', action: '준비하기' },
  { type: '승인', pri: 'warning' as const, title: '승인 대기 2건', body: 'CTA 강도가 평소보다 높은 콘텐츠가 있습니다.', action: '검토하기' },
  { type: '주의', pri: 'warning' as const, title: '인스타그램 운영량이 많아지고 있어요', body: '오늘은 발행을 줄이는 것을 추천합니다.', action: '오늘 쉬기' },
  { type: '추천', pri: 'info' as const, title: '블로그 운영이 부족해요', body: '신뢰 콘텐츠를 추가하면 브랜드 안정성이 높아집니다.', action: '신뢰 콘텐츠 작성' },
  { type: '참고', pri: 'success' as const, title: '링크드인 운영이 안정적입니다', body: '현재 리듬을 유지하세요.', action: '' },
]

export default function Home() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ background: 'linear-gradient(135deg, rgba(124,106,242,0.08), rgba(114,225,40,0.08))' }}>
          <CardContent>
            <Typography variant='h5' sx={{ mb: 1, fontWeight: 700 }}>{getGreeting()}</Typography>
            <Typography variant='body2' color='text.secondary'>오늘 운영 상태를 확인하세요.</Typography>
          </CardContent>
        </Card>
      </Grid>
      {[{ l: '오늘 상태', v: '대체로 양호', c: 'success' }, { l: '승인 대기', v: '2', c: 'warning' }, { l: '이벤트', v: '1', c: 'error' }].map(s => (
        <Grid key={s.l} size={{ xs: 12, sm: 4 }}>
          <Card><CardContent sx={{ textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>{s.l}</Typography>
            <Typography variant='h5' color={`${s.c}.main`} sx={{ fontWeight: 700 }}>{s.v}</Typography>
          </CardContent></Card>
        </Grid>
      ))}
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 700 }}>오늘의 피드</Typography>
        {FEED.map((f, i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Chip label={f.type} size='small' color={f.pri} sx={{ mb: 1 }} />
                <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 0.5 }}>{f.title}</Typography>
                <Typography variant='body2' color='text.secondary'>{f.body}</Typography>
              </Box>
              {f.action && <Button variant='contained' size='small' sx={{ whiteSpace: 'nowrap', mt: 0.5 }}>{f.action}</Button>}
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>오늘도 좋은 운영 되세요 🙌</Typography>
      </Grid>
    </Grid>
  )
}
