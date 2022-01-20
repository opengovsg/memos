import React, { createContext, FC, useContext, useState } from 'react'

type EditorContextProps = {
  keywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorContextProvider: FC = ({ children }) => {
  const auth = useProvideEditor()

  return (
    <EditorContext.Provider value={auth}>{children}</EditorContext.Provider>
  )
}

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error(
      `useEditor must be used within a EditorContextProvider component`,
    )
  }
  return context
}

export const useProvideEditor = () => {
  const [keywords, setKeywords] = useState<string[]>([])
  return {
    keywords,
    setKeywords,
  }
}
