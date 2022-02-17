import ApiService from '~services/ApiService'

import { ADDRESSING_PARAMETERS } from './constants'

// TODO: migrate to shared types
enum TemplateStatus {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Archived = 'ARCHIVED',
}

enum TemplateBlockType {
  Header = 'HEADER',
  Text = 'TEXT',
}

interface TemplateHeaderBlock {
  type: TemplateBlockType.Header
  data: string
}

interface TemplateTextBlock {
  type: TemplateBlockType.Text
  data: string
}

type TemplateBlock = TemplateHeaderBlock | TemplateTextBlock

export interface Template {
  id: number
  version: number
  status: TemplateStatus
  author: number
  editor: number

  name: string
  body: TemplateBlock[]
  paramsRequired: string[]
}

const TEMPLATES_ENDPOINT = '/templates'
const templatesApi = ApiService.url(TEMPLATES_ENDPOINT)

/**
 * Gets a template and its latest version based on id
 */
export const getTemplate = (templateId: number): Promise<Template> => {
  return templatesApi.url(`/${templateId}`).get().json()
}

/**
 * Gets the required parameters from the template
 * Including compulsory addressing parameters.
 */
export const getTemplateParameters = (template?: Template): string[] => {
  let headers = template?.paramsRequired || []
  // Params from backend should not have UIN_TOKEN and UIN_TYPE_TOKEN
  headers = [...ADDRESSING_PARAMETERS, ...headers]
  return headers
}
