import { Editor, Issuer, User } from 'database/entities'
import { Repository } from 'typeorm'
import mustache from 'mustache'

/**
 * Checks whether a user is an editor of a template.
 */
export const isTemplateEditor = async (
  user: User,
  editorRepo: Repository<Editor>,
  templateId: number,
) => {
  const editor = await editorRepo.findOne({
    where: {
      user,
      template: {
        id: templateId,
      },
    },
  })
  return !!editor
}

/**
 * Checks whether a user is an editor of a template.
 */
export const isTemplateIssuer = async (
  user: User,
  issuerRepo: Repository<Issuer>,
  templateId: number,
) => {
  const issuer = await issuerRepo.findOne({
    where: {
      user,
      template: {
        id: templateId,
      },
    },
  })
  return !!issuer
}

/**
 * Checks whether a user is an editor OR issuer of a template.
 */
export const isTemplateEditorOrIssuer = async (
  user: User,
  editorRepo: Repository<Editor>,
  issuerRepo: Repository<Issuer>,
  templateId: number,
) => {
  return (
    (await isTemplateEditor(user, editorRepo, templateId)) ||
    (await isTemplateIssuer(user, issuerRepo, templateId))
  )
}

export const parseTemplate = (body: string): Array<string> => {
  const vars: Set<string> = new Set()

  const parsed = mustache.parse(body)
  for (const meta of parsed) {
    const type = meta[0]
    const token = meta[1]
    if (type === 'name') {
      const key = token.toLowerCase()
      if (!key) {
        // TODO: throw an error? This currently ignores empty keys
        continue
      }
      vars.add(key)
    }
  }

  return Array.from(vars)
}
