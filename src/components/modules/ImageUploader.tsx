import * as React from 'react'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {
  fab?: boolean
  onChange: (values: Array<string>) => void
}
const ImageUploader: React.FC<Props> = ({ fab, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files).map((item) => URL.createObjectURL(item)))
    }
  }

  return (
    <>
      <label htmlFor="upload-image">
        <input
          id="upload-image"
          name="upload"
          onChange={handleChange}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
        {fab ? (
          <Fab component="span" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <SvgIcon>
              <FontAwesomeIcon icon={faPlus} />
            </SvgIcon>
          </Fab>
        ) : (
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        )}
      </label>
    </>
  )
}

export default ImageUploader
