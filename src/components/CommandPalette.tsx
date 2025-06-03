import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Inbox, Calendar, CheckSquare, Settings, Briefcase } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ViewType = 'inbox' | 'workspace' | 'tasks' | 'calendar' | 'settings'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (view: ViewType) => void
}

const commands = [
  { id: 'inbox', icon: Inbox, label: 'Go to Inbox', description: 'View your email inbox', action: 'inbox' as ViewType },
  { id: 'tasks', icon: CheckSquare, label: 'Go to Tasks', description: 'Manage your tasks', action: 'tasks' as ViewType },
  { id: 'calendar', icon: Calendar, label: 'Go to Calendar', description: 'View your calendar', action: 'calendar' as ViewType },
  { id: 'settings', icon: Settings, label: 'Open Settings', description: 'Configure your preferences', action: 'settings' as ViewType },
  { id: 'workspace', icon: Briefcase, label: 'Go to Workspace', description: 'Switch to workspace view', action: 'workspace' as ViewType },
]

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands.filter(command =>
    command.label.toLowerCase().includes(search.toLowerCase()) ||
    command.description.toLowerCase().includes(search.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        onNavigate(filteredCommands[selectedIndex].action)
      }
    }
  }

  const handleCommandClick = (action: ViewType) => {
    onNavigate(action)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-lg">
        <div className="flex items-center border-b border-gray-200 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands..."
            className="border-0 bg-transparent text-lg placeholder:text-gray-500 focus:ring-0"
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No commands found
              </div>
            ) : (
              filteredCommands.map((command, index) => (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer border-l-2 transition-colors",
                    index === selectedIndex
                      ? "bg-blue-50 border-blue-500"
                      : "border-transparent hover:bg-gray-50"
                  )}
                  onClick={() => handleCommandClick(command.action)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <command.icon className="h-5 w-5 text-gray-600 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{command.label}</p>
                    <p className="text-sm text-gray-500">{command.description}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center text-xs text-gray-500">
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">↑↓</kbd>
            <span className="mx-2">navigate</span>
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Enter</kbd>
            <span className="mx-2">select</span>
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Esc</kbd>
            <span className="mx-2">close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}