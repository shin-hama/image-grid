import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
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
    } else {
      onChangeRatio(0)
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
        <Collapse in={open === 'grid'} orientation="horizontal">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Stack direction="row" alignItems="center">
              <Typography>Column</Typography>
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
            </Stack>
            <FontAwesomeIcon icon={faSlash} rotation={90} />
            <Stack direction="row" alignItems="center" pl={1}>
              <Typography>Row</Typography>
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
            </Stack>
          </Stack>
        </Collapse>

        <Box>
          <IconButton onClick={handleOpen('mag')}>
            <SvgIcon>
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
            </SvgIcon>
          </IconButton>
        </Box>
        <Collapse in={open === 'mag'} orientation="horizontal">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <TextField
              label="Size"
              variant="outlined"
              size="small"
              value={ratio}
              onChange={handleEditRatio}
              InputProps={{ endAdornment: '%' }}
            />
          </Stack>
        </Collapse>
      </Stack>
    </>
  )
}

export default GridEditorHeader
