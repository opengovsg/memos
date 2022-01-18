import { Center, Spinner, Text } from '@chakra-ui/react'

export const TemplatesPage = (): JSX.Element => {
  return (
    <Center>
      <Text>Templates Page</Text>
      <Spinner thickness="4px" color="primary.500" size="xl" />
    </Center>
  )
}
