'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function AtmosphericLights() {
    const groupRef = useRef<THREE.Group>(null)

    useGSAP(() => {
        if (!groupRef.current) return

        // God-rays only visible at the top (Shallows)
        // They fade out as you scroll down
        gsap.to(groupRef.current.children.map(c => (c as THREE.Mesh).material), {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: '40% top',
                scrub: 1,
            }
        })
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.children.forEach((child, i) => {
            child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01
        })
    })

    return (
        <group ref={groupRef}>
            {/* God-rays (Increased intensity and density) */}
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh
                    key={i}
                    position={[(Math.random() - 0.5) * 20, 10, (Math.random() - 0.5) * 15]}
                    rotation={[0.2, 0, (Math.random() - 0.5) * 1]}
                >
                    <planeGeometry args={[0.5 + Math.random(), 30]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.2 + Math.random() * 0.2}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    )
}
