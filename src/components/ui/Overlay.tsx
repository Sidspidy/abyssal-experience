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
    const depthBarRef = useRef<HTMLDivElement>(null)

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
                    if (depthBarRef.current) {
                        depthBarRef.current.style.transform = `scaleX(${self.progress})`
                    }
                }
            }
        })
    }, [])

    return (
        <div id="main-scroll-container" className="relative z-10 w-full text-white pointer-events-none">

            {/* Sticky Header */}
            <Header />

            {/* ── HUD: Depth Gauge ──────────────────────────────────────── */}
            <div className="fixed right-6 top-20 z-50 flex flex-col items-end pointer-events-none">
                <p className="hud-depth-label mb-1">Current Depth</p>
                <span ref={depthRef} className="hud-depth-value">0m</span>
                <div className="hud-amber-bar" ref={depthBarRef} style={{ transformOrigin: 'left', transform: 'scaleX(0)', transition: 'none' }} />
            </div>

            {/* ═══════════════════════════════════════════════════
                Stage 1: Hero — The Surface
               ═══════════════════════════════════════════════════ */}
            <HeroSection />

            {/* ═══════════════════════════════════════════════════
                Stage 2: The Shallows (0–50m)
                Layout: card on LEFT half, drone clear zone on RIGHT
               ═══════════════════════════════════════════════════ */}
            <section
                id="materials"
                className="h-screen w-full flex items-center px-6 md:px-14 pointer-events-auto"
            >
                {/* Card fills LEFT ~55% — drone floats in the RIGHT 45% */}
                <div className="full-card w-full max-w-[52%] p-8 md:p-10 relative">
                    {/* Watermark */}
                    <span className="section-watermark" style={{ top: '-20px', left: '-10px' }}>01</span>

                    {/* Depth badge */}
                    <div className="depth-badge mb-5">0 – 50m</div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
                        The<br />Shallows
                    </h2>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-7 max-w-sm">
                        Aerospace-grade titanium alloy and carbon-fiber composites form
                        an exoskeleton pressure-tested to 200 atmospheres. Built to survive
                        where other drones fail in the first 10 metres.
                    </p>

                    {/* Spec Grid */}
                    <div className="spec-grid mb-7">
                        <div className="spec-grid-item">
                            <p className="spec-grid-value">Ti-6Al-4V</p>
                            <p className="spec-grid-label">Alloy Grade</p>
                        </div>
                        <div className="spec-grid-item">
                            <p className="spec-grid-value">200 ATM</p>
                            <p className="spec-grid-label">Pressure Rated</p>
                        </div>
                        <div className="spec-grid-item">
                            <p className="spec-grid-value">IP68+</p>
                            <p className="spec-grid-label">Seal Rating</p>
                        </div>
                        <div className="spec-grid-item">
                            <p className="spec-grid-value">~0.92</p>
                            <p className="spec-grid-label">Buoyancy Ratio</p>
                        </div>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-4 mb-7">
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/40 text-[11px] uppercase tracking-wider">Tensile Strength</span>
                                <span className="text-white/60 text-[11px]">95%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: '95%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/40 text-[11px] uppercase tracking-wider">Corrosion Resistance</span>
                                <span className="text-white/60 text-[11px]">98%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: '98%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/40 text-[11px] uppercase tracking-wider">Weight Efficiency</span>
                                <span className="text-white/60 text-[11px]">88%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: '88%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="spec-tag">Titanium Frame</span>
                        <span className="spec-tag">Anti-Corrosion</span>
                        <span className="spec-tag">Carbon Composite</span>
                        <span className="spec-tag">Mil-Spec Seals</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 3: Engineering Perfection (50–200m)
                Layout: card on RIGHT half, drone clear zone on LEFT
               ═══════════════════════════════════════════════════ */}
            <section
                id="engineering"
                className="h-screen w-full flex items-center justify-end px-6 md:px-14 pointer-events-auto"
            >
                {/* Card fills RIGHT ~55% — drone floats in LEFT 45% */}
                <div className="full-card w-full max-w-[52%] p-8 md:p-10 relative">
                    {/* Watermark */}
                    <span className="section-watermark" style={{ top: '-20px', right: '-10px', left: 'auto' }}>02</span>

                    <div className="depth-badge mb-5">50 – 200m</div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-[1.05]">
                        Engineering<br />Perfection
                    </h2>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-7 max-w-sm">
                        Every millimetre engineered for efficiency. Four independently
                        vectored thrusters, each capable of its own directional thrust,
                        grant 6-DoF freedom across all axes.
                    </p>

                    {/* Feature list */}
                    <div className="mb-7">
                        <div className="feature-row">
                            <div className="feature-dot" />
                            <div>
                                <p className="text-white font-semibold text-[15px]">High-capacity modular battery</p>
                                <p className="text-white/45 text-sm mt-0.5">72-hour continuous operation at rated depth</p>
                            </div>
                        </div>
                        <div className="feature-row">
                            <div className="feature-dot" />
                            <div>
                                <p className="text-white font-semibold text-[15px]">Omnidirectional sonar array</p>
                                <p className="text-white/45 text-sm mt-0.5">360° terrain mapping with 0.5m precision</p>
                            </div>
                        </div>
                        <div className="feature-row">
                            <div className="feature-dot" />
                            <div>
                                <p className="text-white font-semibold text-[15px]">Silent propulsion system</p>
                                <p className="text-white/45 text-sm mt-0.5">Bio-inspired thrusters — &lt; 20 dB output</p>
                            </div>
                        </div>
                        <div className="feature-row">
                            <div className="feature-dot" />
                            <div>
                                <p className="text-white font-semibold text-[15px]">AI-assisted navigation</p>
                                <p className="text-white/45 text-sm mt-0.5">Real-time obstacle avoidance & path planning</p>
                            </div>
                        </div>
                    </div>

                    {/* Spec tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="spec-tag">6-DoF Control</span>
                        <span className="spec-tag">72h Battery</span>
                        <span className="spec-tag">Silent Prop</span>
                        <span className="spec-tag">AI Nav</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 4: Into the Void (200–500m)
                Layout: wide centered dark card, drone above/behind
               ═══════════════════════════════════════════════════ */}
            <section
                id="depths"
                className="h-screen w-full flex flex-col items-center justify-end pb-16 px-6 pointer-events-auto"
            >
                <div className="full-card w-full max-w-3xl p-8 md:p-12 text-center relative">
                    <span className="section-watermark" style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>03</span>

                    <div className="depth-badge mb-5 mx-auto" style={{ display: 'inline-flex' }}>200 – 500m</div>

                    <h2 className="text-5xl md:text-6xl font-light tracking-[0.12em] uppercase text-white mb-4"
                        style={{ textShadow: '0 0 40px rgba(0,240,255,0.3)' }}>
                        Into the Void
                    </h2>
                    <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
                        Where sunlight surrenders, the ABYSSAL X-1 activates its intelligent
                        illumination array — 12,000 lumens of adaptive lighting, revealing
                        what the ocean hs hidden for millennia.
                    </p>

                    {/* Stat row */}
                    <div className="flex justify-center gap-4 mb-6">
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
                        <div className="stat-pill">
                            <span className="stat-value">60fps</span>
                            <span className="stat-label">Frame Rate</span>
                        </div>
                    </div>

                    {/* Progress bars for vision specs */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left">
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/40 text-[11px] uppercase tracking-wider">Low-Light Acuity</span>
                                <span className="text-white/50 text-[11px]">97%</span>
                            </div>
                            <div className="progress-track"><div className="progress-fill" style={{ width: '97%' }} /></div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/40 text-[11px] uppercase tracking-wider">Illumination Range</span>
                                <span className="text-white/50 text-[11px]">85%</span>
                            </div>
                            <div className="progress-track"><div className="progress-fill" style={{ width: '85%' }} /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 5: Built for the Impossible (500–1000m+)
                Layout: cinematic typography center, drone low-left
               ═══════════════════════════════════════════════════ */}
            <section
                id="impossible"
                className="h-screen w-full flex flex-col items-center justify-center px-6 pointer-events-auto"
            >
                <div className="text-center relative">
                    {/* Oversized background text */}
                    <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/70 font-semibold mb-6">
                        Depth: 500 – 1000m+
                    </p>
                    <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white leading-[0.9] mb-6"
                        style={{ textShadow: '0 4px 60px rgba(0,0,0,0.9)' }}>
                        BUILT FOR<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400">
                            THE IMPOSSIBLE
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg tracking-widest uppercase mb-10"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                        Withstanding crushing pressures at 1000m+
                    </p>

                    {/* Large stat row */}
                    <div className="flex justify-center gap-5 flex-wrap">
                        <div className="stat-pill">
                            <span className="stat-value text-3xl">1000m</span>
                            <span className="stat-label">Max Depth</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-value text-3xl">200</span>
                            <span className="stat-label">ATM Rated</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-value text-3xl">−2°C</span>
                            <span className="stat-label">Min Temp</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-value text-3xl">72h</span>
                            <span className="stat-label">Endurance</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                Stage 6: Pre-Order / Footer
                No card bg — drone & 3D scene fully visible behind
               ═══════════════════════════════════════════════════ */}
            <section
                id="pre-order"
                className="h-screen w-full flex flex-col items-center justify-end pb-12 px-6 md:px-14 pointer-events-auto"
            >
                <div className="w-full max-w-7xl mx-auto"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '32px' }}>

                    {/* Main CTA row */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-8">
                        <div>
                            <div className="depth-badge mb-4">Available Q3 2026</div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight"
                                style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
                                ABYSSAL X-1
                            </h2>
                            <p className="text-white/55 text-lg"
                                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                                Starting at <span className="text-white font-semibold">$4,999</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="px-10 py-4 bg-white text-black font-bold text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300">
                                Pre-Order Now
                            </button>
                            <button className="px-10 py-4 border border-white/30 text-white font-medium text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                                style={{ backdropFilter: 'blur(8px)' }}>
                                View Full Specs
                            </button>
                        </div>
                    </div>

                    {/* Spec strip + footer links */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>

                        {/* Inline spec list */}
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            {[
                                { v: '1000m', l: 'Max Depth' },
                                { v: '72h', l: 'Battery' },
                                { v: '4K/60', l: 'Video' },
                                { v: '12K lm', l: 'Light' },
                            ].map(({ v, l }) => (
                                <div key={l}>
                                    <p className="text-lg font-bold text-white" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>{v}</p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{l}</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer links */}
                        <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex space-x-6 text-sm text-white/40 font-medium">
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
