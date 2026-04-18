"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Award, 
  Crown, 
  User 
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/rewards', label: 'Rewards', icon: Award },
  { href: '/premium', label: 'Premium', icon: Crown },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 md:hidden">
      <nav className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button 
              key={item.href} 
              variant="ghost" 
              size="icon" 
              asChild 
              className="h-12 w-12 p-0 mx-1 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl h-16"
            >
              <Link href={item.href} className="flex flex-col items-center gap-1 h-full">
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
