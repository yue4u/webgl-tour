import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import {
  ColorInput,
  ControllerRow,
  RangeInput,
  VecInput,
  Wrapper,
} from "../../components/Controller";
import { Vec4 } from "../../utils";
import draw from "./draw";
const MainCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  max-height: 85vh;
`;

export default function Triangle() {
  const initPos = [-1, -1, 0, 1, 1, 1, 2];
  const [vec, setVec] = useState<Vec4>([80, 227, 194, 1]);
  const [pos, setPos] = useState(initPos);
  const [translate, setTranslate] = useState({ x: 1, y: 1 });
  useEffect(() => {
    draw(vec, pos, translate);
  }, [vec, pos, translate]);

  const handleColorChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    setVec([r, g, b, a ? a : 1]);
  };

  const handlePosChange = (newVec: number[]) => {
    setPos(newVec);
  };

  return (
    <>
      <MainCanvas id="canvas" />
      <Wrapper>
        <ColorInput init={"#50E3C2"} handleColorChange={handleColorChange} />
        <VecInput init={pos} onVecChange={handlePosChange} />
        <ControllerRow>
          <RangeInput
            label={"x"}
            value={translate.x}
            max={2}
            step={0.01}
            onValueChange={(x) => setTranslate({ ...translate, x })}
          />
        </ControllerRow>
        <ControllerRow>
          <RangeInput
            label={"y"}
            value={translate.y}
            max={2}
            step={0.01}
            onValueChange={(y) => setTranslate({ ...translate, y })}
          />
        </ControllerRow>
      </Wrapper>
    </>
  );
}
