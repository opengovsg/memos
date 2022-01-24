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
  setActiveEditorId: React.Dispatch<React.SetStateAction<string>>
  templateName: string
  initialEditorValue: string | null
  setTemplateName: React.Dispatch<React.SetStateAction<string>>
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

  const [activeEditorId, setActiveEditorId] = useState<string>('defaultEditor')
  const [initialEditorValue, setInitialEditorValue] = useState<string | null>(
    null,
  )

  // Editable template value that will be saved
  const [templateValue, setTemplateValue] = useState<string>('')
  const [templateName, setTemplateName] = useState<string>('My Template')
  const { value: getValue } = usePlateSelectors(activeEditorId)
  const value = getValue()

  useEffect(() => {
    if (status === 'success') {
      setTemplateName(template?.name || 'My Template')
      setInitialEditorValue(_.get(template, 'body[0].data', ''))
    }
  }, [status, template, activeEditorId])

  useEffect(() => {
    if (value) {
      setTemplateValue(JSON.stringify(value))
    } else {
      setTemplateValue('')
    }
  }, [value])

  const saveTemplate = useCallback(async () => {
    return BuilderService.saveTemplate({
      name: templateName,
      body: [
        {
          type: 'TEXT',
          data: templateValue,
        },
      ],
    })
  }, [templateName, templateValue])

  return {
    status,
    initialEditorValue,
    activeEditorId,
    setActiveEditorId,
    templateName,
    setTemplateName,
    saveTemplate,
  }
}
