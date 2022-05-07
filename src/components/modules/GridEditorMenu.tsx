import * as React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SvgIcon from '@mui/material/SvgIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons'

import ImageUploader from './ImageUploader'
import { useImages } from 'contexts/ImagesProvider'

type Action = {
  name: string
  icon: React.ReactNode
  action: () => void
}

type Props = {
  onPrint: () => void
}
const EditorSpeedDial: React.FC<Props> = ({ onPrint }) => {
  const { actions: imageAction } = useImages()

  const handleClear = React.useCallback(() => {
    imageAction.clear()
  }, [imageAction])

  const actions = React.useMemo<Array<Action>>(
    () => [
      {
        name: 'print',
        icon: (
          <SvgIcon>
            <FontAwesomeIcon icon={faPrint} />
          </SvgIcon>
        ),
        action: onPrint,
      },
      {
        name: 'add',
        icon: (
          <ImageUploader>
            <Box display="flex">
              <SvgIcon>
                <FontAwesomeIcon icon={faPlus} />
              </SvgIcon>
            </Box>
          </ImageUploader>
        ),
        action: () => null,
      },
      {
        name: 'clear',
        icon: (
          <SvgIcon>
            <FontAwesomeIcon icon={faTrash} />
          </SvgIcon>
        ),
        action: handleClear,
      },
    ],
    [handleClear, onPrint]
  )
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, printDisplay: 'none' }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<FontAwesomeIcon icon={faEllipsisV} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default EditorSpeedDial
