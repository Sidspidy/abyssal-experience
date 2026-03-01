'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function MarineLife() {
    const groupRef = useRef<THREE.Group>(null)

    // Generate random fish data
    const fishData = useMemo(() => {
        return Array.from({ length: 20 }).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 10 - 2,
                (Math.random() - 0.5) * 20 - 10
            ),
            speed: 0.01 + Math.random() * 0.02,
            size: 0.1 + Math.random() * 0.3,
        }))
    }, [])

    useGSAP(() => {
        if (!groupRef.current) return

        // Reveal fish in the Reef stage (Stage 3)
        gsap.set(groupRef.current.children.map(c => (c as THREE.Mesh).material), { opacity: 0 })

        gsap.to(groupRef.current.children.map(c => (c as THREE.Mesh).material), {
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: '20% top',
                end: '40% top',
                scrub: 1,
            }
        })

        // Fade out fish after Reef stage
        gsap.to(groupRef.current.children.map(c => (c as THREE.Mesh).material), {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: '50% top',
                end: '70% top',
                scrub: 1,
            }
        })
    }, [])

    useFrame((state, delta) => {
        if (!groupRef.current) return
        groupRef.current.children.forEach((child, i) => {
            const data = fishData[i]
            child.position.x += data.speed
            // Reset position if out of bounds
            if (child.position.x > 20) child.position.x = -20

            // Subtle vertical wave
            child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002
        })
    })

    return (
        <group ref={groupRef}>
            {fishData.map((data, i) => (
                <mesh key={i} position={data.position}>
                    <planeGeometry args={[data.size, data.size * 0.5]} />
                    <meshBasicMaterial
                        color="#000000"
                        transparent
                        opacity={0}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    )
}
