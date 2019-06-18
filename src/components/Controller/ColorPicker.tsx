import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import styled from "@emotion/styled";

type IndicatorProps = {
  color: string;
};

type ColorPickerProps = {
  onColorChange(color: ColorResult): void;
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
`;

const Indicator = styled.div<IndicatorProps>`
  background-color: ${props => props.color};
  border: 2px #fff solid;
  width: 1rem;
  height: 1rem;
  box-shadow: 0 0 5px #555;
`;

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [color, setColor] = useState<ColorResult | string>("#000");
  const [display, setDisplay] = useState(false);

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color);
    setDisplay(false);
    onColorChange(color);
  };
  const hex = typeof color === "string" ? color : color.hex;
  return (
    <Wrapper>
      <Indicator color={hex} onClick={() => setDisplay(true)} />
      {display && (
        <SketchPicker color={hex} onChangeComplete={handleChangeComplete} />
      )}
    </Wrapper>
  );
}
