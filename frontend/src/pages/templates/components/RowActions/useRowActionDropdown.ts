import { useNavigate } from 'react-router-dom'

import { BUILDER_ROUTE, PREVIEW_ROUTE } from '~constants/routes'

type UseRowActionDropdownReturn = {
  handleUseTemplate: () => void
  handleEditTemplate: () => void
  handlePreviewTemplate: () => void
  handleDeleteTemplate: () => void
}

export const useRowActionDropdown = (
  templateId: number,
): UseRowActionDropdownReturn => {
  const navigate = useNavigate()
  return {
    handleUseTemplate: () =>
      console.log(`use button clicked for template id: ${templateId}`),
    handleEditTemplate: () => navigate(`${BUILDER_ROUTE}/${templateId}`),
    handlePreviewTemplate: () => navigate(`${PREVIEW_ROUTE}/${templateId}`),
    handleDeleteTemplate: () =>
      console.log(
        `delete template button clicked for template id: ${templateId}`,
      ),
  }
}
