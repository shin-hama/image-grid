import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useReactToPrint } from 'react-to-print'

import styles from './page.module.scss'
import GridEditorHeader from './GridEditorHeader'
import GridEditorMenu from './GridEditorMenu'
import ImageCell from './ImageCell'
import { useImages } from 'contexts/ImagesProvider'

const MAG_KEY = 'sizeMag'

const Sheet = styled('section')(
  ({ ratio }: { ratio: number }) => `
  display: block;
  width: ${210 * ratio}mm;
  /* 1mm余裕をもたせる */
  height: ${296 * ratio}mm;
  max-width: 210mm;
  max-height: 296mm;
  aspect-ratio: 21 / 29.6;
  page-break-after: always;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  background: transparent;

  /* プレビュー用のスタイル */
  @media screen {
    width: calc(100 / 24 * 21vw);
    height: calc(100 / 24 * 29.6vw);
    /* 背景を白く */
    background: white;
    /* ドロップシャドウ */
    box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
    margin-bottom: 16px;
  }
`
)

const sliceArray = <T extends unknown>(arr: Array<T>, length: number): Array<Array<T>> => {
  const result = []
  let index = 0
  while (index < arr.length) {
    result.push(arr.slice(index, index + length))
    index += length
  }

  return result
}

export type Matrix = {
  col: number
  row: number
}

const GridEditor = () => {
  const ref = React.useRef(null)
  const [matrix, setMatrix] = React.useState<Matrix>({ col: 2, row: 2 })
  const [mag, setMag] = React.useState(100)
  const { images } = useImages()

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  const handleEditMatrix = React.useCallback((newMatrix: Matrix) => {
    setMatrix(newMatrix)
  }, [])

  const handleEditMag = React.useCallback((value: number) => {
    setMag(value)
    localStorage.setItem(MAG_KEY, value.toString())
  }, [])

  React.useEffect(() => {
    setMag(Number.parseInt(localStorage.getItem(MAG_KEY) || '100'))
  }, [])

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={1} py={2}>
        <Grid item xs={12} className={styles.no_print}>
          <GridEditorHeader
            matrix={matrix}
            onChangeMatrix={handleEditMatrix}
            ratio={mag}
            onChangeRatio={handleEditMag}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack ref={ref} alignItems="center" className={styles.container}>
            {sliceArray(images, matrix.col * matrix.row).map((sliced, i) => (
              <Sheet key={`page-${i}`} ratio={mag / 100}>
                <Grid container sx={{ height: '100%', width: '100%' }}>
                  {sliced.map((image, i) => (
                    <Grid
                      key={`${i % matrix.col}-${Math.floor(i / matrix.row)}`}
                      item
                      xs={12 / matrix.col}
                      sx={{ height: `${Math.floor(100 / matrix.row)}%`, mx: 'auto', p: 1 }}
                    >
                      <ImageCell image={image} />
                    </Grid>
                  ))}
                </Grid>
              </Sheet>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <Box className={styles.no_print}>
        <GridEditorMenu onPrint={handlePrint} />
      </Box>
    </>
  )
}

export default GridEditor
