'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Drone from './Drone'
import EnvironmentEffects from './EnvironmentEffects'
import Beach from './Beach'
import Seabed from './Seabed'
import AtmosphericLights from './AtmosphericLights'
import MarineLife from './MarineLife'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'

export default function Scene() {

    return (
        <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ powerPreference: 'high-performance', alpha: false, antialias: false }}
                camera={{ position: [0, 2, 12], fov: 50 }}
            >


                <ambientLight intensity={1.5} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={3}
                    castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />

                <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="red" /></mesh>}>
                    <EnvironmentEffects />
                    <Beach />
                    <Seabed />
                    <MarineLife />
                    <Drone />
                    <Environment preset="city" />

                    <EffectComposer enableNormalPass={false}>
                        <Bloom intensity={0.5} luminanceThreshold={0.8} />
                        <Noise opacity={0.05} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
