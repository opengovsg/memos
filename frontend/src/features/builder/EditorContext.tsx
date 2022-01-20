import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { serializeHtml, usePlateSelectors } from '@udecode/plate'

import * as BuilderService from './BuilderService'

type EditorContextProps = {
  activeEditorId: string
  setActiveEditorId: React.Dispatch<React.SetStateAction<string>>
  activeHtmlValue: string
  saveTemplate: () => Promise<void>
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
  const [activeHtmlValue, setActiveHtmlValue] = useState<string>('')
  const { editor: getEditor, value: getValue } =
    usePlateSelectors(activeEditorId)
  const editor = getEditor()
  const value = getValue()
  useEffect(() => {
    if (editor && value) {
      setActiveHtmlValue(serializeHtml(editor, { nodes: value || [] }))
    } else {
      setActiveHtmlValue('')
    }
  }, [editor, value])

  const saveTemplate = useCallback(async () => {
    return BuilderService.saveTemplate({
      name: 'name',
      body: [
        {
          type: 'TEXT',
          data: activeHtmlValue,
        },
      ],
    })
  }, [activeHtmlValue])

  return {
    activeEditorId,
    setActiveEditorId,
    activeHtmlValue,
    saveTemplate,
  }
}
