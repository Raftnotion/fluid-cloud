"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FluidSphereProps {
    trafficScale?: number;
    ambient?: boolean;
}

const SphereMesh: React.FC<FluidSphereProps> = ({ trafficScale = 0.1, ambient = false }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || !wireRef.current) return;

        const time = state.clock.getElapsedTime();

        // Simplified breathing animation
        const breath = ambient ? (Math.sin(time * 0.5) * 0.5 + 0.5) : trafficScale;

        // Slow rotation only
        meshRef.current.rotation.y = time * 0.1;
        wireRef.current.rotation.y = -time * 0.08;

        // Scale
        const scale = 1.2 + (breath * 0.4);
        meshRef.current.scale.setScalar(scale);
        wireRef.current.scale.setScalar(scale * 1.02);
    });

    return (
        <>
            {/* Lower polygon count: 64x64 instead of 128x128 */}
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#050505"
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.3}
                    speed={1.5}
                />
            </Sphere>
            {/* Even lower for wireframe: 24x24 instead of 32x32 */}
            <Sphere ref={wireRef} args={[1, 24, 24]}>
                <meshBasicMaterial
                    color="#CCFF00"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Sphere>
        </>
    );
};

const FluidSphere: React.FC<FluidSphereProps> = ({ trafficScale = 0.1, ambient = false }) => {
    return (
        <div className="w-full h-full min-h-[400px] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: false, // Disable for better performance
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]} // Limit pixel ratio
                frameloop="demand" // Only render when needed
            >
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#CCFF00" />
                <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
                    <SphereMesh trafficScale={trafficScale} ambient={ambient} />
                </Float>
            </Canvas>
        </div>
    );
};

export default FluidSphere;
