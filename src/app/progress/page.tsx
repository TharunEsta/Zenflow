'use client'

import { ProgressRing } from '@/components/ui/progress-ring'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { BarChart3, TrendingUp, Activity, Award, Clock, Target } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const trendData = [
  { month: 'Jan', flex: 45, mood: 3 },
  { month: 'Feb', flex: 52, mood: 3.5 },
  { month: 'Mar', flex: 61, mood: 4 },
  { month: 'Apr', flex: 68, mood: 4.2 },
  { month: 'May', flex: 72, mood: 4.5 },
]

const weeklyData = [
  { day: 'Sun', sessions: 1 },
  { day: 'Mon', sessions: 1 },
  { day: 'Tue', sessions: 0 },
  { day: 'Wed', sessions: 1 },
  { day: 'Thu', sessions: 1 },
  { day: 'Fri', sessions: 1 },
  { day: 'Sat', sessions: 1 },
]

export default function Progress() {
  const { currentStreak, totalSessions, flexibilityScore } = useProgressStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white pb-20">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="h-10 w-10 text-zen-purple bg-zen-purple/10 p-3 rounded-2xl" />
          <div>
            <h1 className="text-3xl font-bold">Progress Analytics</h1>
            <p className="text-muted-foreground">Your yoga journey insights</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Activity className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalSessions}</p>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                </div>
              </div>
              <ProgressRing progress={Math.min(100, totalSessions * 2)} size={70} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{flexibilityScore}%</p>
                  <p className="text-sm text-muted-foreground">Flex Score</p>
                </div>
              </div>
              <ProgressRing progress={flexibilityScore} size={70} />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <CardHeader className="p-6 pb-4">
              <CardTitle>Flexibility Trend</CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="flex" stroke="#8b5cf6" strokeWidth={4} dot={{ fill: '#8b5cf6', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <CardHeader className="p-6 pb-4">
              <CardTitle>Weekly Consistency</CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Achievements Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 p-0">
            <div className="p-4 text-center border-r">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-2xl font-bold text-white">7</span>
              </div>
              <p className="font-semibold text-sm">Day Streak</p>
              <Badge className="mt-1">🔥 Unlocked</Badge>
            </div>
            <div className="p-4 text-center border-r">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-xl font-bold text-white">L3</span>
              </div>
              <p className="font-semibold text-sm">Level Up</p>
              <Badge className="mt-1">🏆 Earned</Badge>
            </div>
            <div className="p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-xl font-bold text-white">72%</span>
              </div>
              <p className="font-semibold text-sm">Flex Master</p>
              <Badge className="mt-1">🥇 Achieved</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
