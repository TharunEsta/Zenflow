"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProgressRing } from '@/components/ui/progress-ring'
import { useUserStore } from '@/lib/stores/useUserStore'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  Flame, 
  TrendingUp, 
  Award, 
  PlayCircle,
  Crown,
  Settings 
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const dummyTrendData = [
  { day: 'Mon', sessions: 1, mood: 3 },
  { day: 'Tue', sessions: 1, mood: 4 },
  { day: 'Wed', sessions: 0, mood: 2 },
  { day: 'Thu', sessions: 1, mood: 4 },
  { day: 'Fri', sessions: 1, mood: 5 },
  { day: 'Sat', sessions: 1, mood: 5 },
  { day: 'Sun', sessions: 1, mood: 5 }
]

export default function Dashboard() {
  const router = useRouter()
  const profile = useUserStore((state) => state.profile)
  const { currentStreak, totalSessions, flexibilityScore } = useProgressStore()
  
  const [time, setTime] = useState('')

  useEffect(() => {
    const today = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTime(today)
  }, [])

  const level = `Level ${Math.min(10, Math.floor(totalSessions / 5) + 1)}`

  const handleStartSession = () => {
    router.push('/session')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white pb-20 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {profile?.name || 'Yogi'}
            </h1>
            <p className="text-muted-foreground mt-1">{time}</p>
          </div>
          <Crown className="h-12 w-12 text-yellow-500" />
        </div>
        <p className="text-lg text-muted-foreground">Ready for today's flow? 🌿</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl">
          <CardContent className="p-6">
            <Flame className="h-12 w-12 mb-2 opacity-75" />
            <div className="text-3xl font-bold">{currentStreak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-400/30 shadow-lg">
          <CardContent className="p-6">
            <TrendingUp className="h-12 w-12 mb-2 text-green-500" />
            <div className="text-3xl font-bold">{flexibilityScore}</div>
            <ProgressRing progress={flexibilityScore} size={60} className="mx-auto mb-2" />
            <div className="text-sm text-green-600 font-medium">Flexibility</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Calendar className="h-12 w-12 mb-2 text-blue-500" />
            <div className="text-3xl font-bold">{totalSessions}</div>
            <div className="text-sm opacity-75">Total Sessions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Award className="h-12 w-12 mb-2 text-amber-500" />
            <div className="text-xl font-bold">{level}</div>
            <Badge className="mt-1 bg-gradient-to-r from-yellow-400 to-orange-400">
              {level}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Today's Session CTA */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl border-0 mb-8 overflow-hidden">
        <CardContent className="p-8 text-center">
          <PlayCircle className="h-24 w-24 mx-auto mb-4 opacity-75" />
          <h2 className="text-2xl font-bold mb-2">Today's 30 min Flow</h2>
          <p className="opacity-90 mb-6">Balanced flexibility + strength • Perfect for morning</p>
          <Button onClick={handleStartSession} size="lg" className="w-full bg-white text-purple-600 shadow-xl text-lg font-semibold h-14 hover:bg-gray-100">
            Start Session
          </Button>
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyTrendData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button asChild variant="outline" className="h-20 flex flex-col gap-2 items-center text-muted-foreground hover:text-foreground hover:bg-purple-50 rounded-2xl">
          <Link href="/profile">
            <Settings className="h-8 w-8" />
            Profile
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex flex-col gap-2 items-center text-muted-foreground hover:text-foreground hover:bg-pink-50 rounded-2xl">
          <Link href="/premium">
            <Crown className="h-8 w-8" />
            Premium
          </Link>
        </Button>
      </div>
    </div>
  )
}

