import wretch from 'wretch'

import {
  LOCAL_STORAGE_EVENT,
  LOGGED_IN_KEY,
} from '~features/localStorage/constants'

const API_BASE_URL = process.env.REACT_APP_BASE_URL ?? '/api'

// Create own instance with defaults.
const ApiService = wretch(API_BASE_URL).catcher(401, async (error, request) => {
  // Remove logged in state from localStorage
  localStorage.removeItem(LOGGED_IN_KEY)
  // Event to let useLocalStorage know that key is being deleted.
  window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT))
})

export default ApiService
