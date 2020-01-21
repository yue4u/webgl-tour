import React, { useEffect } from "react";
import draw from "../draw/triangle-4";
import { Layout, MainCanvas, Button, Wrapper } from "../components";

export default function Triangle2() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <Layout>
      <MainCanvas id="triangle-3" />
      <Wrapper>
        <Button onClick={() => draw()}>Rerender</Button>
      </Wrapper>
    </Layout>
  );
}
