import { Component, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="scene-fallback" aria-label="Abstract sculptural ring">
        <div className="fallback-ring" />
      </div>
    ) : (
      this.props.children
    );
  }
}

function Sculpture({ reduce, compact }) {
  const group = useRef();
  const scroll = useRef(0);
  useEffect(() => {
    const handle = () => {
      scroll.current = Math.min(
        window.scrollY / Math.max(window.innerHeight, 1),
        1,
      );
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useFrame(({ pointer }, delta) => {
    if (!group.current || reduce) return;
    const smoothing = Math.min(delta * 2.5, 1);
    group.current.rotation.x +=
      (-0.2 +
        pointer.y * 0.12 +
        scroll.current * 0.35 -
        group.current.rotation.x) *
      smoothing;
    group.current.rotation.y +=
      (0.42 +
        pointer.x * 0.2 +
        scroll.current * 0.6 -
        group.current.rotation.y) *
      smoothing;
    group.current.position.y = Math.sin(performance.now() * 0.0007) * 0.07;
  });
  return (
    <group ref={group} rotation={[-0.2, 0.42, 0.15]}>
      <mesh castShadow>
        <torusKnotGeometry
          args={[1.2, 0.36, compact ? 88 : 160, compact ? 10 : 18, 2, 3]}
        />
        <meshPhysicalMaterial
          color="#acb8b2"
          metalness={0.62}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh rotation={[0.45, 0.35, 0.1]}>
        <torusGeometry args={[1.95, 0.009, 3, 96]} />
        <meshBasicMaterial color="#a2afa5" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const reduce = useReducedMotion();
  const compact = window.matchMedia("(max-width: 780px)").matches;
  return (
    <SceneBoundary>
      <Canvas
        className="hero-canvas"
        dpr={compact ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{ antialias: !compact, alpha: true, powerPreference: "low-power" }}
        fallback={
          <div className="scene-fallback">
            <div className="fallback-ring" />
          </div>
        }
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 5]} intensity={2} color="#eef1e9" />
        <pointLight position={[-3, -2, 2]} intensity={8} color="#6a8594" />
        <pointLight position={[2, -3, 2]} intensity={5} color="#c8d4b5" />
        <Sculpture reduce={reduce} compact={compact} />
      </Canvas>
    </SceneBoundary>
  );
}
