import { useEffect } from 'react'

type ViewType = 'inbox' | 'workspace' | 'tasks' | 'calendar' | 'settings'

interface UseKeyboardShortcutsProps {
  onCommandOpen: () => void
  onViewChange: (view: ViewType) => void
}

export function useKeyboardShortcuts({ onCommandOpen, onViewChange }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command palette
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        onCommandOpen()
        return
      }

      // Navigation shortcuts (when not in input fields)
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key) {
        case '1':
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            onViewChange('inbox')
          }
          break
        case '2':
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            onViewChange('tasks')
          }
          break
        case '3':
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            onViewChange('calendar')
          }
          break
        case 'i':
          if (!event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault()
            onViewChange('inbox')
          }
          break
        case 't':
          if (!event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault()
            onViewChange('tasks')
          }
          break
        case 'c':
          if (!event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault()
            onViewChange('calendar')
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCommandOpen, onViewChange])
}