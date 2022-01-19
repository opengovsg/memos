import { Flex, Text } from '@chakra-ui/react'

import { useEditor } from '~features/builder/EditorContext'

export const Keywords = (): JSX.Element => {
  const { keywords } = useEditor()
  return (
    <Flex flexDirection="column">
      <Text>Keywords detected so far</Text>
      {keywords.map((word, i) => {
        return <Text key={word + i}>{word}</Text>
      })}
    </Flex>
  )
}
