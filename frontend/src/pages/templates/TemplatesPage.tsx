import { useRef } from 'react'
import { Box, Container, Flex, Grid } from '@chakra-ui/react'

import { TemplateHeader } from './components/TemplateHeader'
import { TemplateRows } from './components/TemplateRows'

export class GetTemplateMetaResponseDto {
  id!: number
  status!: string
  author!: number
  editor!: number

  name!: string
  updatedAt!: Date
}

export const CONTAINER_MAXW = '120rem'
const PAGE_DEFAULTS = {
  size: 20,
  pageNumber: 1,
}

//placeholders
const isLoading = false
const paginatedData = [
  {
    id: 2,
    status: 'PUBLIC',
    author: 1,
    editor: 1,

    name: 'Test Template',
    updatedAt: new Date(),
  },
]

export const TemplatesPage = (): JSX.Element => {
  const topRef = useRef<HTMLDivElement>(null)
  return (
    <Grid
      flex={1}
      bg="neutral.100"
      templateColumns="1fr"
      templateRows="auto 1fr auto"
      minH="100vh" // Minus the nav bar
      templateAreas="'header' 'main' 'footer'"
    >
      <Container
        gridArea="header"
        maxW={CONTAINER_MAXW}
        borderBottom="1px solid var(--chakra-colors-neutral-300)"
        px="2rem"
        py="1rem"
      >
        <TemplateHeader isLoading={isLoading} />
      </Container>
      <Box gridArea="main">
        <Box ref={topRef} />
        <TemplateRows rows={paginatedData} isLoading={isLoading} />
      </Box>
      <Container
        gridArea="footer"
        py={{ base: '1rem', md: '3rem' }}
        px="2rem"
        maxW={CONTAINER_MAXW}
        borderTop="1px solid var(--chakra-colors-neutral-300)"
      >
        {/* <Pagination
          isDisabled={isLoading}
          currentPage={currentPage}
          totalCount={totalTemplateCount ?? 0}
          onPageChange={setPageNumber}
          pageSize={PAGE_DEFAULTS.size}
        /> */}
      </Container>
    </Grid>
  )
}
