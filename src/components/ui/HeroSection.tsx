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
        const subtitle = contentRef.current.querySelector('.hero-subtitle')
        const body = contentRef.current.querySelector('.hero-body')
        const ctas = contentRef.current.querySelector('.hero-ctas')

        const tl = gsap.timeline({ delay: 0.8 })

        tl.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
            .fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
            .fromTo(body, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

        // Scroll indicator
        if (scrollIndicatorRef.current) {
            gsap.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2.5, ease: 'power2.out' }
            )
        }
    }, [])

    return (
        <section className="relative h-screen w-full overflow-hidden pointer-events-auto">

            {/* === Layer 1: Clouds only — NO opaque background === */}
            {/* The 3D Canvas behind provides the sky-blue background color */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="cloud cloud-1" />
                <div className="cloud cloud-2" />
                <div className="cloud cloud-3" />
                <div className="cloud cloud-4" />
            </div>

            {/* === Layer 2: Ocean Surface Hint at bottom === */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] z-[1] pointer-events-none">
                {/* Subtle gradient overlay — semi-transparent, not blocking */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#006994]/30" />
                {/* Horizon shimmer */}
                <div className="absolute top-0 left-0 w-full h-[2px] ocean-shimmer" />
            </div>

            {/* === Layer 3: Content (Right Side) === */}
            {/* Left half is transparent → 3D drone shows through from Canvas */}
            <div
                ref={contentRef}
                className="relative z-10 h-full flex items-center"
            >
                {/* Spacer for left half (drone area) */}
                <div className="hidden md:block w-1/2 flex-shrink-0" />

                {/* Content on the right half */}
                <div className="w-full md:w-1/2 px-8 md:px-12 lg:px-16">
                    {/* Title */}
                    <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] leading-[0.95] mb-4"
                        style={{ opacity: 0 }}
                    >
                        ABYSSAL
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/90 mb-6 drop-shadow-md"
                        style={{ opacity: 0 }}
                    >
                        Explore Beyond the Surface
                    </p>

                    {/* Body */}
                    <div className="hero-body mb-8" style={{ opacity: 0 }}>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed tracking-wide">
                            Built for extreme depths.
                            <br />
                            Designed for absolute control.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="hero-ctas flex flex-col sm:flex-row gap-4 sm:gap-5" style={{ opacity: 0 }}>
                        <button className="px-8 py-3.5 bg-white text-black font-semibold text-sm tracking-[0.12em] uppercase rounded-full hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
                            Begin the Dive
                        </button>
                        <button className="px-8 py-3.5 border border-white/25 text-white font-medium text-sm tracking-[0.12em] uppercase rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                            View Technology
                        </button>
                    </div>
                </div>
            </div>

            {/* === Scroll Indicator === */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
                style={{ opacity: 0 }}
            >
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-medium">
                    Scroll to Dive
                </p>
                <div className="scroll-indicator-line" />
            </div>
        </section>
    )
}
