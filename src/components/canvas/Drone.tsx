'use client'

import { useRef, useEffect } from 'react'
import { useGLTF, Center, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

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
        if (!droneRef.current || !emissiveMaterialRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })

        // ─────────────────────────────────────────────────
        // Section 1 → 2: Hero (LEFT, top-angle) → Shallows (RIGHT)
        // Card is on the RIGHT, so drone moves LEFT
        // ─────────────────────────────────────────────────
        tl.to(droneRef.current.position, {
            x: -3, y: 0, z: 2,
            ease: 'power2.inOut'
        }, 0)
        tl.to(droneRef.current.rotation, {
            x: THREE.MathUtils.degToRad(10),
            y: THREE.MathUtils.degToRad(-30),   // angled left, showing front-left
            z: THREE.MathUtils.degToRad(-8),
            ease: 'power2.inOut'
        }, 0)

        // ─────────────────────────────────────────────────
        // Section 2 → 3: Shallows → Engineering (LEFT card)
        // Card is on the LEFT, so drone moves RIGHT
        // ─────────────────────────────────────────────────
        tl.to(droneRef.current.position, {
            x: 8, y: 0.5, z: 1,
            ease: 'power2.inOut'
        }, 0.18)
        tl.to(droneRef.current.rotation, {
            x: THREE.MathUtils.degToRad(-5),
            y: THREE.MathUtils.degToRad(200),   // rear three-quarter view
            z: THREE.MathUtils.degToRad(5),
            ease: 'power2.inOut'
        }, 0.18)

        // ─────────────────────────────────────────────────
        // Section 3 → 4: Engineering → Into the Void (CENTER)
        // Center text, drone moves CENTER and faces camera
        // ─────────────────────────────────────────────────
        tl.to(droneRef.current.position, {
            x: 0, y: -0.5, z: 3,
            ease: 'power2.inOut'
        }, 0.38)
        tl.to(droneRef.current.rotation, {
            x: THREE.MathUtils.degToRad(15),    // nose slightly down — diving
            y: THREE.MathUtils.degToRad(0),     // facing camera straight
            z: THREE.MathUtils.degToRad(0),
            ease: 'power2.inOut'
        }, 0.38)
        tl.to(emissiveMaterialRef.current, {
            emissiveIntensity: 15,
            ease: 'power1.in'
        }, 0.38)

        // ─────────────────────────────────────────────────
        // Section 4 → 5: Into the Void → Built for Impossible (CENTER)
        // Dramatic — scale up, push closer, low-angle
        // ─────────────────────────────────────────────────
        tl.to(droneRef.current.position, {
            x: -1, y: -1.5, z: 5,
            ease: 'power2.inOut'
        }, 0.58)
        tl.to(droneRef.current.rotation, {
            x: THREE.MathUtils.degToRad(-15),   // camera looking UP at drone
            y: THREE.MathUtils.degToRad(-45),   // dramatic three-quarter
            z: THREE.MathUtils.degToRad(10),    // slight roll
            ease: 'power2.inOut'
        }, 0.58)
        tl.to(droneRef.current.scale, {
            x: 1.4, y: 1.4, z: 1.4,
            ease: 'power2.inOut'
        }, 0.58)
        tl.to(emissiveMaterialRef.current, {
            emissiveIntensity: 25,
            ease: 'power1.in'
        }, 0.58)

        // ─────────────────────────────────────────────────
        // Section 5 → 6: Impossible → Pre-Order (CENTER-RIGHT)
        // Settle, calm, composed — product shot angle
        // ─────────────────────────────────────────────────
        tl.to(droneRef.current.position, {
            x: 1, y: -2, z: 2,
            ease: 'power1.inOut'
        }, 0.8)
        tl.to(droneRef.current.rotation, {
            x: THREE.MathUtils.degToRad(8),
            y: THREE.MathUtils.degToRad(25),    // classic product angle
            z: THREE.MathUtils.degToRad(0),
            ease: 'power1.inOut'
        }, 0.8)
        tl.to(droneRef.current.scale, {
            x: 1, y: 1, z: 1,
            ease: 'power1.inOut'
        }, 0.8)

    }, { dependencies: [scene, materials] })

    return (
        <group
            ref={droneRef}
            position={[-3.5, 0.8, 0]}
            rotation={[
                THREE.MathUtils.degToRad(65),
                THREE.MathUtils.degToRad(-90),
                THREE.MathUtils.degToRad(-5),
            ]}
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
