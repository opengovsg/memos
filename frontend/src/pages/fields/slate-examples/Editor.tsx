import { useCallback, useRef, useState } from 'react'
import { css } from '@emotion/css'
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Text,
  Transforms,
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react'

import { useLocalStorage } from '~features/localStorage/useLocalStorage'

import { Button, Icon, Toolbar } from './components'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

type CustomElement = {
  type: 'paragraph' | 'block-quote'
  children: CustomText[]
}
type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const SearchHighlightingExample = () => {
  const [storedField, setStoredField] = useLocalStorage<Descendant[]>(
    'HIGHLIGHTING_EXAMPLE',
  )
  const [value, setValue] = useState<Descendant[]>(storedField || initialValue)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editorRef = useRef<Editor>()
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()))
  const editor = editorRef.current
  const decorate = useCallback(([node, path]) => {
    const ranges: any[] = []

    if (Text.isText(node)) {
      const { text } = node
      const parts = text.split('{{')
      let offset = 0

      parts.forEach((part, i) => {
        if (i !== 0) {
          const end = part.indexOf('}}')
          if (end > -1) {
            ranges.push({
              anchor: { path, offset: offset - 2 },
              focus: { path, offset: offset + end + 2 },
              highlight: true,
            })
          }
        }

        offset = offset + part.length + 2
      })
    }

    return ranges
  }, [])

  return (
    <div style={{ maxWidth: 'fit-content' }}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value)
          setStoredField(value)
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          {/*<BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
         <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" /> */}
        </Toolbar>
        <Editable
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  )
}

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: any, format: any) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  )

  return !!match
}

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor) as any
  return marks ? marks[format] === true : false
}

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any
  children: any
  element: any
}) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const BlockButton = ({ format, icon }: { format: any; icon: any }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }: { format: any; icon: any }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any
  children: any
  leaf: any
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return (
    <span
      {...attributes}
      {...(leaf.highlight && { 'data-cy': 'search-highlighted' })}
      className={css`
        font-weight: ${leaf.bold && 'bold'};
        background-color: ${leaf.highlight && '#ffeeba'};
      `}
    >
      {children}
    </span>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable {{' },
      { text: 'rich}}', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  //   {
  //     type: 'paragraph',
  //     children: [
  //       {
  //         text: "Since it's rich text, you can do things like turn a {{selection}} of text ",
  //       },
  //       { text: 'bold', bold: true },
  //       {
  //         text: ', or add a semantically rendered block quote in the middle of the page, like this:',
  //       },
  //     ],
  //   },
  //   {
  //     type: 'block-quote',
  //     children: [{ text: 'A wise quote.' }],
  //   },
  //   {
  //     type: 'paragraph',
  //     children: [{ text: 'Try it out for yourself!' }],
  //   },
]

export default SearchHighlightingExample
