'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

const QUEUE = [
  { type: '승인', title: 'LinkedIn: TAI Safety Checker 소개', risk: '낮음', confidence: 82, reason: '정기 전문성 콘텐츠', color: 'info' as const },
  { type: '이벤트', title: '서비스 점검 긴급 공지', risk: '높음', confidence: 45, reason: '발행 리듬 변경이 필요합니다', color: 'error' as const },
  { type: '승인', title: '블로그 강한 CTA 콘텐츠', risk: '중간', confidence: 60, reason: 'CTA 강도가 평소보다 높습니다', color: 'warning' as const },
  { type: '회복', title: '인스타그램 쉬어가기 권장', risk: '낮음', confidence: 88, reason: '운영량이 많아져 피로해지고 있어요', color: 'success' as const },
]

export default function QueuePage() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>승인함</Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>검토가 필요한 항목들입니다. 왜 검토가 필요한지 함께 보여드립니다.</Typography>
      </Grid>
      {[{ l: '승인', c: 2, color: 'primary' }, { l: '이벤트', c: 1, color: 'error' }, { l: '회복', c: 1, color: 'success' }, { l: '전체', c: 4, color: 'secondary' }].map(s => (
        <Grid key={s.l} size={{ xs: 6, sm: 3 }}>
          <Card><CardContent sx={{ textAlign: 'center' }}>
            <Typography variant='h4' color={`${s.color}.main`} sx={{ fontWeight: 700 }}>{s.c}</Typography>
            <Typography variant='body2' color='text.secondary'>{s.l}</Typography>
          </CardContent></Card>
        </Grid>
      ))}
      {QUEUE.map((q, i) => (
        <Grid key={i} size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <Chip label={q.type} size='small' color={q.color} />
                  <Chip label={`위험: ${q.risk}`} size='small' variant='outlined' />
                  <Typography variant='caption' color='text.secondary'>AI {q.confidence}%</Typography>
                </Box>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 0.5 }}>{q.title}</Typography>
                <Typography variant='body2' color='text.secondary'>판단 근거: {q.reason}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                <Button variant='contained' size='small' color='success'>✅ 승인</Button>
                <Button variant='outlined' size='small'>❌ 거절</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
