'use client'

import {
  ArrowRight,
  ChevronRight,
  HelpCircle,
  LogOut,
  Moon,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageDropdown } from './LanguageDropdown'

interface ProfileContentProps {
  userName?: string
  onClose: () => void
}

export function ProfileContent({
  userName = 'User',
  onClose,
}: ProfileContentProps) {
  const { i18n } = useTranslation()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const selectedLang = i18n.language?.split('-')[0] ?? 'en'

  // Initialize dark mode state from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex-1 flex flex-col bg-card-background overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-6 pb-5 shrink-0 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 -m-2 rounded-full text-text-primary hover:bg-light-gray transition-colors"
          aria-label="Close"
        >
          <ArrowRight className="w-7 h-7" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex flex-col items-center mt-8 mb-8">
          <div className="w-[200px] h-[200px] rounded-[40px] bg-shadow flex items-center justify-center mb-3">
            <span className="text-[28px] font-bold text-text-on-primary">
              {initials}
            </span>
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {userName}
          </p>
          <p className="text-sm text-text-secondary">user@example.com</p>
        </div>

        <nav className="rounded-2xl overflow-hidden ">
          <MenuRow
            icon={<User className="w-5 h-5 text-primary" />}
            label="Profile settings"
            onPress={() => {}}
          />
          <LanguageDropdown
            selectedLang={selectedLang}
            onSelect={() => {}}
            isDarkMode={isDarkMode}
          />
          <MenuRow
            icon={<Moon className="w-5 h-5 text-primary" />}
            label="Dark mode"
            onPress={toggleDarkMode}
            showChevron={false}
            rightElement={
              <button
                type="button"
                role="switch"
                aria-checked={isDarkMode}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleDarkMode()
                }}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-primary' : 'bg-light-gray'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    isDarkMode ? 'left-1 translate-x-5' : 'left-1'
                  }`}
                />
              </button>
            }
          />
          <MenuRow
            icon={<HelpCircle className="w-5 h-5 text-primary" />}
            label="Help & support"
            onPress={() => {}}
          />
          <MenuRow
            icon={<LogOut className="w-5 h-5 text-error" />}
            label="Sign out"
            showChevron={false}
            onPress={onClose}
            danger
          />
        </nav>

        <p className="text-center text-xs text-text-secondary mt-8">
          Version 1.0.0
        </p>
      </div>
    </div>
  )
}

interface MenuRowProps {
  icon: React.ReactNode
  label: string
  onPress: () => void
  rightElement?: React.ReactNode
  danger?: boolean
  showChevron?: boolean
}

function MenuRow({
  icon,
  label,
  onPress,
  rightElement,
  danger,
  showChevron = true,
}: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center gap-3 w-full py-4 px-4 text-left transition-colors"
    >
      <span
        className={`flex items-center justify-center w-9 h-9 rounded-[10px] ${
          danger ? 'bg-error/10' : 'bg-light-gray'
        }`}
      >
        {icon}
      </span>
      <span
        className={`flex-1 text-[15px] font-medium ${
          danger ? 'text-error' : 'text-text-primary'
        }`}
      >
        {label}
      </span>
      {rightElement}
      {showChevron && <ChevronRight className="w-[18px] h-[18px] text-text-secondary" />}
    </button>
  )
}
