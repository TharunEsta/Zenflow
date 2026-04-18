'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Star, Mic, Camera, MessageCircle, Zap, Apple } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const premiumFeatures = [
  { title: 'AI Live Coach', icon: Mic, description: 'Real-time voice guidance', locked: true },
  { title: 'Posture Camera', icon: Camera, description: 'Smart form correction', locked: true },
  { title: '1:1 Trainer Chat', icon: MessageCircle, description: 'Personalized advice', locked: true },
  { title: 'Pro Programs', icon: Zap, description: '60min advanced flows', locked: true },
  { title: 'Full Library', icon: Star, description: 'All 50+ poses unlocked', locked: true },
]

export default function Premium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 pb-20">
      <div className="p-6 space-y-8">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-zen-purple to-zen-pink text-white px-8 py-4 rounded-3xl shadow-2xl mb-8">
            <Crown className="h-12 w-12 drop-shadow-lg" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">ZenFlow Premium</h1>
              <p className="opacity-90 text-lg">$9.99/month</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Unlock your full potential with AI coaching, pro programs & exclusive features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "group hover:shadow-xl transition-all overflow-hidden cursor-pointer border-0",
                  feature.locked ? "grayscale opacity-60 hover:grayscale-0 hover:opacity-100" : "bg-gradient-to-br from-white shadow-lg"
                )}>
                  <CardContent className="p-8 relative">
                    <div className={cn(
                      "p-4 rounded-2xl mb-6 shadow-lg transition-all group-hover:scale-105",
                      feature.locked ? "bg-gray-200" : "bg-gradient-to-br from-zen-purple to-zen-pink"
                    )}>
                      <Icon className={cn("h-12 w-12", feature.locked ? "text-gray-400" : "text-white drop-shadow-lg")} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold mb-3 flex items-center gap-2">
                        {feature.title}
                        {feature.locked && <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />}
                      </CardTitle>
                      <CardDescription className="text-lg">{feature.description}</CardDescription>
                    </div>
                    {feature.locked && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-zen-purple to-zen-pink text-white shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              <Star className="h-16 w-16 mx-auto mb-6 opacity-75" />
              <h2 className="text-3xl font-bold mb-4">Ready to unlock Premium?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-md mx-auto leading-relaxed">
                Everything you need for serious yoga transformation. Cancel anytime.
              </p>
              <div className="space-y-3">
                <Button size="lg" className="w-full zen-gradient text-xl h-16 shadow-2xl font-semibold">
                  Start Premium Free Trial
                </Button>
                <Button variant="ghost" className="w-full h-14 border-white/30 text-white hover:bg-white/10">
                  <Apple className="h-5 w-5 mr-2" />
                  Apple Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Free Tier Note */}
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 animate-pulse" />
              <div>
                <p className="font-medium text-yellow-900 mb-1">Free Tier Active</p>
                <p className="text-sm text-yellow-800">Upgrade anytime to unlock all features</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
