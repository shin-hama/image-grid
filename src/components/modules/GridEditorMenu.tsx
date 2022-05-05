import * as React from 'react'
import Divider from '@mui/material/Divider'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Props = MenuProps & {
  onPrint: () => void
}
const GridEditorMenu: React.FC<Props> = ({ onPrint, ...props }) => {
  const handlePrint = (e: React.MouseEvent) => {
    onPrint()
    props.onClose?.(e, 'backdropClick')
  }
  return (
    <Menu
      id="plan-menu"
      {...props}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handlePrint}>印刷</MenuItem>
      <MenuItem>画像を追加</MenuItem>
      <MenuItem>サイズ変更</MenuItem>
      <Divider />
      <MenuItem>画像をすべて削除</MenuItem>
    </Menu>
  )
}

export default GridEditorMenu
