import { useMemo } from 'react'
import {
  Box,
  ButtonProps,
  chakra,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

import { GetTemplateMetaResponseDto } from '~/pages/templates/TemplatesPage'

import { useRowActionDropdown } from './RowActions/useRowActionDropdown'
import { RowActions } from './RowActions'

export interface TemplateRowProps extends ButtonProps {
  templateMeta: GetTemplateMetaResponseDto
}

const RELATIVE_DATE_FORMAT = {
  sameDay: '[today,] D MMM h:mma', // today, 16 Jun 9:30am
  nextDay: '[tomorrow,] D MMM h:mma', // tomorrow, 16 Jun 9:30am
  lastDay: '[yesterday,] D MMM h:mma', // yesterday, 16 Jun 9:30am
  nextWeek: 'ddd, D MMM YYYY h:mma', // Tue, 17 Oct 2021 9:30pm
  lastWeek: 'ddd, D MMM YYYY h:mma', // Tue, 17 Oct 2021 9:30pm
  sameElse: 'D MMM YYYY h:mma', // 6 Oct 2021 9:30pm
}

export const TemplateRow = ({
  templateMeta,
  ...buttonProps
}: TemplateRowProps): JSX.Element => {
  const prettyLastModified = useMemo(() => {
    return dayjs(templateMeta.updatedAt).calendar(null, RELATIVE_DATE_FORMAT)
  }, [templateMeta.updatedAt])

  const { handleEditTemplate } = useRowActionDropdown(templateMeta.id)

  const isTruncated = useBreakpointValue({
    base: false,
    md: true,
  })

  return (
    <Box pos="relative">
      <chakra.button
        transitionProperty="common"
        transitionDuration="normal"
        onClick={handleEditTemplate}
        w="100%"
        py="1.5rem"
        display="grid"
        justifyContent="space-between"
        gridTemplateColumns={{
          base: '1fr 2.75rem',
          md: '1fr min-content 8rem',
        }}
        gridTemplateRows={{ base: 'auto 2.75rem', md: 'auto' }}
        gridTemplateAreas={{
          base: "'title title' 'status actions'",
          md: "'title status actions'",
        }}
        gridGap={{ base: '0.5rem', md: '1.5rem' }}
        _hover={{
          bg: 'primary.100',
        }}
        _active={{
          bg: 'primary.200',
        }}
        _focus={{
          boxShadow: '0 0 0 2px var(--chakra-colors-primary-500)',
        }}
        {...buttonProps}
      >
        <Flex flexDir="column" gridArea="title" textAlign="initial">
          <Text
            isTruncated={isTruncated}
            title={templateMeta.name}
            textStyle="subhead-1"
            color="secondary.700"
          >
            {templateMeta.name}
          </Text>
          <Text textStyle="body-2" color="secondary.400">
            Edited {prettyLastModified}
          </Text>
        </Flex>
        <Box gridArea="status" alignSelf="center">
          {/*Issued X times*/}
        </Box>
        {/* Blank spacing for absolutely positioned RowActions component */}
        <Box gridArea="actions" />
      </chakra.button>
      <RowActions templateId={templateMeta.id} />
    </Box>
  )
}
