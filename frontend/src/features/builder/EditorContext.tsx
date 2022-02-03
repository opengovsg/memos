import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { platesStore, usePlateSelectors } from '@udecode/plate'
import _ from 'lodash'

import { useTemplate } from '~features/common/queries'

import * as BuilderService from './BuilderService'

type EditorContextProps = {
  status: 'idle' | 'loading' | 'success' | 'error'
  activeEditorId: string
  setActiveEditorId: React.Dispatch<React.SetStateAction<string>>
  activeTemplateName: string
  initialEditorValue: string | null
  setActiveTemplateName: React.Dispatch<React.SetStateAction<string>>
  resetEditor: () => Promise<void>
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
  const [activeEditorId, setActiveEditorId] = useState<string>('default')
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
      setActiveTemplateName(template?.name || 'My Template')
      setInitialEditorValue(_.get(template, 'body[0].data', ''))
    }
  }, [status, template, activeEditorId])

  useEffect(() => {
    if (value) {
      setActiveEditorValue(JSON.stringify(value))
    } else {
      setActiveEditorValue('')
    }
  }, [value])

  // https://github.com/udecode/plate/issues/1349
  const resetEditor = useCallback(async () => {
    const currState = platesStore.store.getState()
    platesStore.set.state(() => {
      if (currState[activeEditorId]) {
        delete currState[activeEditorId]
      }
      return currState
    })
  }, [activeEditorId])

  const saveTemplate = useCallback(async () => {
    setActiveEditorValue(JSON.stringify(value))
    const saveTemplateDto = {
      name: activeTemplateName,
      body: [
        {
          type: BuilderService.TemplateBlockType.Text,
          data: activeEditorValue,
        },
      ],
    }
    if (activeEditorId !== 'default') {
      console.log(activeEditorId)
      return BuilderService.updateTemplate(activeEditorId, saveTemplateDto)
    }
    return BuilderService.saveTemplate(saveTemplateDto)
  }, [value, activeTemplateName, activeEditorValue, activeEditorId])

  return {
    status,
    initialEditorValue,
    activeEditorId,
    setActiveEditorId,
    activeTemplateName,
    setActiveTemplateName,
    resetEditor,
    saveTemplate,
  }
}
