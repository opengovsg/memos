import { Navigate, useLocation } from 'react-router-dom'

import { ROOT_ROUTE } from '~constants/routes'

import { useAuth } from '~features/auth/AuthContext'

interface PublicElementProps {
  /**
   * If `strict` is true, only non-authed users can access the route.
   * i.e. signin page, where authed users accessing that page should be
   * redirected out.
   * If `strict` is false, then both authed and non-authed users can access
   * the route.
   * Defaults to `false`.
   */
  strict?: boolean
  element: React.ReactElement
}

export const PublicElement = ({
  element,
  strict,
}: PublicElementProps): React.ReactElement => {
  const location = useLocation()
  const state = location.state as { from: Location } | undefined

  const { user } = useAuth()

  if (user && strict) {
    return <Navigate to={state?.from.pathname ?? ROOT_ROUTE} replace />
  }

  return element
}
