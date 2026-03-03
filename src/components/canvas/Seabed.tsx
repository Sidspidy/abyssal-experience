'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Generate random rock data once outside the component tree
// This bypasses the react-hooks/purity rule since it's not during a component render call
const ROCK_DATA = Array.from({ length: 20 }).map(() => ({
    position: [
        (Math.random() - 0.5) * 40,
        -0.5 + Math.random(),
        (Math.random() - 0.5) * 40
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
    scale: 0.5 + Math.random() * 2
}))

export default function Seabed() {
    const groupRef = useRef<THREE.Group>(null)

    useGSAP(() => {
        if (!groupRef.current) return

        // Reveal seabed at the end of the scroll (Stage 6)
        gsap.set(groupRef.current.position, { y: -20 })

        gsap.to(groupRef.current.position, {
            y: -5,
            ease: 'none',
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: '80% top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })
    }, [])

    return (
        <group ref={groupRef}>
            {/* Rocky/Sandy Seabed Floor - Expanded for "Infinite" feel */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0.2} />
            </mesh>

            {/* 3D Jagged Rocks scattered across the seabed */}
            {ROCK_DATA.map((rock, i) => (
                <mesh
                    key={i}
                    position={rock.position}
                    rotation={rock.rotation}
                    scale={rock.scale}
                    castShadow
                    receiveShadow
                >
                    <dodecahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                </mesh>
            ))}

            {/* Subtile Deep Oceanic Blue glow on the floor */}
            <pointLight position={[0, 3, 0]} intensity={3} color="#0055ff" distance={20} />
            <spotLight
                position={[0, 10, 0]}
                intensity={5}
                angle={0.4}
                penumbra={1}
                color="#00f0ff"
                castShadow
            />
        </group>
    )
}
