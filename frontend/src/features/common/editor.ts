import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createImagePlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createUnderlinePlugin,
  PlatePlugin,
} from '@udecode/plate'

export const getCommonPlugins = (): PlatePlugin[] => {
  const components = createPlateUI()
  const plugins = createPlugins(
    [
      // elements
      createParagraphPlugin(), // paragraph element
      createBlockquotePlugin(), // blockquote element
      createCodeBlockPlugin(), // code block element
      createHeadingPlugin(), // heading elements
      createImagePlugin(), // insert images

      // marks
      createBoldPlugin(), // bold mark
      createItalicPlugin(), // italic mark
      createUnderlinePlugin(), // underline mark
      createCodePlugin(), // code mark
    ],
    { components },
  )
  return plugins
}
