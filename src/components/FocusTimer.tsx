import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, SkipForward, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FocusTimerProps {
  state: 'hidden' | 'mini' | 'panel'
  onStateChange: (state: 'hidden' | 'mini' | 'panel') => void
}

export function FocusTimer({ state, onStateChange }: FocusTimerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [currentTask] = useState('Review Acme proposal')
  const [session] = useState(1)

  const totalTime = 25 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      // Session completed
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleToggle = () => {
    setIsRunning(!isRunning)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
  }

  const handleSkip = () => {
    setTimeLeft(0)
    setIsRunning(false)
  }

  if (state === 'hidden') return null

  return (
    <AnimatePresence>
      {state === 'mini' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          className="fixed top-6 right-6 z-50"
        >
          <Card 
            className="p-4 bg-white/95 backdrop-blur-sm border shadow-lg cursor-pointer"
            onClick={() => onStateChange('panel')}
          >
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
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                    className="text-blue-500 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {isRunning ? (
                    <Pause className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Play className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentTask}
                </p>
                <p className="text-lg font-mono text-blue-600">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {state === 'panel' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 100 }}
          className="fixed top-6 right-6 z-50 w-80"
        >
          <Card className="p-6 bg-white/95 backdrop-blur-sm border shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Focus Session</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStateChange('mini')}
                >
                  Minimize
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStateChange('hidden')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                    className="text-blue-500 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-gray-900">
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-sm text-gray-500">Session {session}</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {currentTask}
              </h4>
              <p className="text-sm text-gray-500">
                {isRunning ? 'Focus time' : 'Ready to focus'}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleStop}
                disabled={!isRunning && timeLeft === totalTime}
              >
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>

              <Button
                size="lg"
                onClick={handleToggle}
                className="px-8"
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                disabled={timeLeft === 0}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Today's sessions</span>
                <span>{session}/8</span>
              </div>
              <Progress value={(session / 8) * 100} className="mt-2" />
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}