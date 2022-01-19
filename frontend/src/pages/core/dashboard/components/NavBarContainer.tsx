import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { TEMPLATES_ROUTE } from '~constants/routes'

import { NavBar } from './NavBar'

const useBuilderNavBar = () => {
  const navigate = useNavigate()

  const handleBackToDashboard = useCallback(
    (): void => navigate(TEMPLATES_ROUTE),
    [navigate],
  )

  const handleAddCollaborator = useCallback((): void => {
    console.log('add collab button clicked')
  }, [])

  const handlePreviewForm = useCallback((): void => {
    console.log('preview form button clicked')
  }, [])

  const handleShareForm = useCallback((): void => {
    console.log('share form button clicked')
  }, [])

  return {
    handleBackToDashboard,
    handleAddCollaborator,
    handlePreviewForm,
    handleShareForm,
  }
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const NavBarContainer = (): JSX.Element => {
  const {
    handleBackToDashboard,
    handleAddCollaborator,
    handlePreviewForm,
    handleShareForm,
  } = useBuilderNavBar()

  return (
    <NavBar
      handleBackButtonClick={handleBackToDashboard}
      handleAddCollabButtonClick={handleAddCollaborator}
      handlePreviewFormButtonClick={handlePreviewForm}
      handleShareButtonClick={handleShareForm}
    />
  )
}
