import { createRoot } from "react-dom/client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import reportWebVitals from "./reportWebVitals";
import { OrbitControls } from "@react-three/drei";
import Card from "components/Card";
import "./index.css";

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
