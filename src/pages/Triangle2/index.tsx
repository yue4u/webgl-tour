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

import MainCanvas from "../../components/MainCanvas";

export default function Triangle2() {
  const initPos = [0, 0, 0, 100, 100, 100, 100, 100, 100, 200, 200, 200];
  const [vec, setVec] = useState<Vec4>([80, 227, 194, 1]);
  const [pos, setPos] = useState(initPos);
  const [translate, setTranslate] = useState({ x: 300, y: 100 });
  const [scale, setScale] = useState(1.2);
  useEffect(() => {
    draw(vec, pos, translate, scale);
  }, [vec, pos, translate, scale]);

  const handleColorChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    setVec([r, g, b, a ? a : 1]);
  };

  const handlePosChange = (newVec: number[]) => {
    setPos(newVec);
  };

  return (
    <>
      <MainCanvas id="rectangle" />
      <Wrapper>
        <ColorInput init={"#50E3C2"} handleColorChange={handleColorChange} />
        <VecInput init={pos} onVecChange={handlePosChange} />
        <ControllerRow>
          <RangeInput
            label={"x"}
            value={translate.x}
            max={1000}
            step={1}
            onValueChange={(x) => setTranslate({ ...translate, x })}
          />
        </ControllerRow>
        <ControllerRow>
          <RangeInput
            label={"y"}
            value={translate.y}
            max={1000}
            step={1}
            onValueChange={(y) => setTranslate({ ...translate, y })}
          />
        </ControllerRow>
        <ControllerRow>
          <RangeInput
            label={"scale"}
            value={scale}
            max={5}
            step={0.2}
            onValueChange={(s) => setScale(s)}
          />
        </ControllerRow>
      </Wrapper>
    </>
  );
}
