import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'
import { FocusTimer } from '@/components/FocusTimer'
import { CommandPalette } from '@/components/CommandPalette'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export type ViewType = 'inbox' | 'workspace' | 'tasks' | 'calendar' | 'settings'
export type WorkspaceTab = 'overview' | 'email' | 'tasks' | 'docs' | 'events' | 'people'

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('inbox')
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('acme-corp')
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>('overview')
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [timerState, setTimerState] = useState<'hidden' | 'mini' | 'panel'>('mini')

  useKeyboardShortcuts({
    onCommandOpen: () => setIsCommandOpen(true),
    onViewChange: setCurrentView,
  })

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceSelect={setSelectedWorkspace}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <MainContent
          currentView={currentView}
          selectedWorkspace={selectedWorkspace}
          workspaceTab={workspaceTab}
          onTabChange={setWorkspaceTab}
        />
      </div>

      {/* Focus Timer */}
      <FocusTimer
        state={timerState}
        onStateChange={setTimerState}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(view) => {
          setCurrentView(view)
          setIsCommandOpen(false)
        }}
      />
    </div>
  )
}

export default App