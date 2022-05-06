import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Main from 'components/modules/layouts/main'
import { ImagesProvider } from 'contexts/ImagesProvider'

function App() {
  return (
    <ImagesProvider>
      <CssBaseline />
      <Main />
    </ImagesProvider>
  )
}

export default App
