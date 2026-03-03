'use client'

import { useRef, useEffect } from 'react'
import { useGLTF, Center, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
//  DRONE ROTATION REFERENCE
//
//  Hero (JSX initial):      x=65°, y=-90°, z=-5°  → TOP-DOWN view, on LEFT
//  Shallows:                x=0°,  y=-90°, z=0°   → SIDE view, front right — drone in RIGHT clear zone
//  Engineering Perfection:  x=0°,  y=90°,  z=5°   → LEFT SIDE facing cam   — drone in LEFT clear zone
//  Into the Void:           x=30°, y=180°, z=0°   → NOSE-DIVE toward cam   — CENTER
//  Built for Impossible:    x=-15°,y=225°, z=12°  → LOW-ANGLE cinematic    — CENTER-LEFT
//  Pre-Order:               x=10°, y=135°, z=0°   → 3/4 FRONT-RIGHT        — RIGHT
// ─────────────────────────────────────────────────────────────────────────────

const DEG = THREE.MathUtils.degToRad

export default function Drone() {
    const droneRef = useRef<THREE.Group>(null)
    const emissiveMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

    const { scene, materials } = useGLTF('/drone.glb')

    useEffect(() => {
        const materialName = Object.keys(materials).find(name =>
            name.toLowerCase().includes('light') ||
            name.toLowerCase().includes('glass') ||
            name.toLowerCase().includes('emiss')
        )
        if (materialName) {
            emissiveMaterialRef.current = materials[materialName] as THREE.MeshStandardMaterial
        } else if (Object.values(materials).length > 0) {
            emissiveMaterialRef.current = Object.values(materials)[0] as THREE.MeshStandardMaterial
        }
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [scene, materials])

    useGSAP(() => {
        if (!droneRef.current) return

        // ── Pin the initial pose IMMEDIATELY via gsap.set() ──────────────────
        // fromTo() renders EVERY "from" state at timeline-creation time,
        // so the LAST fromTo() call would win, leaving the drone at the wrong
        // pose on first load. Using to() + gsap.set() avoids this entirely.
        gsap.set(droneRef.current.position, { x: -3.5, y: 0.8, z: 0.0 })
        gsap.set(droneRef.current.rotation, { x: DEG(65), y: DEG(-90), z: DEG(-5) })
        gsap.set(droneRef.current.scale, { x: 1.0, y: 1.0, z: 1.0 })
        if (emissiveMaterialRef.current) {
            gsap.set(emissiveMaterialRef.current, { emissiveIntensity: 5 })
        }

        // ── ScrollTrigger timeline ────────────────────────────────────────────
        // Uses to() only — animates FROM current/previous state TO new target.
        // Scrub runs it backwards on scroll-up automatically.
        // 5 transitions × duration-1 = 5-unit total timeline.
        // invalidateOnRefresh recalculates bounds after window resize / refresh.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
                invalidateOnRefresh: true,
            }
        })

        // ── 0→1  Hero → The Shallows ─────────────────────────────────────────
        // Card LEFT → drone RIGHT clear zone. Side silhouette (x-tilt → 0).
        tl.to(droneRef.current.position,
            { x: 4.0, y: 0.2, z: 2.0, ease: 'power2.inOut', duration: 1 })
        tl.to(droneRef.current.rotation,
            { x: DEG(0), y: DEG(-90), z: DEG(0), ease: 'power2.inOut', duration: 1 }, '<')

        // ── 1→2  Shallows → Engineering Perfection ───────────────────────────
        // Card RIGHT → drone LEFT clear zone. 180° yaw exposes left side.
        tl.to(droneRef.current.position,
            { x: -4.0, y: 0.2, z: 2.0, ease: 'power2.inOut', duration: 1 })
        tl.to(droneRef.current.rotation,
            { x: DEG(0), y: DEG(90), z: DEG(5), ease: 'power2.inOut', duration: 1 }, '<')

        // ── 2→3  Engineering → Into the Void ─────────────────────────────────
        // Center card. Drone dives nose-first toward camera.
        tl.to(droneRef.current.position,
            { x: 0.0, y: -0.5, z: 3.5, ease: 'power2.inOut', duration: 1 })
        tl.to(droneRef.current.rotation,
            { x: DEG(30), y: DEG(180), z: DEG(0), ease: 'power2.inOut', duration: 1 }, '<')
        if (emissiveMaterialRef.current) {
            tl.to(emissiveMaterialRef.current,
                { emissiveIntensity: 25, ease: 'power2.in', duration: 1 }, '<')
        }

        // ── 3→4  Into the Void → Built for the Impossible ────────────────────
        // Cinematic low-angle. Drone grows and tilts up — looming presence.
        tl.to(droneRef.current.position,
            { x: -1.0, y: -3.5, z: 5.5, ease: 'power2.inOut', duration: 1 })
        tl.to(droneRef.current.rotation,
            { x: DEG(-15), y: DEG(225), z: DEG(12), ease: 'power2.inOut', duration: 1 }, '<')
        tl.to(droneRef.current.scale,
            { x: 1.55, y: 1.55, z: 1.55, ease: 'power2.inOut', duration: 1 }, '<')
        if (emissiveMaterialRef.current) {
            tl.to(emissiveMaterialRef.current,
                { emissiveIntensity: 50, ease: 'power2.in', duration: 1 }, '<')
        }

        // ── 4→5  Impossible → Pre-Order ──────────────────────────────────────
        // Classic 3/4 front-right product shot on RIGHT. Scale back to 1.
        tl.to(droneRef.current.position,
            { x: 2.0, y: -1.8, z: 2.5, ease: 'power1.inOut', duration: 1 })
        tl.to(droneRef.current.rotation,
            { x: DEG(10), y: DEG(135), z: DEG(0), ease: 'power1.inOut', duration: 1 }, '<')
        tl.to(droneRef.current.scale,
            { x: 1.0, y: 1.0, z: 1.0, ease: 'power1.inOut', duration: 1 }, '<')
        if (emissiveMaterialRef.current) {
            tl.to(emissiveMaterialRef.current,
                { emissiveIntensity: 10, ease: 'power1.out', duration: 1 }, '<')
        }

    }, { dependencies: [scene, materials] })

    return (
        <group
            ref={droneRef}
            // Hero: LEFT side (-3.5x), top-down angle
            position={[-3.5, 0.8, 0]}
            rotation={[DEG(65), DEG(-90), DEG(-5)]}
        >
            <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.35}>
                <Center top>
                    <primitive object={scene} scale={95} />
                </Center>
            </Float>
        </group>
    )
}

useGLTF.preload('/drone.glb')
