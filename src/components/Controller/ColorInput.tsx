import styled from "@emotion/styled";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

interface IndicatorProps {
  color: string;
}

interface ColorInputProps {
  init: string;
  handleColorChange(color: ColorResult): void;
}

const Wrapper = styled.div`
  margin: 1rem;
  display: inline-block;
  .sketch-picker {
    position: absolute;
  }
`;

const Indicator = styled.div<IndicatorProps>`
  background-color: ${(props) => props.color};
  border: 2px #fff solid;
  width: 1rem;
  height: 1rem;
  box-shadow: 0 0 5px #555;
`;

export default function ColorInput({
  init,
  handleColorChange,
}: ColorInputProps) {
  const [color, setColor] = useState<ColorResult | string>(init);
  const [display, setDisplay] = useState(false);

  const handleChangeComplete = (colorResult: ColorResult) => {
    setColor(colorResult);
    setDisplay(false);
    handleColorChange(colorResult);
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
