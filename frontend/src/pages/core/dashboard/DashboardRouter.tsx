import { Route, Switch } from 'react-router-dom'
import { Container, Flex } from '@chakra-ui/react'

import { MEMOS_ROUTE, TEMPLATES_ROUTE } from '~constants/routes'

import { TopNavBar } from '~pages/core/dashboard/components/TopNavBar'
import { MemosPage } from '~pages/memos/MemosPage'
import { TemplatesPage } from '~pages/templates/TemplatesPage'

import { LeftNavBar } from './components/LeftNavBar'

export const DashboardRouter = (): JSX.Element => {
  return (
    <Flex
      flexDir="column"
      minH="fullheight"
      px={0}
      margin="auto"
      // position relative set here for MainMenu in NavBar to expand
      position="relative"
    >
      <TopNavBar />
      <Flex direction="row">
        <LeftNavBar />
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
            maxWidth="100ch"
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
    </Flex>
  )
}
