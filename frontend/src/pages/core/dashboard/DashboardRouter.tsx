import { Route } from 'react-router-dom'
import { Button, Container, Flex, Link, Switch, Text } from '@chakra-ui/react'

import { MEMOS_ROUTE, TEMPLATES_ROUTE } from '~constants/routes'

import { Navbar } from '~pages/core/navbar/NavBar'
import { MemosPage } from '~pages/memos/MemosPage'
import { TemplatesPage } from '~pages/templates/TemplatesPage'
import { useAuth } from '~features/auth/AuthContext'

export const DashboardRouter = (): JSX.Element => {
  const { user } = useAuth()

  return (
    <Flex
      flexDir="column"
      minH="fullheight"
      px={0}
      margin="auto"
      // position relative set here for MainMenu in NavBar to expand
      position="relative"
    >
      <Container
        minH="5rem"
        pb={4}
        textAlign="center"
        w="100%"
        px={['site-padding-x-mobile', 'site-padding-x']}
      >
        <Navbar />
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
        <Link to="/">
          <Button my={2} size="md">
            <Text>Some button</Text>
          </Button>
        </Link>
      </Container>
      <Flex flex={1}>
        <Container
          minH="100%"
          w="100%"
          flex={1}
          borderTopRadius={30}
          boxShadow="container"
          px={['site-padding-x-mobile', 'site-padding-x']}
          py={8}
          bg="white"
        >
          <Switch>
            <Route path={TEMPLATES_ROUTE}>
              <TemplatesPage />
            </Route>
            <Route path={MEMOS_ROUTE}>
              <MemosPage />
            </Route>
          </Switch>
        </Container>
      </Flex>
    </Flex>
  )
}
