import React, { useEffect } from "react";
import draw from "../draw/three";
import { Layout, MainCanvas } from "../components";

export default function Triangle() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <Layout>
      <MainCanvas id="three" />
    </Layout>
  );
}
