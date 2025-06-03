# FocusHub - AI Productivity Hub Design

## Vision
FocusHub is an AI-powered productivity hub that unifies Email, Calendar, Tasks, and Docs inside project/client Workspaces with a floating Focus Timer. Target users are tech-savvy solo founders and small team knowledge workers.

## Design Principles
1. **Universal Workspace** - One filter surfaces all objects for a project/client
2. **Agentic AI** - Smart summaries, drafts, and contextual assistance  
3. **Ritualized Planning** - Daily plan/review with drag-to-time-box calendar
4. **Speed & Delight** - Keyboard-first, millisecond feel, tasteful animations
5. **Focus Pop-out** - Always-on-top mini-timer with quick controls

## Core Features (V1)
- **Dashboard/Inbox**: Priority tabs, AI summary badges, bulk actions, ⌘K palette
- **Workspace System**: Project tabs (Overview, Email, Tasks, Docs, Events, People)
- **Focus Timer**: Mini-timer, Focus Panel, Hidden states with Pomodoro
- **Task Management**: Today/Backlog lists, drag reorder, calendar time-boxing
- **AI Chat-to-Compose**: Conversational email drafting

## Visual Style
- **Typography**: Inter font family, clear hierarchy
- **Colors**: Soft neutral backgrounds + vibrant blue accent (#0ea5e9)
- **Layout**: Rounded-xl corners, subtle shadows, generous spacing
- **Animation**: Smooth Framer Motion transitions, hover states
- **Mobile**: Responsive design with proper breakpoints

## User Journey
1. **Onboarding**: Connect email → Create first workspace → Drag emails in
2. **Daily Ritual**: AI suggests tasks → Drag to calendar → Start focus timer
3. **Workspace Flow**: Open client workspace → See unified view → Take actions
4. **Focus Mode**: Mini-timer floats → Start task → Auto-open docs
5. **AI Assistance**: Chat to compose → AI drafts → Edit and send

## Technical Architecture
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Components**: shadcn/ui + Framer Motion animations
- **State**: Local state with planned Supabase integration
- **Keyboard**: Command palette for power users
- **Timer**: Floating window component with three states