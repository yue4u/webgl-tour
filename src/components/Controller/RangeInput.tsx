import styled from "@emotion/styled";
import React from "react";

interface RangeInputProps {
  value: number;
  label?: string;
  max: number;
  step?: number;
  onValueChange(range: number): void;
}

const Wrapper = styled.div`
  margin: 1rem;
  background: #fff;
  display: inline-flex;
  padding: 0 10px;
  box-shadow: 0 0 5px #555;
`;

const Label = styled.label`
  line-height: 1.1rem;
`;
export default function RangeInput({
  value,
  max,
  label,
  step,
  onValueChange,
}: RangeInputProps) {
  const handleValueChangeLocal = (valueStr: string) => {
    const newValue = parseFloat(valueStr);
    if (isNaN(newValue)) {
      return;
    }
    onValueChange(newValue);
  };
  return (
    <Wrapper>
      {label && <Label>{label}: </Label>}
      <input
        step={step ? step.toString() : 1}
        value={value.toString()}
        type="range"
        max={max.toString()}
        onChange={(e) => handleValueChangeLocal(e.target.value)}
      />
      {value}
    </Wrapper>
  );
}
