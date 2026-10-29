/* eslint-disable react/no-unknown-property -- props do React Three Fiber (position, args...) */
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { useTheme } from '../../hooks/useTheme';
import { themeColors } from '../../lib/theme';

/** Nó de toro em arame: gira sozinho, inclina para o mouse e acompanha a rolagem. */
function Knot({ color }) {
  const group = useRef(null);
  const spin = useRef(null);

  useFrame(({ pointer }, delta) => {
    if (!group.current || !spin.current) return;
    const ease = 1 - Math.exp(-delta * 4);
    const scrollTilt = Math.min(window.scrollY / 500, 1.2);
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.6 + scrollTilt,
      ease,
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.8,
      ease,
    );
    spin.current.rotation.y += delta * 0.35;
    spin.current.rotation.z += delta * 0.12;
  });

  return (
    <group ref={group}>
      <mesh ref={spin}>
        <torusKnotGeometry args={[1, 0.32, 96, 12]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/**
 * Cena 3D da home. Fica em um chunk próprio (três.js é pesado) e só é importada
 * pelo Hero depois que o navegador está ocioso e a tela é grande.
 * `onReady` avisa o Hero para esconder a ilustração SVG que ocupava o lugar.
 */
export default function HeroScene({ onReady }) {
  const { theme } = useTheme();
  const wrapper = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pausa a renderização quando a cena sai da tela: economiza bateria e CPU.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        frameloop={visible ? 'always' : 'never'}
        eventSource={document.body}
        eventPrefix="client"
        onCreated={onReady}
      >
        <Knot color={themeColors[theme].accent} />
      </Canvas>
    </div>
  );
}
