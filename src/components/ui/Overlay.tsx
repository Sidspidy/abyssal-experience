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

            {/* Stage 1: Hero — The Surface */}
            <HeroSection />

            {/* Smooth transition from hero to underwater — tall gradient for seamless merge */}
            {/* <div className="relative h-[50vh] w-full pointer-events-none -mt-1" style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,105,148,0.05) 20%, rgba(0,105,148,0.12) 45%, rgba(0,80,130,0.2) 70%, rgba(0,60,110,0.25) 100%)'
            }} /> */}

            {/* Stage 2: The Shallows */}
            <section className="h-screen w-full flex items-center justify-end px-10 md:px-24 pointer-events-auto">
                <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-right">
                    <h2 className="text-3xl font-semibold mb-3">The Shallows</h2>
                    <p className="text-white/80 leading-relaxed">
                        Constructed with aerospace-grade titanium, ensuring durability against the elements.
                        Master the first 10 meters with unmatched stability.
                    </p>
                </div>
            </section>

            <section className="h-screen w-full flex items-center justify-start px-10 md:px-24 pointer-events-auto">
                <div className="text-left max-w-lg">
                    <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Engineering Perfection</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="text-lg">High-capacity modular battery</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="text-lg">Omnidirectional sensors</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="text-lg">Silent propulsion system</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-auto">
                <h2 className="text-5xl font-light tracking-widest text-cyan-200 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                    INTO THE VOID
                </h2>
                <p className="mt-6 text-xl text-cyan-100/70 max-w-2xl text-center">
                    As light fades, true vision begins. Intelligent illumination for the twilight zone.
                </p>
            </section>

            <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-auto">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                    BUILT FOR THE IMPOSSIBLE
                </h2>
                <p className="mt-8 text-xl font-medium tracking-widest text-white/50 uppercase">
                    Withstanding crushing depths of 1000m+
                </p>
            </section>

            <section className="h-screen w-full flex flex-col justify-end pb-20 px-10 md:px-24 pointer-events-auto">
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-10">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">ABYSSAL X-1</h2>
                        <p className="text-white/60 mb-6">Starting at $4,999</p>
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors uppercase tracking-wider text-sm">
                            Pre-Order Now
                        </button>
                    </div>

                    <div className="flex space-x-8 text-sm text-white/50 mt-10 md:mt-0 font-medium">
                        <a href="#" className="hover:text-white transition-colors">Specs</a>
                        <a href="#" className="hover:text-white transition-colors">Gallery</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </section>

        </div>
    )
}
