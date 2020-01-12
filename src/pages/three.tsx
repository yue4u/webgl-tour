import React, { useEffect } from "react";
import draw from "../draw/three";
import Layout from "../components/Layout";
import MainCanvas from "../components/MainCanvas";

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
