'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// "Pre-Order" only appears once — as a styled CTA button; removed from NAV_LINKS
const NAV_LINKS = [
    { label: 'Materials', href: '#materials' },
    { label: 'Engineering', href: '#engineering' },
    { label: 'Depths', href: '#depths' },
]

export default function Header() {
    const headerRef = useRef<HTMLElement>(null)
    const [scrolled, setScrolled] = useState(false)

    // Fade-in on mount
    useGSAP(() => {
        if (!headerRef.current) return
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
        )
    }, [])

    // Track scroll for background + text treatment
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-[100] pointer-events-auto transition-all duration-500 ease-out"
            style={{
                opacity: 0, // GSAP animates this in
                backgroundColor: scrolled ? 'rgba(2, 6, 18, 0.80)' : 'rgba(0, 0, 0, 0.25)',
                backdropFilter: scrolled ? 'blur(14px)' : 'blur(6px)',
                WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'blur(6px)',
                borderBottom: scrolled
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

                {/* Logo */}
                <a
                    href="#"
                    className="text-xl font-bold tracking-[0.25em] text-white uppercase select-none"
                    style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
                >
                    ABYSSAL
                </a>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="text-[13px] font-semibold tracking-[0.12em] uppercase text-white hover:text-cyan-300 transition-colors duration-300"
                            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
                        >
                            {label}
                        </a>
                    ))}

                    {/* Single Pre-Order CTA button */}
                    <a
                        href="#pre-order"
                        className="ml-2 px-5 py-2 text-[12px] font-semibold tracking-[0.15em] uppercase rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                        style={{ backdropFilter: 'blur(6px)', textShadow: 'none' }}
                    >
                        Pre-Order
                    </a>
                </nav>
            </div>
        </header>
    )
}
