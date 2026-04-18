"use client"

import { useState } from 'react'
import { asanas } from '@/data/asanas'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Search, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Library() {
  const [search, setSearch] = useState<string>('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 p-4 pb-20">
      <div className="sticky top-0 bg-white/80 backdrop-blur z-10 p-4 border-b">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold flex-1">Asana Library</h1>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search poses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm bg-background focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {asanas.slice(0, 12).map((asana) => (
          <Card key={asana.id} className="group hover:shadow-xl transition-all overflow-hidden border-0 bg-white/70 hover:bg-white backdrop-blur-sm hover:-translate-y-1">
            <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all" />
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-4xl opacity-20">🧘</span>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="text-xs capitalize">{asana.difficulty}</Badge>
              </div>
            </div>
            <CardContent className="p-4 pt-0">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg font-bold leading-tight line-clamp-1">{asana.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0 -m-1 hover:bg-red-50">
                  <Heart className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </Button>
              </div>
              <CardDescription className="text-sm line-clamp-2 mb-3">{asana.benefits.join(', ')}</CardDescription>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{asana.duration}s • {asana.targets[0] || 'Full Body'}</span>
                <Button variant="outline" size="sm" className="px-3 py-1 text-xs h-auto rounded-full border-gray-200">
                  Quick Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

