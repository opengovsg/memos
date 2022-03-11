import { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

export const Keywords = (): JSX.Element => {
  const [keywords, setKeywords] = useState<string[]>([])
  // Debug
  const [debugTextValue, setDebugTextValue] = useState<string>('')

  const value: Node[] | null = null
  useEffect(() => {
    if (value) {
      setKeywords(value)
      setDebugTextValue(value)
    } else {
      setKeywords([])
      setDebugTextValue('')
    }
  }, [value])

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
    </VStack>
  )
}
