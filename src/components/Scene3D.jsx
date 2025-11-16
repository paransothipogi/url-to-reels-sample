import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.3;
    meshRef.current.rotation.y = Math.sin(t / 2) * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#39FF14"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function AnimatedTorus() {
  const torusRef = useRef();

  useFrame((state) => {
    torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    torusRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={torusRef} position={[2, -0.5, 0]}>
      <torusGeometry args={[0.8, 0.25, 16, 100]} />
      <meshStandardMaterial
        color="#F7B6E4"
        emissive="#F7B6E4"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#F7B6E4" intensity={0.4} />
        
        <AnimatedSphere />
        <AnimatedTorus />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
