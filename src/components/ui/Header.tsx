'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const NAV_LINKS = ['Experience', 'Technology', 'Depths', 'Pre-Order']

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

    // Scroll listener for background change
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-[100] pointer-events-auto transition-all duration-500 ease-out"
            style={{
                opacity: 0, // initial hidden, GSAP animates in
                backgroundColor: scrolled ? 'rgba(2, 6, 18, 0.75)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
                {/* Logo */}
                <a href="#" className="text-xl font-bold tracking-[0.25em] text-white uppercase select-none">
                    ABYSSAL
                </a>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-[13px] font-medium tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                        >
                            {link}
                        </a>
                    ))}

                    {/* CTA Button */}
                    <button className="ml-4 px-5 py-2 text-[12px] font-semibold tracking-[0.15em] uppercase rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                        Pre-Order
                    </button>
                </nav>
            </div>
        </header>
    )
}
