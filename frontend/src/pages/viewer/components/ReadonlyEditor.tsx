import { FC } from 'react'
import { Center } from '@chakra-ui/react'

interface ReadonlyEditorProps {
  value: string
}

export const ReadonlyEditor: FC<ReadonlyEditorProps> = ({ value }) => {
  return <Center>Readonly Editor: {value}</Center>
}
