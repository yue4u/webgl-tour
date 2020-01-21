import React, { useEffect } from "react";
import { Layout, MainCanvas, Button, Wrapper } from "../components";
import draw from "../draw/random-rectangle";

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
