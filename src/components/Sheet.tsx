import { useTexture } from "@react-three/drei";
import { Color, ThreeElements } from "@react-three/fiber";

type SheetProps = {
  pageHeight: number;
  textures: string[];
  isHorizontal?: boolean;
  color?: Color;
  children?: React.ReactNode;
};

export default function Sheet({
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
