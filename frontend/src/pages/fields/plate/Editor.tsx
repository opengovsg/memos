import { useCallback, useState } from 'react'
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt'
import { FormatBold } from '@styled-icons/material/FormatBold'
import { FormatItalic } from '@styled-icons/material/FormatItalic'
import { FormatQuote } from '@styled-icons/material/FormatQuote'
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined'
import { Looks3 } from '@styled-icons/material/Looks3'
import { Looks4 } from '@styled-icons/material/Looks4'
import { Looks5 } from '@styled-icons/material/Looks5'
import { Looks6 } from '@styled-icons/material/Looks6'
import { LooksOne } from '@styled-icons/material/LooksOne'
import { LooksTwo } from '@styled-icons/material/LooksTwo'
import {
  BlockToolbarButton,
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
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  getPluginType,
  HeadingToolbar,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  Plate,
  usePlateEditorRef,
} from '@udecode/plate'
import { Node } from 'slate'

import { useEditor } from '~features/builder/EditorContext'

const createElement = (
  text: string,
  { type, mark }: { type?: string; mark?: string } = {},
) => {
  const leaf = { text, ...(mark ? { [mark]: true } : {}) }

  return {
    type: type || ELEMENT_PARAGRAPH,
    children: [leaf],
  }
}

const initialValue = [
  createElement('🧱 Memos', { type: ELEMENT_H1 }),
  createElement('You can add {{keywords}} enclosed in {{ curly }} braces'),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),

  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
]
const CONFIG = {
  editableProps: {
    // autoFocus: process.env.NODE_ENV !== 'production',
    autoFocus: false,
    spellCheck: false,
    placeholder: 'Type…',
    style: {
      padding: '15px',
    },
  },
}

const BasicElementToolbarButtons = () => {
  const editor = usePlateEditorRef()!

  return (
    <>
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H5)}
        icon={<Looks5 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_H6)}
        icon={<Looks6 />}
      />
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
    </>
  )
}

const BasicMarkToolbarButtons = () => {
  const editor = usePlateEditorRef()!

  return (
    <>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_CODE)}
        icon={<CodeAlt />}
      />
    </>
  )
}

const keywordRegexp = new RegExp('{{\\s*([a-zA-Z0-9_]+)\\s*}}', 'g')
const getKeywords = (value: string): string[] => {
  let match
  const result = new Set<string>()
  while ((match = keywordRegexp.exec(value))) {
    result.add(match[1])
  }
  return Array.from(result)
}
const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n')
}
export const Editor = (): JSX.Element => {
  const [value, setValue] = useState<string>('')

  const { setKeywords } = useEditor()
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

  const handleChange = useCallback(() => {
    if (value.length > 4) {
      console.log(value)
      const keywords = getKeywords(value)
      setKeywords(keywords)
    }
  }, [value, setKeywords])

  return (
    <div style={{ maxWidth: 'fit-content' }}>
      <Plate
        id="playground"
        editableProps={CONFIG.editableProps}
        initialValue={initialValue}
        plugins={plugins}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(serialize(newValue))
          handleChange()
        }}
      >
        <HeadingToolbar>
          <BasicElementToolbarButtons />
          <BasicMarkToolbarButtons />
        </HeadingToolbar>
      </Plate>
    </div>
  )
}
