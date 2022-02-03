import './editor.css'

import { ReactElement } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import Underline from '@tiptap/extension-underline'
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
      }),
      Underline,
    ],
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
  })

  const buttons: { text: string; onClick: () => void }[] = [
    {
      text: 'bold',
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      text: 'italic',
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      text: 'underline',
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
  ]

  return (
    <Flex justify="center">
      <Box w="100%" maxW="48em" p="4" border="1px solid #eee">
        {/* Menu */}
        <Box mb="4">
          {buttons.map(({ text, onClick }) => (
            <Button
              size="xs"
              variant={editor?.isActive(text) ? 'solid' : 'outline'}
              mr="1"
              onClick={onClick}
              key={text}
            >
              {text}
            </Button>
          ))}
        </Box>

        {/* Editor */}
        <EditorContent editor={editor} />
      </Box>
    </Flex>
  )
}
