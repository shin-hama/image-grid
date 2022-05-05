import * as React from 'react'
import { useList } from 'react-use'
import { ListActions } from 'react-use/lib/useList'

type ImagesContextType = {
  images: Array<string>
  actions: ListActions<string>
}
const ImagesContext = React.createContext<ImagesContextType | null>(null)

type Props = {
  children?: React.ReactNode
}
export const ImagesProvider: React.FC<Props> = ({ children }) => {
  const [images, actions] = useList<string>([])

  return <ImagesContext.Provider value={{ images, actions }}>{children}</ImagesContext.Provider>
}

export const useImages = () => {
  const context = React.useContext(ImagesContext)

  if (!context) {
    throw new Error('ImagesProvider is not wrapped')
  }

  return context
}
