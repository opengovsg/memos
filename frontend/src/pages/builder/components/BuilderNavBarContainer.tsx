import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { DASHBOARD_ROUTE } from '~constants/routes'

import { useEditor } from '~features/builder/EditorContext'

import { BuilderNavBar } from './BuilderNavBar'

const useBuilderNavBar = () => {
  const navigate = useNavigate()
  const { saveTemplate } = useEditor()

  const handleBackToDashboard = useCallback(
    (): void => navigate(DASHBOARD_ROUTE),
    [navigate],
  )

  const handleAddCollaborator = useCallback((): void => {
    console.log('add collab button clicked')
  }, [])

  const handleSaveTemplate = async () => {
    console.log('save template button clicked')
    return saveTemplate()
  }

  return {
    handleBackToDashboard,
    handleAddCollaborator,
    handleSaveTemplate,
  }
}

/**
 * @precondition Must have AdminFormTabProvider parent due to usage of TabList and Tab.
 */
export const BuilderNavBarContainer = (): JSX.Element => {
  const { handleBackToDashboard, handleAddCollaborator, handleSaveTemplate } =
    useBuilderNavBar()

  return (
    <BuilderNavBar
      handleBackButtonClick={handleBackToDashboard}
      handleAddCollabButtonClick={handleAddCollaborator}
      handleSaveTemplateClick={handleSaveTemplate}
    />
  )
}
