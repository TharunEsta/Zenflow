import { BottomNav } from '@/components/nav/bottom-nav'

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
