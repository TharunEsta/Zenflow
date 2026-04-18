"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Settings, 
  LogOut, 
  Edit, 
  Mail, 
  Ruler, 
  Calendar, 
  Award 
} from 'lucide-react'
import { useUserStore } from '@/lib/stores/useUserStore'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { UserProfile } from '@/types'

const stats = [
  { label: 'Total Sessions', icon: Calendar, color: 'blue' },
  { label: 'Current Streak', icon: Award, color: 'orange' },
  { label: 'Flex Score', icon: Ruler, color: 'purple' },
  { label: 'Level', icon: Award, color: 'gold' },
]

export default function Profile() {
  const profile = useUserStore((state) => state.profile)
  const { totalSessions, currentStreak, flexibilityScore } = useProgressStore()
  const logout = useUserStore((state) => state.logout)

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 pb-20">
      <div className="p-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl mx-auto mb-6 shadow-2xl flex items-center justify-center">
            <User className="h-16 w-16 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{profile?.name || 'Zen Yogi'}</h1>
          <Badge className="text-lg px-4 py-2 h-10 bg-gradient-to-r from-green-500 to-emerald-500">
            Active Member
          </Badge>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            let value = '0'
            if (stat.label === 'Total Sessions') value = totalSessions.toString()
            else if (stat.label === 'Current Streak') value = currentStreak.toString()
            else if (stat.label === 'Flex Score') value = `${flexibilityScore}%`
            else value = `L${Math.floor(totalSessions / 10) + 1}`

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-blue-500/10">
                        <Icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-sm text-muted-foreground capitalize">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground truncate">user@zenflow.com</p>
              </div>
              <Button variant="ghost" size="sm" className="h-9">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Ruler className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Measurements</p>
                <p className="text-sm text-muted-foreground">
                  {profile?.height || 170}cm • {profile?.weight || 65}kg
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-9">
                <Edit className="h-4 w-4 mr-1" />
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button variant="outline" className="h-14 rounded-2xl flex items-center gap-2" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
          <Button className="h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  )
}

