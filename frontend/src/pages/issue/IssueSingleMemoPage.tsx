import { ReactElement, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

export const IssueSingleMemoPage = (): ReactElement => {
  const { templateId } = useParams()
  const { isLoading, isError, data: template } = useTemplate(Number(templateId))

  const [uin, setUin] = useState<string>('')
  const [uinType, setUinType] = useState<string>('') // TODO: restrict type
  const [params, setParams] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const handleParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setParams({
      ...params,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    formRef.current?.reportValidity()
    // TODO submit
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
              <Button onClick={handleSubmit}>Issue Memo</Button>
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
