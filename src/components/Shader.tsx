import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import GlslCanvas from "glslCanvas";
import MainCanvas from "./MainCanvas";

const ID = `shader-canvas`;

type ShaderProps = {
  fragment: string;
};

const Code = styled.code`
  transition: 0.3s all ease-in-out;
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #fff;
  text-align: left;
  padding: 10px;
  text-shadow: 0 0 2px #000;
  display: inline;
  background-color: rgba(0, 0, 0, 0.8);
  max-height: calc(100% - 2rem);
  max-width: calc(100% - 2rem);
  overflow: scroll;
  white-space: pre;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
export default function Shader({ fragment }: ShaderProps) {
  useEffect(() => {
    const canvas = document.getElementById(ID) as HTMLCanvasElement;
    if (!canvas) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
    const sandbox = new GlslCanvas(canvas);
    sandbox.load(fragment);
  });

  let [show, setShow] = useState(true);

  const toggle = () => setShow(!show);
  return (
    <>
      <MainCanvas onClick={toggle} id={ID} />
      {show && <Code onClick={toggle}>{fragment}</Code>}
    </>
  );
}
