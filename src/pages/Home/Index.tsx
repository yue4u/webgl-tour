import React, { useEffect } from "react";
import styled from "@emotion/styled";
import draw from "./draw";
const MainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
export default function Home() {
  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <MainCanvas id="canvas" />
    </>
  );
}
