'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function HeroSection() {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!contentRef.current) return

        const title = contentRef.current.querySelector('.hero-title')
        const eyebrow = contentRef.current.querySelector('.hero-eyebrow')
        const subtitle = contentRef.current.querySelector('.hero-subtitle')
        const body = contentRef.current.querySelector('.hero-body')

        const tl = gsap.timeline({ delay: 0.9 })

        tl.fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
            .fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.3')
            .fromTo(subtitle, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

        if (scrollIndicatorRef.current) {
            gsap.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2.8, ease: 'power2.out' }
            )
        }
    }, [])

    return (
        <section className="relative h-screen w-full overflow-hidden pointer-events-auto">

            {/* Clouds */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="cloud cloud-1" />
                <div className="cloud cloud-2" />
                <div className="cloud cloud-3" />
                <div className="cloud cloud-4" />
            </div>

            {/* Ocean surface hint */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] z-[1] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#006994]/30" />
                <div className="absolute top-0 left-0 w-full h-[2px] ocean-shimmer" />
            </div>

            {/* ── Content: right half — left half is the drone's stage ── */}
            <div
                ref={contentRef}
                className="relative z-10 h-full flex items-center"
            >
                {/* Spacer for left (drone) half */}
                <div className="hidden md:block w-1/2 flex-shrink-0" />

                {/* Right-half content */}
                <div className="w-full md:w-1/2 px-8 md:px-12 lg:px-16">

                    {/* Eyebrow */}
                    <p
                        className="hero-eyebrow text-[11px] font-semibold uppercase tracking-[0.35em] text-white mb-4"
                        style={{ opacity: 0, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}
                    >
                        Underwater ROV · ABYSSAL X-1
                    </p>

                    {/* Title */}
                    <h1
                        className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white leading-[0.9] mb-5"
                        style={{
                            opacity: 0,
                            textShadow: '0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.3)',
                        }}
                    >
                        ABYSSAL
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="hero-subtitle text-xl md:text-2xl font-light tracking-wide text-white mb-5"
                        style={{ opacity: 0, textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
                    >
                        Explore Beyond the Surface
                    </p>

                    {/* Body */}
                    <div className="hero-body" style={{ opacity: 0 }}>
                        <p
                            className="text-sm md:text-base text-white/75 leading-relaxed tracking-wide"
                            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
                        >
                            Built for extreme depths.
                            <br />
                            Designed for absolute control.
                        </p>

                        {/* Depth range tags */}
                        <div className="flex gap-3 mt-5">
                            <span className="depth-badge">0 – 1000m</span>
                            <span className="depth-badge">72h Endurance</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
                style={{ opacity: 0 }}
            >
                <p
                    className="text-[10px] uppercase tracking-[0.35em] text-white font-medium"
                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                >
                    Scroll to Dive
                </p>
                <div className="scroll-indicator-line" />
            </div>
        </section>
    )
}
