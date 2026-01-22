"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FluidSphereProps {
    trafficScale?: number;
    ambient?: boolean;
}

// The actual 3D mesh - optimized
const SphereMesh: React.FC<{ breath: number }> = ({ breath }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);
    const frameCount = useRef(0);

    useFrame((state) => {
        if (!meshRef.current || !wireRef.current) return;

        // Throttle to ~30fps instead of 60fps
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        const time = state.clock.getElapsedTime();

        // Simple slow rotation
        meshRef.current.rotation.y = time * 0.08;
        wireRef.current.rotation.y = -time * 0.06;

        // Smooth breathing scale
        const scale = 1.15 + (breath * 0.35);
        meshRef.current.scale.setScalar(scale);
        wireRef.current.scale.setScalar(scale * 1.02);
    });

    return (
        <>
            {/* Main sphere - reduced polygons: 48x48 */}
            <Sphere ref={meshRef} args={[1, 48, 48]}>
                <MeshDistortMaterial
                    color="#080808"
                    roughness={0.3}
                    metalness={0.7}
                    distort={0.25}
                    speed={1}
                />
            </Sphere>
            {/* Wireframe overlay - very low poly: 16x16 */}
            <Sphere ref={wireRef} args={[1, 16, 16]}>
                <meshBasicMaterial
                    color="#CCFF00"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </Sphere>
        </>
    );
};

const FluidSphere: React.FC<FluidSphereProps> = ({ trafficScale = 0.1, ambient = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [breath, setBreath] = useState(0.5);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer - only render when visible
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Breathing animation using requestAnimationFrame (lighter than useFrame)
    useEffect(() => {
        if (!isVisible || !ambient) return;

        let animationId: number;
        let startTime = Date.now();

        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            setBreath(Math.sin(elapsed * 0.5) * 0.5 + 0.5);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isVisible, ambient]);

    // Mobile fallback - simple CSS glow
    if (isMobile) {
        return (
            <div
                ref={containerRef}
                className="w-full h-full min-h-[400px] flex items-center justify-center"
            >
                <div
                    className="rounded-full animate-pulse"
                    style={{
                        width: 200,
                        height: 200,
                        background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, rgba(204,255,0,0.05) 50%, transparent 70%)',
                        boxShadow: '0 0 80px rgba(204,255,0,0.2), inset 0 0 60px rgba(204,255,0,0.1)',
                        border: '1px solid rgba(204,255,0,0.1)',
                    }}
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[400px] pointer-events-none"
        >
            {isVisible && (
                <Canvas
                    camera={{ position: [0, 0, 4.5], fov: 45 }}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: false,
                    }}
                    dpr={[1, 1.5]}
                    frameloop="always"
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.3} />
                    <spotLight
                        position={[8, 8, 8]}
                        angle={0.25}
                        penumbra={1}
                        intensity={1}
                        color="#CCFF00"
                    />
                    <SphereMesh breath={ambient ? breath : trafficScale} />
                </Canvas>
            )}
        </div>
    );
};

export default FluidSphere;
