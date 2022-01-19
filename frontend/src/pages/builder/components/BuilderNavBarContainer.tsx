import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { TEMPLATES_ROUTE } from '~constants/routes'

import { BuilderNavBar } from './BuilderNavBar'

const useBuilderNavBar = () => {
  const navigate = useNavigate()

  const handleBackToDashboard = useCallback(
    (): void => navigate(TEMPLATES_ROUTE),
    [navigate],
  )

  const handleAddCollaborator = useCallback((): void => {
    console.log('add collab button clicked')
  }, [])

  const handleSaveTemplate = useCallback((): void => {
    console.log('save template button clicked')
  }, [])

  const handleCreateMemo = useCallback((): void => {
    console.log('create memo button clicked')
  }, [])

  return {
    handleBackToDashboard,
    handleAddCollaborator,
    handleCreateMemo,
    handleSaveTemplate,
  }
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const BuilderNavBarContainer = (): JSX.Element => {
  const {
    handleBackToDashboard,
    handleAddCollaborator,
    handleCreateMemo,
    handleSaveTemplate,
  } = useBuilderNavBar()

  return (
    <BuilderNavBar
      handleBackButtonClick={handleBackToDashboard}
      handleAddCollabButtonClick={handleAddCollaborator}
      handleCreateMemoClick={handleCreateMemo}
      handleSaveTemplateClick={handleSaveTemplate}
    />
  )
}
