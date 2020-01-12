import React, { useEffect } from "react";
import { Button, Wrapper } from "../components/Controller";
import Layout from "../components/Layout";
import draw from "../draw/cube";

import MainCanvas from "../components/MainCanvas";

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
