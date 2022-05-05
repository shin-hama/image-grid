import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faCaretRight,
  faEllipsisVertical,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'

import type { Matrix } from './GridEditor'
import GridEditorMenu from './GridEditorMenu'

type Props = {
  matrix: Matrix
  onChangeMatrix: (newMatrix: Matrix) => void
  onPrint: () => void
}
const GridEditorHeader: React.FC<Props> = ({ matrix, onChangeMatrix, onPrint }) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)

  const handleEditMatrix = (direction: keyof Matrix, value: number) => () => {
    console.log(direction, value)
    if (value < 1 || value > 4) {
      return
    }
    onChangeMatrix({ ...matrix, [direction]: value })
  }

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchor(e.currentTarget)
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box />
        <Stack direction="row" alignItems="center" justifyContent="center">
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
        <IconButton onClick={handleOpenMenu}>
          <SvgIcon>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </SvgIcon>
        </IconButton>
      </Stack>
      <GridEditorMenu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        onPrint={onPrint}
      />
    </>
  )
}

export default GridEditorHeader
