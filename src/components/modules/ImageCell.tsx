import * as React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useClickAway } from 'react-use'

type Props = {
  children: React.ReactNode
}
const ImageCell: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const boxRef = React.useRef<HTMLDivElement>(null)
  useClickAway(boxRef, () => setOpen(false))
  return (
    <Box
      ref={boxRef}
      width="100%"
      height="100%"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => setOpen(true)}
    >
      {open && (
        <Box position="absolute" top={1} right={1}>
          <IconButton>
            <SvgIcon>
              <FontAwesomeIcon icon={faTrash} />
            </SvgIcon>
          </IconButton>
        </Box>
      )}
      {children}
    </Box>
  )
}

export default ImageCell
