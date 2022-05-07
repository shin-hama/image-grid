import * as React from 'react'
import Box from '@mui/material/Box'

import styles from './page.module.scss'
import { useImageUploader } from 'hooks/useImageUploader'

type Props = {
  children: React.ReactNode
}
const ImageUploader: React.FC<Props> = ({ children }) => {
  const upload = useImageUploader()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      upload(e.target.files)
    }
  }

  return (
    <Box displayPrint="none">
      <label htmlFor="upload-image" className={styles.no_print}>
        <input
          id="upload-image"
          name="upload"
          onChange={handleChange}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
        {children}
      </label>
    </Box>
  )
}

export default ImageUploader
