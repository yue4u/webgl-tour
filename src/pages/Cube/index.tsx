import React, { useEffect } from "react";
import { Button, Wrapper } from "../../components/Controller";
import draw from "./draw";

import MainCanvas from "../../components/MainCanvas";

export default function Triangle() {
  const id = "Cube";
  useEffect(() => {
    draw(id);
  }, []);

  return (
    <>
      <MainCanvas id={id} />
      <Wrapper>
        <Button onClick={() => draw(id)}>Rerender</Button>
      </Wrapper>
    </>
  );
}
