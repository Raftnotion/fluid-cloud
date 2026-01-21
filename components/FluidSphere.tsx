
import React, { useRef, useMemo } from 'react';
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
  const { mouse } = useThree();
  
  const activeColor = new THREE.Color('#CCFF00');

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Internal oscillator for "breathing" if ambient, otherwise use trafficScale
    const breath = ambient ? (Math.sin(time * 0.8) * 0.5 + 0.5) : trafficScale;
    
    // Smooth mouse reaction
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.5;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    wireRef.current.position.copy(meshRef.current.position);

    // Dynamic Rotation
    const rotationSpeed = 0.2 + (breath * 2);
    meshRef.current.rotation.y = time * 0.1 * rotationSpeed;
    wireRef.current.rotation.y = -time * 0.15 * rotationSpeed;

    // Organic Pulse - Expansion/Contraction
    const scale = 1.3 + (breath * 0.6);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    wireRef.current.scale.setScalar(meshRef.current.scale.x * 1.01);
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color="#050505"
          roughness={0.1}
          metalness={1}
          distort={0.4 + (trafficScale * 0.3)}
          speed={2}
        />
      </Sphere>
      <Sphere ref={wireRef} args={[1, 32, 32]}>
        <meshBasicMaterial 
          color="#CCFF00" 
          wireframe 
          transparent 
          opacity={0.1 + (trafficScale * 0.3)} 
        />
      </Sphere>
    </>
  );
};

const FluidSphere: React.FC<FluidSphereProps> = ({ trafficScale = 0.1, ambient = false }) => {
  return (
    <div className="w-full h-full min-h-[400px] cursor-none pointer-events-none" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#CCFF00" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#333" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <SphereMesh trafficScale={trafficScale} ambient={ambient} />
        </Float>
      </Canvas>
    </div>
  );
};

export default FluidSphere;
