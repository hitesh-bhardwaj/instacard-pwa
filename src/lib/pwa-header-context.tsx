'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type PWAHeaderState = {
  title: string
  exitIcon: boolean
}

type PWAHeaderContextValue = PWAHeaderState & {
  setTitle: (title: string) => void
  setExitIcon: (exitIcon: boolean) => void
  setHeader: (state: Partial<PWAHeaderState>) => void
}

const defaultState: PWAHeaderState = {
  title: 'Manage Cards',
  exitIcon: false,
}

const PWAHeaderContext = createContext<PWAHeaderContextValue | null>(null)

export function PWAHeaderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PWAHeaderState>(defaultState)

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }))
  }, [])

  const setExitIcon = useCallback((exitIcon: boolean) => {
    setState((prev) => ({ ...prev, exitIcon }))
  }, [])

  const setHeader = useCallback((partial: Partial<PWAHeaderState>) => {
    setState((prev) => ({ ...prev, ...partial }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      setTitle,
      setExitIcon,
      setHeader,
    }),
    [state, setTitle, setExitIcon, setHeader]
  )

  return (
    <PWAHeaderContext.Provider value={value}>
      {children}
    </PWAHeaderContext.Provider>
  )
}

export function usePWAHeader() {
  const ctx = useContext(PWAHeaderContext)
  if (!ctx) {
    return {
      ...defaultState,
      setTitle: () => {},
      setExitIcon: () => {},
      setHeader: () => {},
    }
  }
  return ctx
}
