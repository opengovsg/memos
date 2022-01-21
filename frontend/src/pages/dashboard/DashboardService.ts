import ApiService from '~services/ApiService'

// TODO: Refactor to UseUser hook?
const AUTH_ENDPOINT = '/auth'
const AuthApi = ApiService.url(AUTH_ENDPOINT)

const USERS_ENDPOINT = '/users'
const UsersApi = ApiService.url(USERS_ENDPOINT)

// This should be in a shared file with the backend.
export class TemplateMetaResponseDto {
  id!: number
  status!: string
  editor!: number
  isEditor!: boolean
  isIssuer!: boolean

  name!: string
  updatedAt!: Date
}

/**
 * Gets metadata for all templates in dashboard view i.e. forms which user
 * owns or collaborates on
 * @returns Metadata required for forms on dashboard view
 */
export const getTemplatesView = async (): Promise<
  TemplateMetaResponseDto[]
> => {
  // This definitely should be cached somewhere xD
  const user = await AuthApi.url('/whoami').get().json()
  const userId = user.id
  return UsersApi.url(`/${userId}/templates`).get().json()
}
