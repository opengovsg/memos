import { ReactElement } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Download } from '@styled-icons/boxicons-regular'
import { Close } from '@styled-icons/material'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'

export const IssueMemoSampleCsvPage = (): ReactElement => {
  const navigate = useNavigate()
  const { templateId } = useParams()

  // Verify that the template exists
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const handleContinueClick = () => {
    navigate(DASHBOARD_ROUTE)
    // navigate(`/issue/${templateId}/bulk`)
  }

  return (
    <Box w="100%" maxW="48em" margin="0 auto" textAlign="center" py="32" px="8">
      {isLoading && <Spinner />}
      {isError && <Navigate to={DASHBOARD_ROUTE} />}
      {template && (
        <Box color="gray.600">
          <Heading as="h1" {...textStyles.h2} mb="1">
            Bulk Generate Memos
          </Heading>
          <Text mb="16">
            Download the CSV below, fill in the required fields and upload it
            again in the next page.
          </Text>

          <Center w="100%" bg="gray.50" p="4" mb="16">
            <VStack spacing="4">
              <Icon as={Download} w="12" h="12" />
              <Text>Download the CSV and fill in the required fields</Text>
              <Button variant="outline">Download CSV</Button>
            </VStack>
          </Center>

          <Button isFullWidth onClick={handleContinueClick}>
            Continue
          </Button>

          <Link to={`/issue/${templateId}`}>
            <Icon
              as={Close}
              w="8"
              h="auto"
              color="gray.400"
              position="absolute"
              top="4"
              right="4"
            />
          </Link>
        </Box>
      )}
    </Box>
  )
}
