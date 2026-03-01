'use client'
import dynamic from 'next/dynamic'
import Overlay from '@/components/ui/Overlay'
import LoadingScreen from '@/components/ui/LoadingScreen'

// Dynamically import the Scene component to disable SSR for Three.js
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020612]">
      {/* Loading Screen — covers everything until assets are ready */}
      <LoadingScreen />

      {/* 3D Scene Layer (Fixed Background) */}
      <Scene />

      {/* Scrollable Overlay Layer */}
      <Overlay />
    </main>
  )
}
