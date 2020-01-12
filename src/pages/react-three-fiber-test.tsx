import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Layout from "../components/Layout";

function Scene() {
  const ref = useRef<any>();
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

export default function ReactThreeFiberTest() {
  return (
    <Layout>
      <Canvas>
        <Scene />
      </Canvas>
    </Layout>
  );
}
