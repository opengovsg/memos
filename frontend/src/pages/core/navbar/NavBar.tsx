import { Link } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import { MEMOS_ROUTE, TEMPLATES_ROUTE } from '~constants/routes'

export const Navbar = (): JSX.Element => {
  return (
    <Flex
      h="navbar-height"
      alignItems="center"
      w="100%"
      maxW="60ch"
      zIndex={999}
      justifyContent="space-between"
    >
      <Link to={TEMPLATES_ROUTE}>Templates</Link>
      <Link to={MEMOS_ROUTE}>Issued Memos</Link>
    </Flex>
  )
}
