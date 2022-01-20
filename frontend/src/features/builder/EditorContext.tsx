import React, { createContext, FC, useContext, useState } from 'react'

type EditorContextProps = {
  activeEditorId: string
  setActiveEditorId: React.Dispatch<React.SetStateAction<string>>
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export const EditorContextProvider: FC = ({ children }) => {
  const editor = useProvideEditor()

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
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
  const [activeEditorId, setActiveEditorId] = useState<string>('hello')
  return {
    activeEditorId,
    setActiveEditorId,
  }
}
