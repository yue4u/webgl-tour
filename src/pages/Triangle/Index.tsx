import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import draw from "./draw";
import { Wrapper, VecInput, ColorPicker } from "../../components/Controller";
import { Vec4 } from "../../helpers";
import { ColorResult } from "react-color";
const MainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  max-height: 85vh;
`;

export default function Triangle() {
  const initPos = [-1, -1, 0, 1, 1, 1, 2];
  const [vec, setVec] = useState<Vec4>([80, 227, 194, 1]);
  const [pos, setPos] = useState(initPos);

  useEffect(() => {
    draw(vec, pos);
  }, [vec, pos]);

  const handleColorChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    setVec([r, g, b, a ? a : 1]);
  };

  const handlePosChange = (vec: number[]) => {
    setPos(vec);
  };

  return (
    <>
      <MainCanvas id="canvas" />
      <Wrapper>
        <ColorPicker init={"#50E3C2"} handleColorChange={handleColorChange} />
        <VecInput init={pos} onVecChange={handlePosChange} />
      </Wrapper>
    </>
  );
}
