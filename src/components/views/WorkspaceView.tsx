import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Mail, CheckSquare, FileText, Calendar, Users, MessageSquare, Bot } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type WorkspaceTab = 'overview' | 'email' | 'tasks' | 'docs' | 'events' | 'people'

interface WorkspaceViewProps {
  workspaceId: string
  activeTab: WorkspaceTab
  onTabChange: (tab: WorkspaceTab) => void
}

const workspaceData = {
  'acme-corp': {
    name: 'Acme Corp',
    description: 'Enterprise client - Software development project',
    color: 'bg-blue-500',
    icon: Building2,
    stats: {
      emails: 12,
      tasks: 8,
      docs: 5,
      events: 3,
      people: 4
    },
    recentActivity: [
      { type: 'email', content: 'New email from Sarah Connor about Q4 review', time: '2 min ago' },
      { type: 'task', content: 'Completed "Review project proposal"', time: '1 hour ago' },
      { type: 'doc', content: 'Updated "Technical Specifications v2.1"', time: '3 hours ago' },
    ]
  }
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'email', label: 'Email', icon: Mail, badge: 12 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: 8 },
  { id: 'docs', label: 'Docs', icon: FileText, badge: 5 },
  { id: 'events', label: 'Events', icon: Calendar, badge: 3 },
  { id: 'people', label: 'People', icon: Users, badge: 4 },
]

export function WorkspaceView({ workspaceId, activeTab, onTabChange }: WorkspaceViewProps) {
  const workspace = workspaceData[workspaceId as keyof typeof workspaceData]

  if (!workspace) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Workspace not found</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${workspace.color} rounded-lg flex items-center justify-center`}>
              <workspace.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{workspace.name}</h1>
              <p className="text-gray-600">{workspace.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Workspace
            </Button>
            <Button variant="outline" size="sm">
              <Bot className="h-4 w-4 mr-2" />
              AI Summary
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as WorkspaceTab)}>
        <TabsList className="grid grid-cols-6 bg-gray-50 rounded-none border-b">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-white flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Unread Emails</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="text-2xl font-bold text-gray-900">{workspace.stats.emails}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Open Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CheckSquare className="h-5 w-5 text-green-500" />
                        <span className="text-2xl font-bold text-gray-900">{workspace.stats.tasks}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <span className="text-2xl font-bold text-gray-900">{workspace.stats.docs}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-orange-500" />
                        <span className="text-2xl font-bold text-gray-900">{workspace.stats.people}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {workspace.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'email' ? 'bg-blue-500' :
                          activity.type === 'task' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* AI Workspace Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <Bot className="h-5 w-5" />
                    <span>AI Workspace Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">
                    Your Acme Corp workspace has high activity with 12 unread emails and 8 open tasks. 
                    The Q4 review meeting request from Sarah Connor needs immediate attention. 
                    Consider scheduling the technical specification review this week.
                  </p>
                  <Button variant="outline" className="mt-3 text-blue-700 border-blue-300 hover:bg-blue-100">
                    Get Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="email" className="mt-0">
            <div className="text-center py-12">
              <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Emails</h3>
              <p className="text-gray-500">All emails related to {workspace.name} will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Tasks</h3>
              <p className="text-gray-500">Tasks and projects for {workspace.name}</p>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-0">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Documents</h3>
              <p className="text-gray-500">Shared documents and files for {workspace.name}</p>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-0">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Events</h3>
              <p className="text-gray-500">Meetings and events for {workspace.name}</p>
            </div>
          </TabsContent>

          <TabsContent value="people" className="mt-0">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Team Members</h3>
              <p className="text-gray-500">People working on {workspace.name}</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}