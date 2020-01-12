import React, { useEffect } from "react";
import { Button, Wrapper } from "../components/Controller";
import draw from "../draw/random-rectangle";
import Layout from "../components/Layout";
import MainCanvas from "../components/MainCanvas";

export default function Triangle() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <Layout>
      <MainCanvas id="RandomRectangle" />
      <Wrapper>
        <Button onClick={() => draw()}>Rerender</Button>
      </Wrapper>
    </Layout>
  );
}
