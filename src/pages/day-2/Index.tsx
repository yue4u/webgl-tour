import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import draw from "./draw";
import ColorPicker from "../../components/Controller/ColorPicker";
import { Vec4 } from "../../helpers";
import { ColorResult } from "react-color";
const MainCanvas = styled.canvas`
  width: 100%;
  height: 80vh;
`;

export default function Home() {
  const [vec, setVec] = useState<Vec4>([0.5, 0.5, 0.5, 1]);

  useEffect(() => {
    draw(vec);
  }, [vec]);

  const onColorChange = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    setVec([r, g, b, a ? a : 1]);
  };

  return (
    <>
      <MainCanvas id="canvas" />
      <ColorPicker onColorChange={onColorChange} />
    </>
  );
}
