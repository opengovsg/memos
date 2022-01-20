import { useParams } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

export const Viewer = (): JSX.Element => {
  const { slug } = useParams()

  return <Container marginTop="2em">{slug}</Container>
}
