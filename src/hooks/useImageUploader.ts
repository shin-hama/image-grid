import { useImages } from 'contexts/ImagesProvider'
import * as React from 'react'

export const useImageUploader = () => {
  const { actions } = useImages()

  const upload = React.useCallback(
    (images: FileList) => {
      actions.push(...Array.from(images).map((image) => URL.createObjectURL(image)))
    },
    [actions]
  )

  return upload
}
