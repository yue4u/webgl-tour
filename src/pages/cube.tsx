import React, { useEffect } from "react";
import draw from "../draw/cube";
import { Layout, MainCanvas, Button, Wrapper } from "../components";

export default function Triangle() {
  const id = "Cube";
  useEffect(() => {
    draw(id);
  }, []);

  return (
    <Layout>
      <MainCanvas id={id} />
      <Wrapper>
        <Button onClick={() => draw(id)}>Rerender</Button>
      </Wrapper>
    </Layout>
  );
}
