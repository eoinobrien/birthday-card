import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, Color } from "@react-three/fiber";
import reportWebVitals from "./reportWebVitals";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import "./index.css";

const ANGLES = {
  closed: {
    left: 170,
  },
  open: {
    left: 30,
  },
};

const getAngleFromRadian = (radian: number) => {
  return radian / (Math.PI / 180);
};

const getRadianFromAngle = (angle: number) => {
  return (Math.PI / 180) * angle;
};

type SheetProps = {
  pageHeight: number;
  textures: string[];
  isHorizontal?: boolean;
  color?: Color;
  children?: React.ReactNode;
};

function Sheet({
  pageHeight,
  textures,
  isHorizontal,
  color = "white",
  children,
  ...props
}: SheetProps & ThreeElements["mesh"]) {
  const shortLength = pageHeight;
  const longLength = pageHeight * 1.4142;
  const [inside, outside] = useTexture(textures);

  return (
    <mesh {...props} castShadow receiveShadow>
      <boxGeometry
        args={[
          isHorizontal ? longLength : shortLength,
          isHorizontal ? shortLength : longLength,
          0.005,
        ]}
      />
      <meshBasicMaterial attach="material-0" color={color} />
      <meshBasicMaterial attach="material-1" color={color} />
      <meshBasicMaterial attach="material-2" color={color} />
      <meshBasicMaterial attach="material-3" color={color} />
      <meshPhysicalMaterial
        attach="material-4"
        map={inside}
        color={color}
        sheenRoughness={2}
      />
      <meshPhysicalMaterial
        attach="material-5"
        map={outside}
        color={color}
        sheenRoughness={2}
      />
      {children}
    </mesh>
  );
}

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

function Balloon({
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

function Card() {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const left = useRef<THREE.Group>(null!);
  const right = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (
      isCardOpen &&
      getAngleFromRadian(left.current.rotation.y) > ANGLES.open.left
    ) {
      left.current.rotation.y -= getRadianFromAngle(2);
    }

    if (
      !isCardOpen &&
      getAngleFromRadian(left.current.rotation.y) < ANGLES.closed.left
    ) {
      left.current.rotation.y += getRadianFromAngle(2);
    }
  });

  return (
    <group onClick={() => setIsCardOpen(!isCardOpen)}>
      <group ref={left} position={[0, 0, 0]}>
        <Balloon color="red" position={[-2.5, -1, -2]} scale={2} />
        <Balloon color="pink" rising={true} position={[-3.5, -1.5, -2.75]} />
        <Balloon color="green" rising={true} position={[-1.5, 1, -2.75]} />
        <Sheet
          pageHeight={5}
          position={[-2.5, 0, 0]}
          textures={["/textures/blank.jpg", "/textures/left-outside.jpg"]}
        />
      </group>
      <group ref={right} position={[0, 0, 0]}>
        <Sheet
          pageHeight={5}
          position={[2.5, 0, 0]}
          textures={[
            "/textures/right-inside.jpg",
            "/textures/right-outside.jpg",
          ]}
        ></Sheet>
      </group>
    </group>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense fallback={null}>
    <Canvas shadows camera={{ fov: 70, position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={1.5} decay={2} castShadow />
      <Card />
      <OrbitControls makeDefault={true} enablePan={false} target={[0, 0, 0]} />
    </Canvas>
  </React.Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
