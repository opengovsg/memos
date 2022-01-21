import { useQuery, UseQueryResult } from 'react-query'

import {
  getTemplatesView,
  TemplateMetaResponseDto,
} from '~/pages/dashboard/DashboardService'

const templatesKeys = {
  all: ['templates'] as const,
}

export const useTemplatesDashboard = (): UseQueryResult<
  TemplateMetaResponseDto[]
> => {
  return useQuery(templatesKeys.all, () => getTemplatesView(), {
    staleTime: 5000,
  })
}
