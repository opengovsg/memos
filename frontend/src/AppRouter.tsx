import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
  TEMPLATES_ROUTE,
} from '~constants/routes'

import { DashboardRouter } from '~pages/core/dashboard/DashboardRouter'
import { LoginPage } from '~pages/login/LoginPage'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PrivateRoute path={DASHBOARD_ROUTE}>
          <DashboardRouter />
        </PrivateRoute>
        <PublicRoute exact path={LOGIN_ROUTE}>
          <LoginPage />
        </PublicRoute>
        <PrivateRoute exact path={ROOT_ROUTE}>
          <Redirect to={TEMPLATES_ROUTE} />
        </PrivateRoute>
        <Route path="*">
          <Redirect to={LOGIN_ROUTE} />
        </Route>
      </Switch>
    </Suspense>
  )
}
