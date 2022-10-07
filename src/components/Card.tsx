import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { ANGLES, getAngleFromRadian, getRadianFromAngle } from "utils/angles";
import Balloon from "components/Balloon";
import Sheet from "components/Sheet";

type CardTextures = {
  leftOutside: string;
  leftInside?: string;
  rightInside: string;
  rightOutside?: string;
};

export type CardProps = {
  textures: CardTextures;
  balloonColors: string[];
};

export default function Card({ textures, balloonColors }: CardProps) {
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
        <Balloon color={balloonColors[0]} position={[-2.5, -1, -2]} scale={2} />
        <Balloon color={balloonColors[1]} rising={true} position={[-3.5, -1.5, -2.75]} />
        <Balloon color={balloonColors[2]} rising={true} position={[-1.5, 1, -2.75]} />
        <Sheet
          pageHeight={5}
          position={[-2.5, 0, 0]}
          textures={[
            textures.leftInside ?? "/textures/blank.jpg",
            textures.leftOutside,
          ]}
        />
      </group>
      <group ref={right} position={[0, 0, 0]}>
        <Sheet
          pageHeight={5}
          position={[2.5, 0, 0]}
          textures={[
            textures.rightInside,
            textures.rightOutside ?? "/textures/right-outside.jpg",
          ]}
        ></Sheet>
      </group>
    </group>
  );
}
