import styled from "@emotion/styled";
import React, { createRef } from "react";
type SelectorOptions = {
  [s: string]: string;
};
type SelectorProps = {
  active: string;
  options: SelectorOptions;
  onChange(value: string): void;
};

const SelectorWrapper = styled.div`
  appearance: none;
  background: #fff;
  box-shadow: 0 0 5px #555;
  margin: 1rem;
  padding: 0 10px;
  padding-right: 2rem;
  border: 2px solid #fff;
  position: relative;
  select {
    border: none;
    background: none;
    font-size: 20px;
    appearance: none;
  }
  &:after {
    content: "▽";
    pointer-events: none;
    user-select: none;
    position: absolute;
    right: 0;
  }
`;

export default function Selector({ active, options, onChange }: SelectorProps) {
  const selectEl = createRef<HTMLSelectElement>();

  const handleClick = () => {
    // @ts-ignore
    selectEl.current.click();
  };

  return (
    <SelectorWrapper onClick={handleClick}>
      <select ref={selectEl} onChange={e => onChange(e.target.value)}>
        {Object.entries(options).map(([k, v]) => (
          <option key={v} selected={active === v} value={v}>
            {k}
          </option>
        ))}
      </select>
    </SelectorWrapper>
  );
}
