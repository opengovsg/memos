import ApiService from '~services/ApiService'

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
export const getTemplatesView = async (
  userId: number,
): Promise<TemplateMetaResponseDto[]> => {
  return UsersApi.url(`/${userId}/templates`).get().json()
}
