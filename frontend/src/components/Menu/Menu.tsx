/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import {
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuItem as ChakraMenuItem,
  MenuList as ChakraMenuList,
  MenuProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import Button, { ButtonProps } from '~components/Button'

type MenuVariant = 'outline' | 'clear'

export interface MenuButtonProps extends Omit<ButtonProps, 'isFullWidth'> {
  variant?: MenuVariant
  isStretch?: boolean
  isOpen?: boolean
  focusItemBorderColor?: string
}

/**
 * @preconditions Must be a child of Menu component,
 * and returned using a render prop (see implementation in Menu.stories).
 */
const MenuButton = ({
  isOpen,
  variant = 'outline',
  colorScheme = 'secondary',
  focusItemBorderColor,
  isStretch,
  ...props
}: MenuButtonProps): JSX.Element => {
  const ChevronIcon = useMemo(
    () =>
      isOpen ? (
        <BiChevronUp fontSize="1.25rem" />
      ) : (
        <BiChevronDown fontSize="1.25rem" />
      ),
    [isOpen],
  )
  const style = useMultiStyleConfig('Menu', {
    ...props,
    variant,
    colorScheme,
    isStretch,
    focusItemBorderColor,
  })

  return (
    <ChakraMenuButton
      as={Button}
      colorScheme={colorScheme}
      variant={variant}
      rightIcon={ChevronIcon}
      justifyContent="space-between"
      iconSpacing="1.5rem"
      sx={style.button}
      {...props}
    />
  )
}

/**
 * @preconditions Must be a child of Menu component
 * after MenuButton, and returned using a render prop
 * (see implementation in Menu.stories).
 *
 * Used to wrap MenuItem component
 */
const MenuList = ChakraMenuList

/**
 * Item in MenuList
 */
const MenuItem = ChakraMenuItem

/**
 * Used to wrap MenuButton, MenuItem and MenuList components
 */
export const Menu = (props: MenuProps): JSX.Element => {
  return <ChakraMenu matchWidth={true} gutter={4} {...props} />
}

Menu.Button = MenuButton
Menu.List = MenuList
Menu.Item = MenuItem
