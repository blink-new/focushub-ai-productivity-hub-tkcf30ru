import React from 'react'
import { InboxView } from '@/components/views/InboxView'
import { WorkspaceView } from '@/components/views/WorkspaceView'
import { TasksView } from '@/components/views/TasksView'
import { CalendarView } from '@/components/views/CalendarView'
import { SettingsView } from '@/components/views/SettingsView'

type ViewType = 'inbox' | 'workspace' | 'tasks' | 'calendar' | 'settings'
type WorkspaceTab = 'overview' | 'email' | 'tasks' | 'docs' | 'events' | 'people'

interface MainContentProps {
  currentView: ViewType
  selectedWorkspace: string
  workspaceTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
}

export function MainContent({ currentView, selectedWorkspace, workspaceTab, onTabChange }: MainContentProps) {
  const renderView = () => {
    switch (currentView) {
      case 'inbox':
        return <InboxView />
      case 'workspace':
        return (
          <WorkspaceView
            workspaceId={selectedWorkspace}
            activeTab={workspaceTab}
            onTabChange={onTabChange}
          />
        )
      case 'tasks':
        return <TasksView />
      case 'calendar':
        return <CalendarView />
      case 'settings':
        return <SettingsView />
      default:
        return <InboxView />
    }
  }

  return (
    <div className="flex-1 bg-gray-50">
      {renderView()}
    </div>
  )
}