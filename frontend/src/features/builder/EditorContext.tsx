import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { usePlateSelectors } from '@udecode/plate'
import _ from 'lodash'

import { useTemplate } from '~features/common/queries'

import * as BuilderService from './BuilderService'

type EditorContextProps = {
  status: 'idle' | 'loading' | 'success' | 'error'
  activeEditorId: string
  activeTemplateName: string
  initialEditorValue: string | null
  setActiveTemplateName: React.Dispatch<React.SetStateAction<string>>
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

export const useProvideEditor = (): EditorContextProps => {
  const { status, data: template } = useTemplate()
  const [activeEditorId] = useState<string>('defaultEditor')
  const [initialEditorValue, setInitialEditorValue] = useState<string | null>(
    null,
  )
  const [activeEditorValue, setActiveEditorValue] = useState<string>('')
  const [activeTemplateName, setActiveTemplateName] =
    useState<string>('My Template')
  const { value: getValue } = usePlateSelectors(activeEditorId)
  const value = getValue()

  useEffect(() => {
    if (status === 'success') {
      setActiveTemplateName(template?.name || 'My active template')
      setInitialEditorValue(_.get(template, 'body[0].data', ''))
    }
  }, [status, template])
  useEffect(() => {
    if (value) {
      setActiveEditorValue(JSON.stringify(value))
    } else {
      setActiveEditorValue('')
    }
  }, [value])

  const saveTemplate = useCallback(async () => {
    return BuilderService.saveTemplate({
      name: activeTemplateName,
      body: [
        {
          type: 'TEXT',
          data: activeEditorValue,
        },
      ],
    })
  }, [activeTemplateName, activeEditorValue])

  return {
    status,
    initialEditorValue,
    activeEditorId,
    activeTemplateName,
    setActiveTemplateName,
    saveTemplate,
  }
}
