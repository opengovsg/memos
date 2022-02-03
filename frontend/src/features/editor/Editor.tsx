import './editor.css'

import { ReactElement } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Editor = (): ReactElement => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        hardBreak: false,
        horizontalRule: false,
        gapcursor: false,
        heading: {
          levels: [1, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
  })

  const buttons: {
    text: string
    onClick: () => void
    isActiveName: string
    isActiveAttributes?: Record<string, number | string>
  }[] = [
    {
      text: 'bold',
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActiveName: 'bold',
    },
    {
      text: 'italic',
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActiveName: 'italic',
    },
    {
      text: 'underline',
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      isActiveName: 'underline',
    },
    {
      text: 'title',
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActiveName: 'heading',
      isActiveAttributes: { level: 1 },
    },
    {
      text: 'subtitle',
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActiveName: 'heading',
      isActiveAttributes: { level: 3 },
    },
    {
      text: 'bullet',
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActiveName: 'bulletList',
    },
    {
      text: 'list',
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActiveName: 'orderedList',
    },
    {
      text: 'left',
      onClick: () => editor?.chain().focus().setTextAlign('left').run(),
      isActiveName: '',
      isActiveAttributes: { textAlign: 'left' },
    },
    {
      text: 'center',
      onClick: () => editor?.chain().focus().setTextAlign('center').run(),
      isActiveName: '',
      isActiveAttributes: { textAlign: 'center' },
    },
    {
      text: 'right',
      onClick: () => editor?.chain().focus().setTextAlign('right').run(),
      isActiveName: '',
      isActiveAttributes: { textAlign: 'right' },
    },
    {
      text: 'justify',
      onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
      isActiveName: '',
      isActiveAttributes: { textAlign: 'justify' },
    },
  ]

  return (
    <Flex justify="center">
      <Box w="100%" maxW="48em" p="4" border="1px solid #eee">
        {/* Menu */}
        <Box mb="4">
          {buttons.map(
            ({ text, onClick, isActiveName, isActiveAttributes }) => (
              <Button
                size="xs"
                variant={
                  editor?.isActive(isActiveName, isActiveAttributes)
                    ? 'solid'
                    : 'outline'
                }
                mr="1"
                onClick={onClick}
                key={text}
              >
                {text}
              </Button>
            ),
          )}
        </Box>

        {/* Editor */}
        <EditorContent editor={editor} />
      </Box>
    </Flex>
  )
}
