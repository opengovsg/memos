import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  BUILDER_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
} from '~constants/routes'

import { Builder } from '~pages/builder/Builder'
import { Dashboard } from '~pages/dashboard/Dashboard'
import { LoginPage } from '~pages/login/LoginPage'

import { PrivateElement } from './PrivateElement'
import { PublicElement } from './PublicElement'

export const AppRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Navigate to={DASHBOARD_ROUTE} />} />

        <Route
          path={LOGIN_ROUTE}
          element={<PublicElement strict element={<LoginPage />} />}
        />

        <Route
          path={DASHBOARD_ROUTE}
          element={<PrivateElement element={<Dashboard />} />}
        />

        <Route
          path={BUILDER_ROUTE}
          element={<PrivateElement element={<Builder />} />}
        />

        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </Suspense>
  )
}