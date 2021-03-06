import ApiService from '../../services/ApiService'

const AUTH_ENDPOINT = '/auth'

const AuthApi = ApiService.url(AUTH_ENDPOINT)

export type User = {
  id: number
  email: string
}

/**
 * Fetches the user from the server using the current session cookie.
 *
 * @returns the logged in user if session is valid, will throw 401 error if not.
 */
export const fetchUser = async (): Promise<User> => {
  return AuthApi.url('/whoami')
    .get()
    .json((data) => ({
      id: data.id,
      email: data.email,
    }))
}

export const sendLoginOtp = async (email: string) => {
  return AuthApi.post({
    email: email.toLowerCase(),
  }).json((data) => data)
}

export const verifyLoginOtp = async (params: {
  token: string
  email: string
}) => {
  return AuthApi.url('/verify')
    .post(params)
    .json((data) => !!data)
}

export const logout = async (): Promise<void> => {
  return AuthApi.url('/logout').post()
}
