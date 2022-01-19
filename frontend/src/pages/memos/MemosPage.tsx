import { Link } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'

import { BUILDER_ROUTE } from '~constants/routes'

export const MemosPage = (): JSX.Element => {
  return (
    <Flex flex={1} bg="neutral.200">
      <Link to={BUILDER_ROUTE}>
        <Button>Create a memo</Button>
      </Link>
    </Flex>
  )
}
