'use client'

import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
    const { progress, active } = useProgress()
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        // When R3F reports loading is done (progress 100% and no longer active)
        if (progress >= 100 && !active) {
            // Small delay to let the scene render its first frame
            const timer = setTimeout(() => {
                setFadeOut(true)
                const hideTimer = setTimeout(() => setVisible(false), 1000)
                return () => clearTimeout(hideTimer)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [progress, active])

    if (!visible) return null

    return (
        <div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{
                backgroundColor: '#020612',
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 1s ease-out',
                pointerEvents: fadeOut ? 'none' : 'all',
            }}
        >
            {/* Logo */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[0.35em] text-white/90 mb-12 uppercase">
                ABYSSAL
            </h1>

            {/* Progress bar container */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${Math.floor(progress)}%`,
                        background: 'linear-gradient(90deg, #22d3ee, #06b6d4, #0891b2)',
                        transition: 'width 0.3s ease-out',
                    }}
                />
            </div>

            {/* Progress text */}
            <p className="mt-4 text-[11px] font-mono tracking-[0.2em] text-white/30 uppercase">
                {progress < 100 ? `Loading assets... ${Math.floor(progress)}%` : 'Dive ready'}
            </p>
        </div>
    )
}
