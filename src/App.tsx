import * as React from 'react'

import Main from 'components/layouts/main'
import { ImagesProvider } from 'contexts/ImagesProvider'

function App() {
  return (
    <ImagesProvider>
      <Main />
    </ImagesProvider>
  )
}

export default App
