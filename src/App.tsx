import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ImageUploader from 'components/modules/ImageUploader'
import GridEditor from 'components/modules/GridEditor'

function App() {
  const [images, setImages] = React.useState<Array<string>>([])

  const handleChange = React.useCallback((newImages: Array<string>) => {
    setImages((prev) => [...prev, ...newImages])
  }, [])

  return (
    <Stack alignItems="center">
      {images.length === 0 && (
        <Box paddingY={6}>
          <Typography component="h1" variant="h4">
            Image Grid Maker
          </Typography>
        </Box>
      )}
      <ImageUploader onChange={handleChange} fab={images.length !== 0} />
      {images.length > 0 && (
        <GridEditor
          contents={images.map((image) => (
            <img
              key={image}
              src={image}
              alt="test"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ))}
        />
      )}
    </Stack>
  )
}

export default App
