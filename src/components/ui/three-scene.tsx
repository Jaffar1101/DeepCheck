import { Canvas } from '@react-three/fiber';
import { Stars, Float, OrbitControls, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { Points, Color } from 'three';

interface ParticleSystemProps {
  count: number;
}

function ParticleSystem({ count }: ParticleSystemProps) {
  const mesh = useRef<Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = new Color();
      color.setHSL(Math.random() * 0.1 + 0.7, 1, 0.5); // Purple/cyan range
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[4, -1, -3]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[2, 3, -4]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
}

function GeometricShapes() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[-2, 1, 0]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
        <mesh position={[2, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.2, 1.2, 0.2]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[0, 2, -2]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
    </>
  );
}

export function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ background: 'transparent' }}
    >
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <Environment preset="night" />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#06b6d4" />
      
      <Stars
        radius={300}
        depth={60}
        count={800}
        factor={7}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <ParticleSystem count={100} />
      <FloatingOrbs />
      <GeometricShapes />
    </Canvas>
  );
}