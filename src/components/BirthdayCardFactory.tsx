import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Card, { CardProps } from "./Card";

export default function BirthdayCardFactory(card: CardProps) {
  return (
    <Canvas shadows camera={{ fov: 100, position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        decay={2}
        castShadow
      />
      <Card {...card} />
      <OrbitControls makeDefault={true} enablePan={false} target={[0, 0, 0]} />
    </Canvas>
  );
}
