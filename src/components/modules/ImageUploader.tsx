import * as React from 'react'
import { useForm } from 'react-hook-form'

type ImagesFormField = {
  images?: FileList
}
const ImageUploader = () => {
  const { register, watch, handleSubmit } = useForm<ImagesFormField>()
  const uploaded = watch('images')
  const [images, setImages] = React.useState<Array<string>>([])

  React.useEffect(() => {
    const subscription = watch((value, test) => console.log(value, test))

    return () => subscription.unsubscribe()
  })

  React.useEffect(() => {
    console.log(uploaded)
    if (uploaded) {
      setImages((prev) => [
        ...prev,
        ...Array.from(uploaded).map((item) => URL.createObjectURL(item)),
      ])
    }
  }, [uploaded])

  const onSubmit = (data: unknown) => console.log(data)

  return (
    <>
      {images.map((image) => (
        <div key={image}>{image}</div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('images')} type="file" accept="image/*" multiple />
      </form>
    </>
  )
}

export default ImageUploader
