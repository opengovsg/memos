import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

import { getMemo } from '~features/memos/MemosService'

export const Viewer = (): JSX.Element => {
  const { slug } = useParams()
  const {
    isLoading,
    isError,
    data: memo,
  } = useQuery(['memo', slug], () => getMemo(slug as string), {
    enabled: !!slug, // only fetch if slug is defined
  })

  return (
    <Container marginTop="2em">
      <pre>
        {isLoading
          ? 'loading...'
          : isError || !memo
          ? 'dead'
          : JSON.stringify(memo.body, null, 2)}
      </pre>
    </Container>
  )
}
