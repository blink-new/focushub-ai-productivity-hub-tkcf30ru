import React, { useState } from 'react'
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
  Users,
  Search,
  Filter,
  Archive,
  Play
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Card } from './components/ui/card'

function App() {
  const [currentView, setCurrentView] = useState('inbox')
  const [timerState] = useState<'hidden' | 'mini' | 'panel'>('mini')

  const workspaces = [
    { id: 'acme-corp', name: 'Acme Corp', icon: Building2, color: 'bg-blue-500', unread: 3 },
    { id: 'startup-x', name: 'Startup X', icon: Star, color: 'bg-purple-500', unread: 0 },
    { id: 'freelance', name: 'Freelance', icon: Users, color: 'bg-green-500', unread: 7 },
  ]

  const navigationItems = [
    { id: 'inbox', icon: Inbox, label: 'Inbox', badge: 12 },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks', badge: 5 },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
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
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
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

          <div className="h-px bg-gray-200 mx-4" />

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
                  onClick={() => setCurrentView('workspace')}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${workspace.color}`}>
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

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {currentView === 'inbox' ? (
          <div className="h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Priority Emails</h3>
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-xs text-blue-600 mt-1">Need attention</p>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Tasks Due</h3>
                  <p className="text-2xl font-bold text-green-900">5</p>
                  <p className="text-xs text-green-600 mt-1">This week</p>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Focus Time</h3>
                  <p className="text-2xl font-bold text-purple-900">2.5h</p>
                  <p className="text-xs text-purple-600 mt-1">Today</p>
                </Card>
              </div>

              <div className="text-center py-12">
                <Inbox className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to FocusHub</h3>
                <p className="text-gray-500 mb-4">Your AI-powered productivity hub for managing emails, tasks, and focus time</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Your Email
                </Button>
              </div>
            </div>
          </div>
        ) : currentView === 'workspace' ? (
          <div className="h-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Acme Corp</h1>
                  <p className="text-gray-600">Enterprise client workspace</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Overview</h3>
                <p className="text-gray-500">Unified view of all Acme Corp communications and tasks</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Settings className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{currentView}</h3>
              <p className="text-gray-500">Coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Focus Timer */}
      {timerState !== 'hidden' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="fixed top-6 right-6 z-50"
        >
          <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * 0.7}`}
                    className="text-blue-500 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Review Acme proposal
                </p>
                <p className="text-lg font-mono text-blue-600">
                  18:30
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default App