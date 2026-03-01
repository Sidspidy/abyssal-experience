'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Beach() {
    const groupRef = useRef<THREE.Group>(null)

    useGSAP(() => {
        if (!groupRef.current) return

        // Hide beach after Stage 1 (top scroll)
        gsap.to(groupRef.current.position, {
            y: 12,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: '20% top',
                scrub: 1,
            }
        })
    }, [])

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {/* Ocean surface — blends with the sky background, no sand visible */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial
                    color="#0e6e8e"
                    roughness={0.6}
                    metalness={0.2}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Subtle water surface caustics / distortion */}
            <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[120, 120, 64, 64]} />
                <MeshDistortMaterial
                    color="#1a8eae"
                    opacity={0.35}
                    transparent
                    distort={0.15}
                    speed={0.8}
                    metalness={0.3}
                    roughness={0.4}
                />
            </mesh>
        </group>
    )
}
