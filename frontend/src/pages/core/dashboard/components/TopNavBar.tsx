import { Link } from 'react-router-dom'
import { Flex, Image, Text } from '@chakra-ui/react'

import MemoLogo from '~assets/svgs/logo.svg'
import { TEMPLATES_ROUTE } from '~constants/routes'

import { useAuth } from '~features/auth/AuthContext'

export const TopNavBar = (): JSX.Element => {
  const { user } = useAuth()
  return (
    <Flex
      h="navbar-height"
      alignItems="center"
      w="100%"
      // maxW="60ch"
      zIndex={999}
      justifyContent="space-between"
    >
      <Link to={TEMPLATES_ROUTE}>
        <Image src={MemoLogo}></Image>
      </Link>

      <Text
        textStyle="heading3"
        color="primary.600"
        textTransform="capitalize"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        Welcome, {user?.email?.toLowerCase()}
      </Text>
    </Flex>
  )
}
