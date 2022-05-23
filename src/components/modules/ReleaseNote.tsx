import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Content = {
  date: string
  description: string
  version: string
}

const releases: Array<Content> = [
  {
    date: '2022/05/10',
    description: '画像を格子状に並べて印刷する Collage Printer をリリースしました',
    version: '0.1.0',
  },
  {
    date: '2022/05/23',
    description:
      '画像をタップすることで表示される削除ボタンで、画像を1枚だけ削除することができるようになりました。',
    version: '0.1.1',
  },
]

const ReleaseNote = () => {
  return (
    <Box width="100%" maxWidth="md" px={2}>
      <Box pb={1}>
        <Typography variant="h5" textAlign="center">
          What's New
        </Typography>
      </Box>
      <Stack spacing={1} height="10rem" overflow="auto">
        {releases.map((release) => (
          <Stack key={release.version} direction="row" spacing={1}>
            <Typography>{release.date}</Typography>
            <Typography>{release.description}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default ReleaseNote
