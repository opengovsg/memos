import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import { BuilderNavBarContainer } from './components/BuilderNavBarContainer'

export const Builder = (): JSX.Element => {
  return (
    <Flex flexDir="column" height="100vh" overflow="hidden" pos="relative">
      <BuilderNavBarContainer />
      <Outlet />
    </Flex>
  )
}
