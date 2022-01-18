import { Center, Spinner, Text } from '@chakra-ui/react'

export const MemosPage = (): JSX.Element => {
  return (
    <Center>
      <Text>Memos Page</Text>
      <Spinner thickness="4px" color="primary.500" size="xl" />
    </Center>
  )
}
