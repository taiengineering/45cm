'use client'

import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const SCENES = [
  { n: 'Hook', s: 3, icon: '🎬' },
  { n: '문제제기', s: 8, icon: '❓' },
  { n: '가치전달', s: 12, icon: '✅' },
  { n: 'CTA', s: 7, icon: '👉' },
]

const StudioPage = () => {
  const [tab, setTab] = useState(0)

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>스튜디오</Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          콘텐츠를 만들고, 쇼츠를 제작하고, 채널별로 미리보세요
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4 }}>
          <Tab label='📝 콘텐츠 작성' />
          <Tab label='🎬 쇼츠 제작' />
          <Tab label='👁️ 채널별 미리보기' />
        </Tabs>
      </Grid>

      {/* Content Studio */}
      {tab === 0 && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' sx={{ mb: 3 }}>콘텐츠 작성</Typography>
              <TextField
                multiline
                rows={6}
                fullWidth
                placeholder='원본 아이디어를 입력하세요... 제품 정보, 메모, 공지, 아이디어 다 됩니다'
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant='contained'>AI로 작성하기</Button>
                <Button variant='outlined'>채널에 맞게 적응</Button>
                <Button variant='outlined'>브랜드 검사</Button>
                <Button variant='outlined'>피로도 검사</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Shorts Studio */}
      {tab === 1 && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' sx={{ mb: 1 }}>🎬 쇼츠 제작</Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                전문 영상 툴이 아님니다. 운영자가 쉽게 쇼츠를 만들 수 있어요.
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {SCENES.map((s, i) => (
                  <Grid key={s.n} size={{ xs: 3 }}>
                    <Card variant={i === 0 ? 'outlined' : undefined} sx={{ textAlign: 'center', p: 2, bgcolor: i === 0 ? 'primary.main' : 'action.hover', color: i === 0 ? 'primary.contrastText' : 'text.primary' }}>
                      <Typography variant='h5'>{s.icon}</Typography>
                      <Typography variant='body2' sx={{ fontWeight: i === 0 ? 700 : 400 }}>{s.n}</Typography>
                      <Typography variant='caption'>{s.s}초</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <TextField
                fullWidth
                label='3초 Hook (첫 문장)'
                defaultValue='산업재해 신고, 아직도 전화로 하세요?'
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained'>Hook AI 생성</Button>
                <Button variant='outlined'>CTA 검사</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Multi-Surface Preview */}
      {tab === 2 && (
        <>
          {[
            { ch: '인스타그램', txt: '[시각 Hook] 산업안전 무료진단 → Soft CTA' },
            { ch: '링크드인', txt: '전문성 중심 B2B 톤으로 적응' },
            { ch: '블로그', txt: '신뢰 확보를 위해 상세하게 설명' },
            { ch: '쇼츠', txt: '🎬 3초 Hook: "아직도 전화로?"' },
          ].map(p => (
            <Grid key={p.ch} size={{ xs: 12, sm: 6 }}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography variant='subtitle2' sx={{ fontWeight: 700, mb: 1 }}>{p.ch} 버전</Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ minHeight: 40 }}>{p.txt}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}

export default StudioPage
