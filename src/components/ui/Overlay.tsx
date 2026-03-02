'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Header from './Header'
import HeroSection from './HeroSection'

gsap.registerPlugin(ScrollTrigger)

export default function Overlay() {
    const depthRef = useRef<HTMLSpanElement>(null)

    useGSAP(() => {
        const depth = { value: 0 }

        gsap.to(depth, {
            value: 1000,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    if (depthRef.current) {
                        const currentDepth = Math.floor(self.progress * 1000)
                        depthRef.current.innerText = `${currentDepth}m`
                    }
                }
            }
        })
    }, [])

    return (
        <div id="main-scroll-container" className="relative z-10 w-full text-white pointer-events-none">

            {/* Sticky Header */}
            <Header />

            {/* HUD - Fixed Depth Gauge */}
            <div className="fixed top-10 right-10 z-50 flex flex-col items-end opacity-80">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-1">Current Depth</p>
                <span ref={depthRef} className="text-4xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    0m
                </span>
                <div className="w-16 h-[2px] bg-cyan-400 mt-2 origin-right scale-x-50" />
            </div>

            {/* ═══════════════════════════════════════════════════
                Stage 1: Hero — The Surface
               ═══════════════════════════════════════════════════ */}
            <HeroSection />

            {/* ═══════════════════════════════════════════════════
                Stage 2: The Shallows — Material & Build (RIGHT card)
               ═══════════════════════════════════════════════════ */}
            <section className="h-screen w-full flex items-center justify-end px-8 md:px-20 pointer-events-auto">
                <div className="section-card max-w-md w-full p-8 md:p-10 text-right">
                    {/* Section label */}
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-3">
                        Depth: 0–50m
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                        The Shallows
                    </h2>
                    <p className="text-white/80 leading-relaxed mb-5 text-[15px]">
                        Engineered with aerospace-grade titanium alloy and reinforced carbon fiber composites.
                        Every seam pressure-tested to withstand 200 atmospheres.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-end">
                        <span className="spec-tag">Titanium Frame</span>
                        <span className="spec-tag">IP68+ Sealed</span>
                        <span className="spec-tag">Anti-Corrosion</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 3: Engineering Perfection (LEFT card)
               ═══════════════════════════════════════════════════ */}
            <section className="h-screen w-full flex items-center justify-start px-8 md:px-20 pointer-events-auto">
                <div className="section-card max-w-lg w-full p-8 md:p-10 text-left">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-3">
                        Depth: 50–200m
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                        Engineering Perfection
                    </h2>
                    <ul className="space-y-5">
                        <li className="flex items-start space-x-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                            <div>
                                <span className="text-lg font-medium text-white">High-capacity modular battery</span>
                                <p className="text-white/50 text-sm mt-1">72-hour continuous operation at full depth</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                            <div>
                                <span className="text-lg font-medium text-white">Omnidirectional sonar array</span>
                                <p className="text-white/50 text-sm mt-1">360° terrain mapping with 0.5m precision</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                            <div>
                                <span className="text-lg font-medium text-white">Silent propulsion system</span>
                                <p className="text-white/50 text-sm mt-1">Bio-inspired thruster design, &lt;20dB output</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                            <div>
                                <span className="text-lg font-medium text-white">AI-assisted navigation</span>
                                <p className="text-white/50 text-sm mt-1">Real-time obstacle avoidance & path planning</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 4: Into the Void — Twilight Zone (CENTER)
               ═══════════════════════════════════════════════════ */}
            <section className="h-screen w-full flex flex-col items-center justify-center px-6 pointer-events-auto">
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400/80 font-semibold mb-4">
                    Depth: 200–500m
                </p>
                <h2 className="text-5xl md:text-6xl font-light tracking-widest text-cyan-200 drop-shadow-[0_0_25px_rgba(0,240,255,0.5)] text-center mb-6">
                    INTO THE VOID
                </h2>
                <p className="text-lg md:text-xl text-cyan-100/80 max-w-2xl text-center leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    As light fades, true vision begins. The ABYSSAL X-1 activates its intelligent
                    illumination array — 12,000 lumens of adaptive lighting that reveals
                    what the ocean hides.
                </p>
                <div className="flex gap-6 mt-8">
                    <div className="stat-pill">
                        <span className="stat-value">12K</span>
                        <span className="stat-label">Lumens</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-value">4K</span>
                        <span className="stat-label">Camera</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-value">120°</span>
                        <span className="stat-label">FOV</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 5: Built for the Impossible (CENTER)
               ═══════════════════════════════════════════════════ */}
            <section className="h-screen w-full flex flex-col items-center justify-center px-6 pointer-events-auto">
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400/60 font-semibold mb-4">
                    Depth: 500–1000m+
                </p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white text-center drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                    BUILT FOR THE
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
                        IMPOSSIBLE
                    </span>
                </h2>
                <p className="mt-8 text-lg md:text-xl font-medium tracking-widest text-white/70 uppercase text-center drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">
                    Withstanding crushing pressures at 1000m+
                </p>
                <div className="flex gap-6 mt-10">
                    <div className="stat-pill">
                        <span className="stat-value">1000m</span>
                        <span className="stat-label">Max Depth</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-value">200</span>
                        <span className="stat-label">ATM Rated</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-value">−2°C</span>
                        <span className="stat-label">Operating</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 6: Pre-Order / Footer
               ═══════════════════════════════════════════════════ */}
            <section className="h-screen w-full flex flex-col justify-end pb-16 px-8 md:px-20 pointer-events-auto">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/15 pt-10">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-3">
                                Available Q3 2026
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                                ABYSSAL X-1
                            </h2>
                            <p className="text-white/60 mb-6 text-lg">Starting at $4,999</p>
                            <div className="flex gap-4">
                                <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300 uppercase tracking-wider text-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    Pre-Order Now
                                </button>
                                <button className="border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 uppercase tracking-wider text-sm">
                                    View Specs
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <div className="flex space-x-8 text-sm text-white/50 font-medium">
                                <a href="#" className="hover:text-cyan-400 transition-colors">Specs</a>
                                <a href="#" className="hover:text-cyan-400 transition-colors">Gallery</a>
                                <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
                                <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                            </div>
                            <p className="text-white/20 text-xs tracking-wider">© 2026 ABYSSAL. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
