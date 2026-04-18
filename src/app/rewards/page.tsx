"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProgressRing } from '@/components/ui/progress-ring'
import { useProgressStore } from '@/lib/stores/useProgressStore'
import { useUserStore } from '@/lib/stores/useUserStore'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Trophy, Download, Star, Crown, CalendarDays } from 'lucide-react'

export default function Rewards() {
  const { challengeDays, challengeStartDate, challengeCompleted, getChallengeProgress } = useProgressStore()
  const profile = useUserStore((state) => state.profile)
  const challengeProgress = getChallengeProgress()
  
  const isChallengeActive = !!challengeStartDate

  const milestones = [
    { day: 7, badge: '🔥', title: 'Week 1 Master' },
    { day: 30, badge: '🥇', title: 'Month 1 Warrior' },
    { day: 60, badge: '⚔️', title: '2 Month Legend' },
    { day: 90, badge: '🏆', title: 'ZenFlow Master' },
  ]

  const earnedMilestones = milestones.filter(m => challengeDays >= m.day)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 pb-20">
      <div className="p-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-xl mb-6">
            <Trophy className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">90 Day Wellness Challenge</h1>
              <p className="text-sm opacity-90">Complete daily sessions for certification</p>
            </div>
          </div>
        </motion.div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              Challenge Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-8">
              <ProgressRing progress={(challengeDays / 90) * 100} size={120} />
              <div className="mt-4">
                <h2 className="text-4xl font-bold">{challengeDays}/90</h2>
                <p className="text-sm text-muted-foreground">{challengeProgress.remaining} days remaining</p>
              </div>
            </div>
            {isChallengeActive && (
              <p className="text-muted-foreground mb-6">
                Started {new Date(challengeStartDate!).toLocaleDateString()}
              </p>
            )}
            {!isChallengeActive && (
              <Button className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white shadow-lg" size="lg">
                Start Challenge
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestones Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.day}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "text-center p-4 rounded-xl border-2 transition-all group",
                    challengeDays >= milestone.day 
                      ? "border-green-400 bg-green-50 shadow-lg" 
                      : "border-muted bg-muted/20 opacity-60"
                  )}
                >
                  <div className="text-3xl mb-2">{milestone.badge}</div>
                  <h3 className="font-bold">{milestone.title}</h3>
                  <p className="text-xs text-muted-foreground">{milestone.day} days</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "shadow-2xl border-2 transition-all",
          challengeCompleted ? "border-green-400 bg-green-50" : "border-muted/50 opacity-75"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Official Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-white to-gray-50 border-4 border-amber-200 rounded-2xl p-8 mb-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">ZenFlow</h1>
                  <p className="text-2xl font-serif italic text-amber-700">Certificate of Achievement</p>
                </div>
                <div className="text-center">
                  <p className="text-lg mb-4">Awarded to</p>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">{profile?.name || 'Zen Yogi'}</h2>
                  <p className="text-xl font-semibold text-gray-700 mb-8">
                    For successfully completing the ZenFlow 90 Day Wellness Challenge
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-12">
                    <div>
                      <p className="text-muted-foreground">Certificate ID</p>
                      <p className="font-mono bg-muted px-3 py-1 rounded-full text-sm">ZF90-123456</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-bold">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="border-t-2 border-amber-300 pt-6">
                    <p className="text-sm italic text-amber-600 font-serif">ZenFlow Yoga Master</p>
                  </div>
                </div>
              </div>
            </div>
            {challengeCompleted ? (
              <Button className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white shadow-lg" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Download Certificate (PDF)
              </Button>
            ) : (
              <div className="p-6 bg-gradient-to-r from-yellow-50 border-2 border-yellow-200 rounded-2xl">
                <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500 opacity-50" />
                <h3 className="text-xl font-bold mb-2 text-center">Complete Challenge to Unlock</h3>
                <p className="text-muted-foreground text-center mb-4">{challengeProgress.remaining} days remaining</p>
                <Button className="w-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white shadow-lg">Continue Challenge</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

