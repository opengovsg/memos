import { Link } from 'react-router-dom'
import { Button, Center, Text } from '@chakra-ui/react'

import { BUILDER_ROUTE } from '~constants/routes'

export const TemplatesPage = (): JSX.Element => {
  return (
    <Center>
      <Link to={BUILDER_ROUTE}>
        <Button>Build a template</Button>
      </Link>
    </Center>
  )
}
