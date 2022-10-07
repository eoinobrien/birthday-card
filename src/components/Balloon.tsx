import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type BalloonProps = {
  color: string;
  rising?: boolean;
  speed?: number;
};

type BalloonGLTF = GLTF & {
  nodes: {
    String1_Ballon: THREE.Mesh;
    Ballon_Balloon: THREE.Mesh;
  };
  materials: {
    lambert2SG: THREE.MeshStandardMaterial;
    blinn1SG: THREE.MeshStandardMaterial;
  };
};

export default function Balloon({
  color,
  rising = false,
  speed = 0.01,
  ...props
}: BalloonProps & ThreeElements["group"]) {
  const [isBalloonRising, setIsBalloonRising] = useState<boolean>(rising);

  const balloon = useRef<THREE.Group>(null!);

  const { nodes, materials } = useGLTF(
    "models/balloon.gltf"
  ) as unknown as BalloonGLTF;

  useFrame(() => {
    balloon.current.rotation.y += speed;

    balloon.current.position.y += isBalloonRising ? speed : -speed;

    if (balloon.current.position.y > 1) {
      setIsBalloonRising(false);
    } else if (balloon.current.position.y < -3) {
      setIsBalloonRising(true);
    }
  });

  return (
    <group ref={balloon} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.String1_Ballon.geometry}
        material={materials.lambert2SG}
      >
        <meshPhysicalMaterial color="grey" sheenRoughness={2} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ballon_Balloon.geometry}
        material={materials.blinn1SG}
      >
        <meshPhysicalMaterial color={color} sheenRoughness={2} />
      </mesh>
    </group>
  );
}
