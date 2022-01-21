import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'

import { getMemo } from '~features/memos/MemosService'

import { ReadonlyEditor } from './components/ReadonlyEditor'

export const Viewer = (): JSX.Element => {
  const { slug } = useParams()
  const {
    isLoading,
    isError,
    data: memo,
  } = useQuery(['memo', slug], () => getMemo(slug as string), {
    enabled: !!slug, // only fetch if slug is defined, TODO?
  })

  return (
    <Box bgColor="#f9f9f9" paddingY="4em" minH="100vh">
      <Container bgColor="white" padding="2em" w="100%" maxW="800px">
        {isLoading ? (
          'loading...'
        ) : isError || !memo ? (
          'dead'
        ) : (
          <ReadonlyEditor value={memo.body[0].data} />
        )}
      </Container>
    </Box>
  )
}
