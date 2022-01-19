import { Link } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

import { MEMOS_ROUTE, TEMPLATES_ROUTE } from '~constants/routes'

export const LeftNavBar = (): JSX.Element => {
  return (
    <Flex
      h="navbar-height"
      alignItems="left"
      w="100%"
      maxW="20ch"
      zIndex={999}
      direction="column"
    >
      <Link to={TEMPLATES_ROUTE}>All Templates</Link>
      <Link to={MEMOS_ROUTE}>Issued Memos</Link>
    </Flex>
  )
}
