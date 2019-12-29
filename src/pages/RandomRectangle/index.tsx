import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Button, Wrapper } from "../../components/Controller";
import draw from "./draw";

import MainCanvas from "../../components/MainCanvas";

export default function Triangle() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <MainCanvas id="RandomRectangle" />
      <Wrapper>
        <Button onClick={() => draw()}>Rerender</Button>
      </Wrapper>
    </>
  );
}
