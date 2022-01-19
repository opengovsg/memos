import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import { NavBarContainer } from './components/NavBarContainer'

export const Dashboard = (): JSX.Element => {
  return (
    <Flex flexDir="column" height="100vh" overflow="hidden" pos="relative">
      <NavBarContainer />
      <Outlet />
    </Flex>
  )
}
