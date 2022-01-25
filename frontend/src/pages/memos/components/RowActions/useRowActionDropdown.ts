import { useNavigate } from 'react-router-dom'

type UseRowActionDropdownReturn = {
  handleViewMemo: () => void
  handleCopyWeblink: () => void
  handleDownloadCsv: () => void
  handleVoidMemo: () => void
}

export const useRowActionDropdown = (
  memoId: number,
  slug: string,
): UseRowActionDropdownReturn => {
  const navigate = useNavigate()
  return {
    handleViewMemo: () => navigate(`/p/${slug}`),
    handleCopyWeblink: () =>
      console.log(`copy weblink button clicked for memo id: ${memoId}`),
    handleDownloadCsv: () =>
      console.log(`download csv button clicked for memo id: ${memoId}`),
    handleVoidMemo: () =>
      console.log(`void memo button clicked for memo id: ${memoId}`),
  }
}
