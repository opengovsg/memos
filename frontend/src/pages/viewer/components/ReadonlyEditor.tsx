import { FC } from 'react'
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createUnderlinePlugin,
  Plate,
} from '@udecode/plate'

interface ReadonlyEditorProps {
  value: string
}

export const ReadonlyEditor: FC<ReadonlyEditorProps> = ({ value }) => {
  const initialValue = JSON.parse(value)

  const components = createPlateUI()
  const plugins = createPlugins(
    [
      // elements
      createParagraphPlugin(), // paragraph element
      createBlockquotePlugin(), // blockquote element
      createCodeBlockPlugin(), // code block element
      createHeadingPlugin(), // heading elements

      // marks
      createBoldPlugin(), // bold mark
      createItalicPlugin(), // italic mark
      createUnderlinePlugin(), // underline mark
      createCodePlugin(), // code mark
    ],
    { components },
  )

  return (
    <Plate
      editableProps={{ readOnly: true }}
      initialValue={initialValue}
      plugins={plugins}
    />
  )
}
