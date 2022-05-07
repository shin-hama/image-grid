import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useReactToPrint } from 'react-to-print'

import styles from './page.module.scss'
import GridEditorHeader from './GridEditorHeader'
import GridEditorMenu from './GridEditorMenu'

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
type Props = {
  contents?: Array<React.ReactNode>
}
const GridEditor: React.FC<Props> = ({ contents }) => {
  const ref = React.useRef(null)
  const [matrix, setMatrix] = React.useState<Matrix>({ col: 2, row: 2 })
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  const handleEditMatrix = React.useCallback((newMatrix: Matrix) => {
    setMatrix(newMatrix)
  }, [])

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
        <Grid item xs={12} className={styles.no_print}>
          <GridEditorHeader
            matrix={matrix}
            onChangeMatrix={handleEditMatrix}
            onPrint={handlePrint}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack ref={ref} alignItems="center" className={styles.container}>
            {contents &&
              sliceArray(contents, matrix.col * matrix.row).map((sliced) => (
                <Box component="section" className={styles.sheet}>
                  <Grid container sx={{ height: '100%', width: '100%' }}>
                    {sliced.map((content) => (
                      <Grid
                        item
                        xs={12 / matrix.col}
                        sx={{ p: 2, height: `${Math.floor(100 / matrix.row)}%`, mx: 'auto' }}
                      >
                        {content}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
          </Stack>
        </Grid>
      </Grid>
      <GridEditorMenu onPrint={handlePrint} />
    </>
  )
}

export default GridEditor
