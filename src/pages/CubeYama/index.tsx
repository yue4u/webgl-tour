import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Button, Wrapper } from "../../components/Controller";
import draw from "./draw";
const MainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  max-height: 85vh;
`;

export default function CubeYama() {
  const id = "CubeYama";
  useEffect(() => {
    draw(id);
  }, []);

  return (
    <>
      <MainCanvas id={id} />
      <Wrapper>
        <Button onClick={() => draw(id)}>Speed up</Button>
      </Wrapper>
    </>
  );
}
