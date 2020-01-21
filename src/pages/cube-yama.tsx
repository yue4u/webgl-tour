import React, { useEffect } from "react";
import { Button, Wrapper } from "../components/Controller";
import draw from "../draw/cube-yama";
import { MainCanvas, Layout } from "../components";

export default function CubeYama() {
  const id = "CubeYama";
  useEffect(() => {
    draw(id);
  }, []);

  return (
    <Layout>
      <MainCanvas id={id} />
      <Wrapper>
        <Button onClick={() => draw(id)}>Speed up</Button>
      </Wrapper>
    </Layout>
  );
}
