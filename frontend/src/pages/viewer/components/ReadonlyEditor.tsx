import { FC } from 'react'
import { Plate } from '@udecode/plate'

import { getCommonPlugins } from '~features/common/editor'

interface ReadonlyEditorProps {
  value: string
}

export const ReadonlyEditor: FC<ReadonlyEditorProps> = ({ value }) => {
  const initialValue = JSON.parse(value)

  const plugins = getCommonPlugins()

  return (
    <Plate
      editableProps={{ readOnly: true }}
      initialValue={initialValue}
      plugins={plugins}
    />
  )
}
