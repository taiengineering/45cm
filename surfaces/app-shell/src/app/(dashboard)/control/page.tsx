'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

type Mode = 'auto' | 'assisted' | 'manual'

const CAPS = [
  { id: 'cadence', name: 'Cadence 유지', mode: 'auto' as Mode },
  { id: 'cta', name: 'CTA 제어', mode: 'assisted' as Mode },
  { id: 'publish', name: 'Publish', mode: 'assisted' as Mode },
  { id: 'event', name: '이벤트', mode: 'manual' as Mode },
  { id: 'recovery', name: '회복', mode: 'auto' as Mode },
]

const ControlPage = () => {
  const [global, setGlobal] = useState<Mode>('assisted')

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>운영 제어</Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          AI와 사람이 함께 운영하는 Co-Pilot — Auto / Assisted / Manual
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>글로벌 운영 모드</Typography>
            <ToggleButtonGroup value={global} exclusive onChange={(_, v) => v && setGlobal(v)} fullWidth>
              <ToggleButton value='auto' color='primary'>Auto (자동)</ToggleButton>
              <ToggleButton value='assisted' color='success'>Assisted (추천+승인)</ToggleButton>
              <ToggleButton value='manual' color='warning'>Manual (수동)</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>기능별 세부 설정</Typography>
            {CAPS.map(c => (
              <Box key={c.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>{c.name}</Typography>
                <Chip label={c.mode === 'auto' ? '자동' : c.mode === 'assisted' ? '추천+승인' : '수동'}
                  color={c.mode === 'auto' ? 'primary' : c.mode === 'assisted' ? 'success' : 'warning'}
                  variant='tonal' />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card sx={{ bgcolor: 'action.hover' }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 1 }}>AI 판단 설명</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ lineHeight: 2 }}>
              💡 Instagram은 최근 운영량이 많아져 cadence를 감소시켰습니다.<br />
              💡 LinkedIn은 전문성 운영이 안정적이므로 현재 cadence를 유지합니다.<br />
              💡 Blog Hard CTA는 신뢰 Surface에서 위험하므로 승인이 필요합니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ControlPage
