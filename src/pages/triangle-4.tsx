import React, { useEffect } from "react";
import { Button, Wrapper } from "../components/Controller";
import draw from "../draw/triangle-4";
import Layout from "../components/Layout";
import MainCanvas from "../components/MainCanvas";

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
