import styled from "@emotion/styled";
import React, { useState } from "react";
interface VecInputProps {
  init?: number[];
  onVecChange(vec: number[]): void;
}
const VecInputWrapper = styled.div`
  height: 1rem;
  margin: 1rem;
  box-shadow: 0 0 5px #555;
  display: inline-flex;
  height: 1rem;
  width: fit-content;
  border: 2px solid #fff;
`;
const VecInputCell = styled.input`
  text-align: center;
  width: 2rem;
  border: 0;
  background-color: #fff;
  &:not(:last-child) {
    border-right: 1px #ccc solid;
  }
`;

export default function VecInput({ init = [], onVecChange }: VecInputProps) {
  const initString = [...init].map((v) => v.toString());
  const [vec, setVec] = useState(initString);

  const handleChange = (val: string, index: number) => {
    const newVec = [...vec];
    newVec[index] = val;
    setVec(newVec);

    const newNumVec = Array(newVec.length).fill(0);
    for (const [i, v] of newVec.entries()) {
      const num = parseFloat(v);
      if (typeof num !== "number" || isNaN(num)) {
        return;
      } else {
        newNumVec[i] = num;
      }
    }
    onVecChange(newNumVec);
  };

  return (
    <VecInputWrapper>
      {vec.map((n, index) => (
        <VecInputCell
          key={`i-${index}`}
          value={n}
          onChange={(e) => {
            handleChange(e.target.value, index);
          }}
        />
      ))}
    </VecInputWrapper>
  );
}
