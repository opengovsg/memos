import { useMemo } from 'react'
import {
  BiDotsHorizontalRounded,
  BiShareAlt,
  BiShow,
  BiUserPlus,
} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react'

import MemoLogo from '~assets/svgs/logo.svg'
import { DASHBOARD_ROUTE } from '~constants/routes'

export interface NavBarProps {
  /**
   * Minimum form info needed to render the navbar.
   * If not provided, the navbar will be in a loading state.
   */

  handleBackButtonClick: () => void
  handleAddCollabButtonClick: () => void
  handlePreviewFormButtonClick: () => void
  handleShareButtonClick: () => void
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const NavBar = ({
  handleAddCollabButtonClick,
  handleBackButtonClick,
  handlePreviewFormButtonClick,
  handleShareButtonClick,
}: NavBarProps): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const mobileDrawerExtraButtonProps: Partial<ButtonProps> = useMemo(
    () => ({
      isFullWidth: true,
      iconSpacing: '1rem',
      justifyContent: 'flex-start',
      variant: 'clear',
      colorScheme: 'secondary',
      textStyle: 'body-1',
    }),
    [],
  )

  return (
    <Grid
      w="100vw"
      position="sticky"
      top={0}
      flexDir="column"
      templateColumns={{
        base: '1fr',
        lg: 'repeat(2, minmax(0, 1fr))',
      }}
      templateRows="min-content"
      templateAreas={{
        base: `'left right' 'actions actions' 'tabs tabs'`,
        lg: `'left tabs right'`,
      }}
      boxShadow={{ lg: '0 1px 1px var(--chakra-colors-neutral-300)' }}
      bg="white"
      zIndex="docked"
    >
      <GridItem
        display="flex"
        flex={1}
        alignItems="center"
        gridArea="left"
        py="0.625rem"
        pl={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
        pr="1rem"
      >
        <Box>
          <Link to={DASHBOARD_ROUTE}>
            <Image src={MemoLogo}></Image>
          </Link>
        </Box>
      </GridItem>

      <Flex
        py="0.625rem"
        pl="1rem"
        pr={{ base: '1.5rem', md: '1.75rem', lg: '2rem' }}
        flex={1}
        gridArea="right"
        justify="flex-end"
        align="center"
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Form actions"
          onClick={onOpen}
          icon={<BiDotsHorizontalRounded />}
        />
        <Box display={{ base: 'none', md: 'flex' }}>
          <ButtonGroup spacing="0.5rem">
            <IconButton
              aria-label="Add collaborators to form"
              variant="outline"
              onClick={handleAddCollabButtonClick}
              icon={<BiUserPlus />}
            />
            <IconButton
              aria-label="Preview form"
              variant="outline"
              onClick={handlePreviewFormButtonClick}
              icon={<BiShow />}
            />
            <Button onClick={handleShareButtonClick}>Share</Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="0.25rem">
          <DrawerBody px={0} py="0.5rem">
            <ButtonGroup flexDir="column" spacing={0} w="100%">
              <Button
                onClick={handlePreviewFormButtonClick}
                {...mobileDrawerExtraButtonProps}
                leftIcon={<BiShow fontSize="1.25rem" />}
              >
                Preview form
              </Button>
              <Button
                {...mobileDrawerExtraButtonProps}
                onClick={handleShareButtonClick}
                leftIcon={<BiShareAlt fontSize="1.25rem" />}
              >
                Share form link
              </Button>
              <Button
                {...mobileDrawerExtraButtonProps}
                onClick={handleAddCollabButtonClick}
                leftIcon={<BiUserPlus fontSize="1.25rem" />}
              >
                Manage collaborators
              </Button>
            </ButtonGroup>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Grid>
  )
}
