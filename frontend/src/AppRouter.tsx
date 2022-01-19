import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  MEMOS_ROUTE,
  ROOT_ROUTE,
  TEMPLATES_ROUTE,
} from '~constants/routes'

import { Dashboard } from '~pages/dashboard/Dashboard'
import { LoginPage } from '~pages/login/LoginPage'
import { MemosPage } from '~pages/memos/MemosPage'
import { TemplatesPage } from '~pages/templates/TemplatesPage'

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
        >
          <Route index element={<TemplatesPage />} />
          <Route path={TEMPLATES_ROUTE} element={<TemplatesPage />} />
          <Route path={MEMOS_ROUTE} element={<MemosPage />} />
        </Route>

        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </Suspense>
  )
}
