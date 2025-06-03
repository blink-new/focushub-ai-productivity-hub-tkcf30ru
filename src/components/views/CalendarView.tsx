import React from 'react'
import { Calendar } from 'lucide-react'

export function CalendarView() {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar</h3>
        <p className="text-gray-500">Calendar integration coming soon</p>
      </div>
    </div>
  )
}