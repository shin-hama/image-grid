import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBorderAll,
  faCaretLeft,
  faCaretRight,
  faMagnifyingGlassPlus,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'

import type { Matrix } from './GridEditor'

type Props = {
  matrix: Matrix
  onChangeMatrix: (newMatrix: Matrix) => void
  ratio: number
  onChangeRatio: (newRatio: number) => void
}
const GridEditorHeader: React.FC<Props> = ({ matrix, onChangeMatrix, ratio, onChangeRatio }) => {
  const [open, setOpen] = React.useState<'grid' | 'mag'>('grid')
  const handleOpen = (target: typeof open) => () => {
    setOpen(target)
  }
  const handleEditMatrix = (direction: keyof Matrix, value: number) => () => {
    console.log(direction, value)
    if (value < 1 || value > 4) {
      return
    }
    onChangeMatrix({ ...matrix, [direction]: value })
  }

  const handleEditRatio = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value)
    console.log(val)
    if (val && val > 0) {
      onChangeRatio(val)
    }
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton onClick={handleOpen('grid')}>
          <SvgIcon>
            <FontAwesomeIcon icon={faBorderAll} />
          </SvgIcon>
        </IconButton>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ display: open === 'grid' ? 'flex' : 'none' }}
        >
          <Box>
            Column
            <IconButton onClick={handleEditMatrix('col', matrix.col - 1)}>
              <SvgIcon>
                <FontAwesomeIcon icon={faCaretLeft} />
              </SvgIcon>
            </IconButton>
            {matrix.col}
            <IconButton onClick={handleEditMatrix('col', matrix.col + 1)}>
              <SvgIcon>
                <FontAwesomeIcon icon={faCaretRight} />
              </SvgIcon>
            </IconButton>
          </Box>
          <FontAwesomeIcon icon={faSlash} rotation={90} />
          <Box pl={1}>
            Row
            <IconButton onClick={handleEditMatrix('row', matrix.row - 1)}>
              <SvgIcon>
                <FontAwesomeIcon icon={faCaretLeft} />
              </SvgIcon>
            </IconButton>
            {matrix.row}
            <IconButton onClick={handleEditMatrix('row', matrix.row + 1)}>
              <SvgIcon>
                <FontAwesomeIcon icon={faCaretRight} />
              </SvgIcon>
            </IconButton>
          </Box>
        </Stack>
        <Box>
          <IconButton onClick={handleOpen('mag')}>
            <SvgIcon>
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </SvgIcon>
          </IconButton>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ display: open === 'mag' ? 'flex' : 'none' }}
        >
          <Typography>Size</Typography>
          <TextField
            variant="outlined"
            value={ratio}
            size="small"
            onChange={handleEditRatio}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Stack>
      </Stack>
    </>
  )
}

export default GridEditorHeader
