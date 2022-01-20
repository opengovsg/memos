import { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import { serializeHtml, usePlateEditorRef, usePlateStore } from '@udecode/plate'

import { getKeywords, serializeNodesToString } from '~pages/fields/plate/util'
import { useEditor } from '~features/builder/EditorContext'

export const Keywords = (): JSX.Element => {
  const [keywords, setKeywords] = useState<string[]>([])
  // Debug
  const [debugTextValue, setDebugTextValue] = useState<string>('')
  const [debugHtmlValue, setDebugHtmlValue] = useState<string>('')

  const { activeEditorId } = useEditor()
  const { useStore } = usePlateStore(activeEditorId)
  const editor = usePlateEditorRef(activeEditorId)
  const store = useStore()

  //   console.log(serializeHtml(editor, { nodes: store.value || [] }))
  useEffect(() => {
    if (store.value && store.value.length > 0) {
      const textValue = serializeNodesToString(store.value)
      setKeywords(getKeywords(textValue))
      setDebugHtmlValue(serializeHtml(editor, { nodes: store.value || [] }))
      setDebugTextValue(textValue)
    } else {
      setKeywords([])
    }
  }, [store.value, activeEditorId, editor])

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
      <Box maxWidth="fit-content">{debugHtmlValue}</Box>
    </VStack>
  )
}
