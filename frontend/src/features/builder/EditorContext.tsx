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
  // Id of editor -- will be set to template id when template is loaded
  const [activeEditorId, setActiveEditorId] = useState<string>('defaultEditor')
  // Hook to retrieve value from the editor
  const { value: getValue } = usePlateSelectors(activeEditorId)
  const value = getValue()

  // Value to initialize editor with
  const [initialEditorValue, setInitialEditorValue] = useState<string | null>(
    null,
  )

  // Editable template value that will be saved
  const [templateValue, setTemplateValue] = useState<string>('')
  const [templateName, setTemplateName] = useState<string>('My Template')

  // Make an api call to fetch template
  const { status, data: template } = useTemplate()
  // When the api call to fetch the template is complete, set the values in the navbar
  // and editor to the saved name and saved body
  useEffect(() => {
    if (status === 'success') {
      setTemplateName(template?.name || 'My Template')
      setInitialEditorValue(_.get(template, 'body[0].data', ''))
    }
  }, [status, template, activeEditorId])

  // Hook to set the template value on change so that we can save it after
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
