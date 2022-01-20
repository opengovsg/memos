import ApiService from '../../services/ApiService'

const TEMPLATES_ENDPOINT = '/templates'
//const MEMOS_ENDPOINT = '/memos'

const TemplatesApi = ApiService.url(TEMPLATES_ENDPOINT)

export interface SaveTemplateProps {
  name: string
  body: Array<{ type: 'TEXT' | 'HEADER'; data: string }>
}
export const saveTemplate = async (data: SaveTemplateProps): Promise<void> => {
  return TemplatesApi.url('/').post(data)
}
