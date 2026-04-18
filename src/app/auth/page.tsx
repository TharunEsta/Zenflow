"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/stores/useUserStore'
import { notify } from '@/components/ui/toast'
import { Mail, Lock, UserPlus, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const setProfile = useUserStore((state) => state.setProfile)
  const router = useRouter()

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    const mockUser = {
      name: 'Sarah',
      age: 30,
      gender: 'F',
      height: 170,
      weight: 65,
      experience: 'beginner' as const,
      goal: 'flexibility',
      dailyTime: 30,
      preferredTime: 'morning' as const,
      problemAreas: [],
      difficultyPreference: 'balanced' as const,
    }
    
    localStorage.setItem('zenflow-user', JSON.stringify({ email, profile: mockUser }))
    setProfile(mockUser)
    notify(isLogin ? 'Welcome back!' : 'Account created!', 'success')
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 shadow-2xl flex items-center justify-center">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold mb-1">Welcome to ZenFlow</CardTitle>
          <CardDescription className="text-lg">Your yoga journey starts here</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  type="email"
                  placeholder="sarah@yoga.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-14 zen-gradient shadow-xl text-lg font-semibold">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </form>
          <div className="text-center mt-6 space-y-2">
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-muted border rounded-xl"
            >
              {isLogin ? 'New here? Create account' : 'Have account? Sign in'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Mock auth for V1 • Production uses Firebase/Supabase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
