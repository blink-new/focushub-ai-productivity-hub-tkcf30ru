import React from 'react'
import { motion } from 'framer-motion'
import { 
  Inbox, 
  Calendar, 
  CheckSquare, 
  Settings, 
  Briefcase,
  Plus,
  Star,
  Building2,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type ViewType = 'inbox' | 'workspace' | 'tasks' | 'calendar' | 'settings'

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  selectedWorkspace: string
  onWorkspaceSelect: (workspace: string) => void
}

const workspaces = [
  { id: 'acme-corp', name: 'Acme Corp', icon: Building2, color: 'bg-blue-500', unread: 3 },
  { id: 'startup-x', name: 'Startup X', icon: Star, color: 'bg-purple-500', unread: 0 },
  { id: 'freelance', name: 'Freelance', icon: Users, color: 'bg-green-500', unread: 7 },
]

const navigationItems = [
  { id: 'inbox' as ViewType, icon: Inbox, label: 'Inbox', badge: 12 },
  { id: 'tasks' as ViewType, icon: CheckSquare, label: 'Tasks', badge: 5 },
  { id: 'calendar' as ViewType, icon: Calendar, label: 'Calendar' },
  { id: 'settings' as ViewType, icon: Settings, label: 'Settings' },
]

export function Sidebar({ currentView, onViewChange, selectedWorkspace, onWorkspaceSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">FocusHub</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                currentView === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </motion.button>
          ))}
        </div>

        <Separator className="mx-4" />

        {/* Workspaces */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Workspaces
            </h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {workspaces.map((workspace) => (
              <motion.button
                key={workspace.id}
                onClick={() => {
                  onWorkspaceSelect(workspace.id)
                  onViewChange('workspace')
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                  selectedWorkspace === workspace.id && currentView === 'workspace'
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn("w-5 h-5 rounded flex items-center justify-center", workspace.color)}>
                    <workspace.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="truncate">{workspace.name}</span>
                </div>
                {workspace.unread > 0 && (
                  <Badge variant="default" className="h-5 px-1.5 text-xs bg-blue-500">
                    {workspace.unread}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}