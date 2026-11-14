import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = { route: string; reducedMotion: boolean; onError: () => void };
const labels = ["RAG", "NLP", "LangGraph", "FastAPI", "ChromaDB", "Ollama", "Scikit-Learn"];

const ScenePoints = ({ route, reducedMotion }: { route: string; reducedMotion: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.BufferAttribute>(null);
  const [pointer, setPointer] = useState(new THREE.Vector3(0, 0, 0));
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 1200;
  const focus = route.includes("projects") ? 1 : route.includes("skills") ? 3 : 0;
  const positions = useMemo(() => Array.from({ length: count }, (_, index) => {
    const cluster = index % labels.length;
    const angle = index * 2.39996;
    const radius = 0.3 + ((index * 17) % 100) / 100;
    return new THREE.Vector3(Math.cos(angle) * radius + (cluster - 3) * 0.55, Math.sin(angle) * radius * 0.75 + ((index * 13) % 50) / 80, Math.sin(angle * 0.7) * 0.8);
  }), [count]);

  useEffect(() => {
    const move = (event: MouseEvent) => setPointer(new THREE.Vector3((event.clientX / window.innerWidth - 0.5) * 5, -(event.clientY / window.innerHeight - 0.5) * 3, 0));
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current || !points.current) return;
    if (!reducedMotion) {
      group.current.rotation.y = clock.getElapsedTime() * 0.035;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.18) * 0.08;
    }
    group.current.position.y += (pointer.y * 0.02 - group.current.position.y) * 0.03;
    const nearest = positions.map((position, index) => ({ position, distance: position.distanceTo(pointer), index })).sort((left, right) => left.distance - right.distance).slice(0, 4);
    if (lines.current) {
      nearest.forEach((neighbor, index) => {
        const offset = index * 6;
        lines.current!.array[offset] = pointer.x;
        lines.current!.array[offset + 1] = pointer.y;
        lines.current!.array[offset + 2] = pointer.z;
        lines.current!.array[offset + 3] = neighbor.position.x;
        lines.current!.array[offset + 4] = neighbor.position.y;
        lines.current!.array[offset + 5] = neighbor.position.z;
      });
      lines.current.needsUpdate = true;
    }
    const matrix = new THREE.Matrix4();
    positions.forEach((position, index) => {
      matrix.makeTranslation(position.x, position.y, position.z);
      points.current!.setMatrixAt(index, matrix);
    });
    points.current.instanceMatrix.needsUpdate = true;
  });

  return <group ref={group} scale={0.9}><instancedMesh ref={points} args={[undefined, undefined, count]}><sphereGeometry args={[0.012, 5, 5]} /><meshBasicMaterial color="#181818" transparent opacity={0.42} /></instancedMesh><lineSegments><bufferGeometry><bufferAttribute ref={lines} attach="attributes-position" count={labels.length * 2} array={new Float32Array(labels.length * 6)} itemSize={3} /></bufferGeometry><lineBasicMaterial color="#E12D26" transparent opacity={0.18} /></lineSegments><mesh position={[(focus - 3) * 0.55, 0, 0]}><sphereGeometry args={[0.06, 8, 8]} /><meshBasicMaterial color="#E12D26" transparent opacity={0.45} /></mesh></group>;
};

const EmbeddingScene = ({ route, reducedMotion, onError }: Props) => {
  try {
    return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }} frameloop={reducedMotion ? "demand" : "always"} onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); }}><ScenePoints route={route} reducedMotion={reducedMotion} /></Canvas>;
  } catch {
    onError();
    return null;
  }
};

export default EmbeddingScene;
