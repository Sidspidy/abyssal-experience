'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Generate initial particle locations outside the render loop
const COUNT = 150
const PARTICLE_DATA = Array.from({ length: COUNT }, () => ({
    position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    ),
    speed: (Math.random() + 0.5) * 0.01,
    type: Math.random() > 0.5 ? 'bubble' : 'snow'
}))

export default function EnvironmentEffects() {
    const { scene } = useThree()

    const particlesRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const backgroundRef = useRef<THREE.Color>(null)
    const fogRef = useRef<THREE.FogExp2>(null)

    useGSAP(() => {
        if (!backgroundRef.current) return

        const colorProxy = {
            r: 135 / 255,
            g: 206 / 255,
            b: 235 / 255
        }

        const updateColor = () => {
            if (backgroundRef.current) {
                backgroundRef.current.setRGB(colorProxy.r, colorProxy.g, colorProxy.b)
            }
            if (fogRef.current && backgroundRef.current) {
                fogRef.current.color.copy(backgroundRef.current)
            }
        }

        updateColor()

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })

        // 0 -> 0.2: Surface to Shallows (Strong Turquoise/Sea Blue)
        tl.to(colorProxy, { r: 0 / 255, g: 157 / 255, b: 196 / 255, ease: 'none', onUpdate: updateColor }, 0)

        // 0.2 -> 0.4: Shallows to Reef (Deeper Blue)
        tl.to(colorProxy, { r: 5 / 255, g: 50 / 255, b: 120 / 255, ease: 'none', onUpdate: updateColor }, 0.2)

        // 0.4 -> 0.6: Reef to Twilight (Midnight Blue)
        tl.to(colorProxy, { r: 2 / 255, g: 15 / 255, b: 45 / 255, ease: 'none', onUpdate: updateColor }, 0.4)

        // 0.6 -> 0.8: Twilight to Trench (Near Black)
        tl.to(colorProxy, { r: 1 / 255, g: 5 / 255, b: 20 / 255, ease: 'none', onUpdate: updateColor }, 0.6)

        // 0.8 -> 1.0: Trench to Seabed (Pitch Black)
        tl.to(colorProxy, { r: 0, g: 0, b: 0, ease: 'none', onUpdate: updateColor }, 0.8)

    }, []) // Accessing refs during render is illegal; empty deps is fine as GSAP runs after mount

    useFrame(() => {
        if (!particlesRef.current) return
        PARTICLE_DATA.forEach((data, i) => {
            if (data.type === 'bubble') {
                data.position.y += data.speed
                if (data.position.y > 10) data.position.y = -10
            } else {
                data.position.y -= data.speed * 0.5
                if (data.position.y < -10) data.position.y = 10
            }
            data.position.x += Math.sin(data.position.y) * 0.005
            dummy.position.copy(data.position)
            dummy.updateMatrix()
            particlesRef.current!.setMatrixAt(i, dummy.matrix)
        })
        particlesRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <>
            <color ref={backgroundRef} attach="background" args={['#87CEEB']} />
            <fogExp2 ref={fogRef} attach="fog" args={['#87CEEB', 0.05]} />

            <instancedMesh ref={particlesRef} args={[undefined, undefined, COUNT]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
            </instancedMesh>
        </>
    )
}
