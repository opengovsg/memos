import {
  LOCAL_STORAGE_EVENT,
  LOGGED_IN_KEY,
} from '~features/localStorage/constants'

import ApiService from '../../services/ApiService'

const AUTH_ENDPOINT = '/auth'

const AuthApi = ApiService.url(AUTH_ENDPOINT)

export type User = {
  id: number
  email: string
}

let mockEmail = ''
/**
 * Fetches the user from the server using the current session cookie.
 *
 * @returns the logged in user if session is valid, will throw 401 error if not.
 */
export const fetchUser = async (): Promise<User> => {
  console.log('fetchUser', mockEmail)
  if (!mockEmail) {
    // Remove logged in state from localStorage
    localStorage.removeItem(LOGGED_IN_KEY)
    // Event to let useLocalStorage know that key is being deleted.
    window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT))
    throw new Error('fake logout')
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, email: mockEmail })
    }, 500)
  })
  // return AuthApi.url('/whoami')
  //   .get()
  //   .json((data) => data)
}

export const sendLoginOtp = async (email: string) => {
  console.log('sendLoginOtp', email)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'OTP sent' })
    }, 500)
  })
  // return AuthApi.post({
  //   email: email.toLowerCase(),
  // }).json((data) => data)
}

export const verifyLoginOtp = async (params: {
  token: string
  email: string
}) => {
  console.log('verifyLoginOtp', params)
  mockEmail = params.email
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'OTP verified' })
    }, 500)
  })
  // return AuthApi.url('/verify')
  //   .post(params)
  //   .json((data) => data)
}

export const logout = async (): Promise<void> => {
  mockEmail = ''
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
  //return AuthApi.url('/logout').post()
}
