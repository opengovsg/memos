import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

import { PREVIEW_ROUTE } from '~constants/routes'

import { useEditor } from './EditorContext'

export enum DrawerTabs {
  Preview,
}

type BuilderDrawerContextProps = {
  activeTab: DrawerTabs | null
  isShowDrawer: boolean
  handleClose: (clearActiveTab?: boolean) => void
  handlePreviewClick: () => void
}

const BuilderDrawerContext = createContext<
  BuilderDrawerContextProps | undefined
>(undefined)

/**
 * Provider component that makes drawer context object available to any
 * child component that calls `useBuilderDrawer()`.
 */
export const BuilderDrawerProvider: FC = ({ children }) => {
  const context = useProvideDrawerContext()

  return (
    <BuilderDrawerContext.Provider value={context}>
      {children}
    </BuilderDrawerContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useBuilderDrawer = (): BuilderDrawerContextProps => {
  const context = useContext(BuilderDrawerContext)
  if (!context) {
    throw new Error(
      `useBuilderDrawer must be used within a BuilderDrawerProvider component`,
    )
  }
  return context
}

const useProvideDrawerContext = (): BuilderDrawerContextProps => {
  const { pathname } = useLocation()
  const { setIsPreview } = useEditor()
  const [activeTab, setActiveTab] = useState<DrawerTabs | null>(null)

  const isShowDrawer = useMemo(() => activeTab !== null, [activeTab])

  const handleClose = useCallback((clearActiveTab = true) => {
    if (clearActiveTab) {
      setActiveTab(null)
    }
  }, [])

  const handlePreviewClick = useCallback(() => {
    if (activeTab !== DrawerTabs.Preview) {
      setActiveTab(DrawerTabs.Preview)
      setIsPreview(true)
    } else {
      setIsPreview(false)
      handleClose()
    }
  }, [activeTab, handleClose, setIsPreview])

  useEffect(() => {
    if (pathname.startsWith(PREVIEW_ROUTE)) {
      setActiveTab(DrawerTabs.Preview)
      setIsPreview(true)
    }
  }, [pathname, setIsPreview])
  return {
    activeTab,
    isShowDrawer,
    handleClose,
    handlePreviewClick,
  }
}
