'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'
import { useTheme } from '..'
import { Theme, themeLocalStorageKey } from './types'
import classes from './index.module.scss'

const themeIcons = {
  light: <Sun size={20} />,
  dark: <Moon size={20} />,
  auto: <Laptop size={20} />,
}

const applyVisualTheme = (theme: Theme | 'auto') => {
  if (theme === 'auto') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [show, setShow] = useState(false)
  const [localTheme, setLocalTheme] = useState<Theme | 'auto'>('auto')

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey) as Theme | 'auto' | null
    const initialTheme = preference ?? 'auto'
    setLocalTheme(initialTheme)
    setTheme(initialTheme)
    applyVisualTheme(initialTheme)
    setShow(true)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent) => {
      const current = window.localStorage.getItem(themeLocalStorageKey)
      if (current === 'auto') {
        applyVisualTheme('auto')
      }
    }
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  const handleClick = () => {
    const themes: (Theme | 'auto')[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(localTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setLocalTheme(nextTheme)
    window.localStorage.setItem(themeLocalStorageKey, nextTheme)
    applyVisualTheme(nextTheme)
  }

  return (
    <div className={[classes.selectContainer, !show && classes.hidden].filter(Boolean).join(' ')}>
      <label htmlFor="theme">
        <button
          onClick={handleClick}
          className={classes.themeButton}
          aria-label={`Thema wisselen (huidig: ${localTheme})`}
          title={`Wissel naar ${
            localTheme === 'light' ? 'donker' : localTheme === 'dark' ? 'auto' : 'licht'
          } thema`}
        >
          {themeIcons[localTheme]}
        </button>
      </label>
    </div>
  )
}
