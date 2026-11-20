import { useCallback, useEffect, useState } from 'react'

import type { Theme } from '../utils'

import { DEFAULT_THEME, THEME_KEY } from '../utils'

// index.html already applied the saved theme to <html>, so read it from there
const getInitialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : DEFAULT_THEME

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // storage blocked (private mode): the theme just won't persist
    }
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, toggleTheme }
}
