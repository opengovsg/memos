import { Attachment, ATTACHMENT_THEME_KEY } from './Field/Attachment'
import { Button } from './Button'
import { Link } from './Link'
import { Pagination, PAGINATION_THEME_KEY } from './Pagination'

export const components = {
  Button,
  Link,
  [ATTACHMENT_THEME_KEY]: Attachment,
  [PAGINATION_THEME_KEY]: Pagination,
}
