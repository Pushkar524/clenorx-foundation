"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Coin({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += speed * 0.02;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function RupeeSymbol({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.08, 16, 40]} />
      <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function PiggyBank({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#EC4899" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[0.3, 0.1, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 16]} />
        <meshStandardMaterial color="#DB2777" />
      </mesh>
    </group>
  );
}

function Book({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.2;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.65, 0.1]} />
      <meshStandardMaterial color="#22C55E" metalness={0.1} roughness={0.7} />
    </mesh>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  const sparkleRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!sparkleRef.current) return;
    sparkleRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={sparkleRef} geometry={geo}>
      <pointsMaterial color="#2563EB" size={0.04} transparent opacity={0.6} />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 0]} color="#2563EB" intensity={0.8} />
      <pointLight position={[5, -3, 2]} color="#22C55E" intensity={0.6} />

      <Stars radius={60} depth={50} count={1500} factor={3} saturation={0.5} fade speed={1} />
      <ParticleField />

      {/* Coins */}
      <Coin position={[-3.5, 1.5, -1]} color="#F59E0B" speed={0.9} />
      <Coin position={[3.2, 0.8, -0.5]} color="#F59E0B" speed={1.1} />
      <Coin position={[-2, -1.2, 0]} color="#EAB308" speed={0.7} />
      <Coin position={[2.5, -1.8, -1]} color="#F59E0B" speed={1.3} />
      <Coin position={[0.5, 2.2, -1.5]} color="#F59E0B" speed={0.85} />
      <Coin position={[-1, 0.2, 1]} color="#EAB308" speed={1.05} />

      {/* Rupee symbols */}
      <RupeeSymbol position={[-2.5, 0, -0.5]} />
      <RupeeSymbol position={[2, 1.5, -1]} />

      {/* Piggy banks */}
      <PiggyBank position={[-1.5, -0.5, 1]} />
      <PiggyBank position={[3, -0.5, -1]} />

      {/* Books */}
      <Book position={[1, 0.5, 0.5]} />
      <Book position={[-3, -0.8, 0]} />
    </Canvas>
  );
}
