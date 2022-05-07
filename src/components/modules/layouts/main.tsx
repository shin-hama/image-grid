import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ImageUploader from 'components/modules/ImageUploader'
import GridEditor from 'components/modules/GridEditor'
import { useImages } from 'contexts/ImagesProvider'

function Main() {
  const { images } = useImages()

  return (
    <Stack alignItems="center">
      {images.length === 0 && (
        <Stack paddingY={6} alignItems="center" spacing={4}>
          <Typography component="h1" variant="h4">
            Image Grid Maker
          </Typography>
          <ImageUploader>
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </ImageUploader>
        </Stack>
      )}
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

export default Main
