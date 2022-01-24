import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export const IssueSingleMemoPage = (): ReactElement => {
  const { templateId } = useParams()
  return <div>{templateId}</div>
}
