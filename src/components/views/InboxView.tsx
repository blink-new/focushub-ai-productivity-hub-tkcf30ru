import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Archive, Trash2, Star, Bot, Clock, Paperclip, Reply } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const emails = [
  {
    id: 1,
    from: 'Sarah Connor',
    email: 'sarah@acme-corp.com',
    subject: 'Q4 Review Meeting - Urgent',
    preview: 'Hi team, we need to schedule our Q4 review meeting for next week. Please let me know your availability...',
    time: '2 min ago',
    unread: true,
    starred: true,
    hasAttachment: true,
    priority: 'high',
    aiSummary: 'Meeting request for Q4 review with availability check',
    workspace: 'Acme Corp'
  },
  {
    id: 2,
    from: 'GitHub',
    email: 'noreply@github.com',
    subject: 'Pull Request #47 ready for review',
    preview: 'A new pull request has been submitted for the user authentication feature...',
    time: '1 hour ago',
    unread: true,
    starred: false,
    hasAttachment: false,
    priority: 'medium',
    aiSummary: 'Code review needed for authentication feature',
    workspace: 'Startup X'
  },
  {
    id: 3,
    from: 'Marketing Weekly',
    email: 'newsletter@marketing.com',
    subject: 'This Week in Marketing: AI Tools',
    preview: 'Discover the latest AI marketing tools that are transforming how teams work...',
    time: '3 hours ago',
    unread: false,
    starred: false,
    hasAttachment: false,
    priority: 'low',
    aiSummary: 'Newsletter about AI marketing tools',
    workspace: null
  }
]

export function InboxView() {
  const [selectedTab, setSelectedTab] = useState('priority')
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="flex h-full">
      {/* Email List */}
      <div className="w-1/2 border-r border-gray-200 bg-white">
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

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search emails..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-none border-b">
            <TabsTrigger value="priority" className="data-[state=active]:bg-white">
              Priority
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                2
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="newsletters" className="data-[state=active]:bg-white">
              Newsletters
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                1
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="bundled" className="data-[state=active]:bg-white">
              Bundled
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                0
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-0 h-full overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {emails
                .filter(email => {
                  if (selectedTab === 'priority') return email.priority === 'high' || email.priority === 'medium'
                  if (selectedTab === 'newsletters') return email.from.includes('Weekly') || email.from.includes('Newsletter')
                  return false
                })
                .map((email, index) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedEmail === email.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedEmail(email.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${email.from}`} />
                        <AvatarFallback>{email.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className={`text-sm font-medium text-gray-900 ${email.unread ? 'font-semibold' : ''}`}>
                              {email.from}
                            </p>
                            {email.workspace && (
                              <Badge variant="outline" className="text-xs">
                                {email.workspace}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">{email.time}</span>
                            {email.starred && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                            {email.hasAttachment && <Paperclip className="h-4 w-4 text-gray-400" />}
                          </div>
                        </div>

                        <p className={`text-sm text-gray-900 mt-1 ${email.unread ? 'font-medium' : ''}`}>
                          {email.subject}
                        </p>

                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {email.preview}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(email.priority)}>
                              {email.priority}
                            </Badge>
                            {email.aiSummary && (
                              <div className="flex items-center space-x-1">
                                <Bot className="h-3 w-3 text-blue-500" />
                                <span className="text-xs text-blue-600">{email.aiSummary}</span>
                              </div>
                            )}
                          </div>
                          {email.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Email Content */}
      <div className="w-1/2 bg-white">
        {selectedEmail ? (
          <div className="h-full flex flex-col">
            {/* Email Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {emails.find(e => e.id === selectedEmail)?.subject}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${emails.find(e => e.id === selectedEmail)?.from}`} />
                  <AvatarFallback>
                    {emails.find(e => e.id === selectedEmail)?.from.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {emails.find(e => e.id === selectedEmail)?.from}
                  </p>
                  <p className="text-sm text-gray-500">
                    {emails.find(e => e.id === selectedEmail)?.email}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500 ml-auto">
                  <Clock className="h-4 w-4 mr-1" />
                  {emails.find(e => e.id === selectedEmail)?.time}
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <div className="flex items-start space-x-2">
                <Bot className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">AI Summary</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {emails.find(e => e.id === selectedEmail)?.aiSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p>Hi team,</p>
                <p>
                  We need to schedule our Q4 review meeting for next week to discuss our progress 
                  and plan for the upcoming quarter. This is a critical meeting that will help us 
                  align on our goals and priorities.
                </p>
                <p>Please let me know your availability for the following time slots:</p>
                <ul>
                  <li>Tuesday, Nov 28th - 2:00 PM - 4:00 PM</li>
                  <li>Wednesday, Nov 29th - 10:00 AM - 12:00 PM</li>
                  <li>Thursday, Nov 30th - 1:00 PM - 3:00 PM</li>
                </ul>
                <p>
                  I've attached the agenda and previous quarter's results for your review. 
                  Please come prepared with your updates and any questions you might have.
                </p>
                <p>Looking forward to a productive session!</p>
                <p>Best regards,<br />Sarah</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Inbox className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Select an email to read</p>
              <p className="text-sm mt-1">Choose an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}