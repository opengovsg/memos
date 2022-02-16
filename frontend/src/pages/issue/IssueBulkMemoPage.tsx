import { ReactElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Spacer,
} from '@chakra-ui/react'
import { ArrowBack } from '@styled-icons/boxicons-regular'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'
import Attachment from '~components/Field/Attachment'
import Spinner from '~components/Spinner'

import { ReadonlyEditor } from '~pages/viewer/components/ReadonlyEditor'

export const IssueBulkMemoPage = (): ReactElement => {
  const { templateId } = useParams()
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const navigate = useNavigate()
  // TODO: Directly use state provided by useMutation
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File>()
  // TODO: Error handling, we should standardize.
  const [errorMessage, setErrorMessage] = useState('')

  const onFileAccepted = async (file?: File) => {
    setErrorMessage('')
    setSelectedFile(file)
    // Validate CSV here
  }

  const handleSubmit = async () => {
    // TODO: handle errors
    if (!template) return

    setIsSubmitting(true)
    // Navigate away for now
    navigate(DASHBOARD_ROUTE)
  }

  return (
    <Flex
      flexDir="column"
      height="100vh"
      overflow="hidden"
      pos="relative"
      color="gray.600"
    >
      {isLoading && <Spinner />}
      {isError && <p>error</p>}
      {template && (
        <>
          {/* Header */}
          <Box p="4" borderBottom="1px solid" borderColor="gray.200">
            <Flex alignItems="center">
              <Link to={DASHBOARD_ROUTE}>
                <Icon as={ArrowBack} />
              </Link>
              <Heading as="h1" {...textStyles.h4} ml="4">
                {template.name}
              </Heading>
              <Spacer />
              <Button
                onClick={handleSubmit}
                disabled={!selectedFile}
                isLoading={isSubmitting}
              >
                Generate
              </Button>
            </Flex>
          </Box>

          {/* Body */}
          <Grid
            templateColumns="repeat(4, 1fr)"
            width="100%"
            height="calc(100% - 77px)" // TODO fix this
          >
            {/* Sidebar */}
            <GridItem
              borderRight="1px solid"
              borderColor="gray.200"
              overflowY="scroll"
              colSpan={{ base: 4, lg: 1 }}
            >
              <Box
                w="100%"
                borderBottom="1px solid"
                borderColor="gray.200"
                p="4"
              >
                <Heading as="h2" {...textStyles['subhead-2']}>
                  UPLOAD CSV
                </Heading>
              </Box>
              <Box w="100%" p="4">
                <Attachment
                  name="CSV"
                  accept=".csv"
                  maxSize={20 * 1000 * 1000} // 20 MB
                  showFileSize={true}
                  onChange={onFileAccepted}
                  onError={setErrorMessage}
                />
                {errorMessage && (
                  <Alert status="error">
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                )}
              </Box>
            </GridItem>

            {/* Content */}
            <GridItem colSpan={{ base: 4, lg: 3 }} overflowY="scroll">
              <Box w="100%" maxW="48em" margin="0 auto" p="8" shadow="md">
                {/** TODO: Preview the first row? */}
                <ReadonlyEditor value={template.body[0].data} />
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Flex>
  )
}
