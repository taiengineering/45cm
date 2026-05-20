'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const BRAND_MEM = [
  { type: '톤', value: 'professional, trustworthy', conf: 78 },
  { type: 'CTA', value: 'soft~advisory 선호', conf: 85 },
  { type: '콘텐츠', value: '신뢰 + 전문성 중심', conf: 72 },
  { type: '시각', value: 'clean, minimal B2B', conf: 65 },
]

const OP_PATTERNS = [
  { type: '승인 성향', value: 'Soft CTA 항상 승인', count: 12 },
  { type: '거절 성향', value: 'Hard CTA 자주 거절', count: 8 },
  { type: '선호 Surface', value: 'LinkedIn authority > Instagram', count: 15 },
]

const MemoryPage = () => (
  <Grid container spacing={6}>
    <Grid size={{ xs: 12 }}>
      <Typography variant='h4' sx={{ fontWeight: 700 }}>메모리</Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        브랜드와 운영자를 점점 이해해가는 적응형 기억
      </Typography>
    </Grid>

    {/* Status Cards */}
    {[{ l: 'Memory 신뢰도', v: '학습 중', c: 'warning' }, { l: 'AI 신뢰도', v: '72%', c: 'primary' }, { l: 'Workspace 성격', v: '신뢰 중심', c: 'info' }, { l: 'Brand 성숙도', v: '성장', c: 'success' }].map(s => (
      <Grid key={s.l} size={{ xs: 6, sm: 3 }}>
        <Card><CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>{s.l}</Typography>
          <Typography variant='h6' color={`${s.c}.main`} sx={{ fontWeight: 700, mt: 1 }}>{s.v}</Typography>
        </CardContent></Card>
      </Grid>
    ))}

    {/* Brand Memory */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: 700, mb: 3 }}>브랜드 기억</Typography>
          {BRAND_MEM.map((m, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant='body2'><Chip label={m.type} size='small' sx={{ mr: 1 }} />{m.value}</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>{m.conf}%</Typography>
              </Box>
              <LinearProgress variant='determinate' value={m.conf} color='primary' sx={{ height: 5, borderRadius: 3 }} />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>

    {/* Operator Patterns */}
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: 700, mb: 3 }}>운영자 패턴</Typography>
          {OP_PATTERNS.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography variant='caption' color='text.secondary'>{p.type}</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>{p.value}</Typography>
              </Box>
              <Chip label={`x${p.count}`} size='small' color='primary' variant='tonal' />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>

    <Grid size={{ xs: 12 }}>
      <Card sx={{ bgcolor: 'action.hover' }}>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Intelligence Memory는 운영 경험을 축적하여 브랜드와 운영자를 점점 이해합니다.
            추천이 개인화되고, 승인이 적응되고, 회복 전략이 학습됩니다.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

export default MemoryPage
