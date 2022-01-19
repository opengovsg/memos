import { Flex, Text } from '@chakra-ui/react'

export const BuilderContent = (): JSX.Element => {
  return (
    <Flex flex={1} bg="neutral.200">
      <Flex
        m="2rem"
        mb={0}
        flex={1}
        bg="primary.100"
        p="2.5rem"
        justify="center"
        overflow="auto"
      >
        <Flex
          h="fit-content"
          bg="white"
          p="2.5rem"
          maxW="57rem"
          w="100%"
          flexDir="column"
        >
          <Text> Some preview text here </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
