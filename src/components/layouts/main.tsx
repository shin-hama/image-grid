import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ImageUploader from 'components/modules/ImageUploader'
import GridEditor from 'components/modules/GridEditor'
import { useImages } from 'contexts/ImagesProvider'
import ReleaseNote from 'components/modules/ReleaseNote'

function Main() {
  const { images } = useImages()

  return (
    <>
      {images.length === 0 && (
        <Stack paddingY={6} alignItems="center" spacing={4} mx={2}>
          <Typography component="h1" variant="h4">
            Collage Printer
          </Typography>
          <ImageUploader>
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </ImageUploader>
          <ReleaseNote />
        </Stack>
      )}
      {images.length > 0 && <GridEditor />}
    </>
  )
}

export default Main
