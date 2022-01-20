import React, { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { serializeHtml, usePlateEditorRef, usePlateStore } from '@udecode/plate'

import { getKeywords, serializeNodesToString } from '~pages/fields/plate/util'
import { useEditor } from '~features/builder/EditorContext'

export const Keywords = (): JSX.Element => {
  const [keywords, setKeywords] = useState<string[]>([])
  // Debug
  const [debugTextValue, setDebugTextValue] = useState<string>('')

  const { activeEditorId, activeHtmlValue, setActiveHtmlValue } = useEditor()
  const { useStore } = usePlateStore(activeEditorId)
  const editor = usePlateEditorRef(activeEditorId)
  const store = useStore()

  //   console.log(serializeHtml(editor, { nodes: store.value || [] }))
  useEffect(() => {
    if (editor && store.value && store.value.length > 0) {
      const textValue = serializeNodesToString(store.value || [])
      setKeywords(getKeywords(textValue))
      setActiveHtmlValue(serializeHtml(editor, { nodes: store.value || [] }))
      setDebugTextValue(textValue)
    } else {
      setKeywords([])
      setDebugTextValue('')
      setActiveHtmlValue('')
    }
  }, [store.value, activeEditorId, editor, setActiveHtmlValue])

  return (
    <VStack align="start">
      <Text textStyle="h3">Keywords detected</Text>

      <Box>
        {keywords.map((word, i) => {
          return <Text key={word + i}>{word}</Text>
        })}
      </Box>

      <Text textStyle="h3">Debug Text</Text>
      <Box maxWidth="fit-content">{debugTextValue}</Box>

      <Text textStyle="h3">Debug HTML</Text>
      <Box maxWidth="fit-content">{activeHtmlValue}</Box>
    </VStack>
  )
}
