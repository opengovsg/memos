import { ReactElement, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Select,
  Spacer,
} from '@chakra-ui/react'
import { ArrowBack } from '@styled-icons/boxicons-regular'

import { textStyles } from '~theme/textStyles'
import { DASHBOARD_ROUTE } from '~constants/routes'
import { useTemplate } from '~hooks/useTemplate'
import Spinner from '~components/Spinner'

import { CreateMemo, createMemo } from '~features/memos/MemosService'

export const IssueSingleMemoPage = (): ReactElement => {
  const { templateId } = useParams()
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const [uin, setUin] = useState<string>('')
  const [uinType, setUinType] = useState<string>('') // TODO: restrict type
  const [params, setParams] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const navigate = useNavigate()
  const mutation = useMutation((data: CreateMemo) => createMemo(data))
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams({
      ...params,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    // Basic validation
    const form = formRef.current
    if (!form) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    // TODO: handle errors
    if (!template) return

    setIsSubmitting(true)
    const { slug } = await mutation.mutateAsync({
      templateId: template.id,
      versionId: template.version,
      uin,
      uinType,
      params,
    })
    navigate(`/issue/single/success?slug=${slug}`)
  }

  useEffect(() => {
    const paramsFromTemplate = template?.paramsRequired || []
    setParams(Object.fromEntries(paramsFromTemplate.map((p) => [p, ''])))
  }, [template])

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
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                Issue Memo
              </Button>
            </Flex>
          </Box>

          {/* Body */}
          <Grid templateColumns="repeat(4, 1fr)">
            {/* Sidebar */}
            <GridItem
              borderRight="1px solid"
              borderColor="gray.200"
              minH="100vh"
            >
              <Box
                w="100%"
                borderBottom="1px solid"
                borderColor="gray.200"
                p="4"
              >
                <Heading as="h2" {...textStyles['subhead-2']}>
                  FIELDS REQUIRED
                </Heading>
              </Box>

              <form ref={formRef}>
                <Box
                  w="100%"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="4"
                >
                  <Heading {...textStyles['subhead-2']} mb="2">
                    UIN
                  </Heading>
                  <Input
                    value={uin}
                    onChange={(e) => setUin(e.target.value)}
                    placeholder="Enter a NRIC, FIN or Passport Number"
                    required
                    disabled={isSubmitting}
                  />
                </Box>

                <Box
                  w="100%"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="4"
                >
                  <Heading {...textStyles['subhead-2']} mb="2">
                    UIN Type
                  </Heading>
                  <Select
                    placeholder="Choose a UIN type"
                    value={uinType}
                    onChange={(e) => setUinType(e.target.value)}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="NRIC">NRIC</option>
                    <option value="FIN">FIN</option>
                    <option value="Passport number">Passport number</option>
                  </Select>
                </Box>

                {/* Params */}
                {Object.keys(params).map((key) => (
                  <Box
                    w="100%"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    p="4"
                    key={key}
                  >
                    <Heading {...textStyles['subhead-2']} mb="2">
                      {key}
                    </Heading>
                    <Input
                      name={key}
                      value={params[key]}
                      onChange={handleParamsChange}
                      required
                      disabled={isSubmitting}
                    />
                  </Box>
                ))}
              </form>
            </GridItem>

            {/* Content */}
            <GridItem colSpan={3}>{/* TODO preview */}</GridItem>
          </Grid>
        </>
      )}
    </Flex>
  )
}
