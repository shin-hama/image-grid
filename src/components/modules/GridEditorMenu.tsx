import * as React from 'react'
import Divider from '@mui/material/Divider'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Props = MenuProps & {}
const GridEditorMenu: React.FC<Props> = (props) => {
  return (
    <Menu
      id="plan-menu"
      {...props}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem>印刷</MenuItem>
      <MenuItem>画像を追加</MenuItem>
      <Divider />
      <MenuItem>画像をすべて削除</MenuItem>
    </Menu>
  )
}
