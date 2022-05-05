import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ImageUploader from 'components/modules/ImageUploader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <CardContent>
            <ImageUploader />
          </CardContent>
        </Card>
      </header>
    </div>
  )
}

export default App
