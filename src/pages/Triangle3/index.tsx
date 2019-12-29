import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  ControllerRow,
  RangeInput,
  VecInput,
  Wrapper,
} from "../../components/Controller";
import draw from "./draw";

import MainCanvas from "../../components/MainCanvas";

export default function Triangle() {
  const initPos = [2, -2, -1, 1, 1, 1, 2];
  const [pos, setPos] = useState(initPos);
  const [translate, setTranslate] = useState({ x: 1, y: 1 });

  useEffect(() => {
    draw(pos, translate);
  }, [pos, translate]);

  const handlePosChange = (vec: number[]) => {
    setPos(vec);
  };

  return (
    <>
      <MainCanvas id="color" />
      <Wrapper>
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
