import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import GlslCanvas from "glslCanvas";
import MainCanvas from "./MainCanvas";

type ShaderProps = {
  canvasId: string;
  fragment: string;
  showCode?: boolean;
};

const CodeContent = styled.span`
  transition: 0.3s all ease-in-out;
  display: inline;
  padding: 2px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Code = styled.code`
  transition: 0.3s all ease-in-out;
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #fff;
  text-align: left;
  padding: 10px;
  text-shadow: 0 0 2px #000;
  display: block;
  height: calc(100% - 2rem);
  width: calc(100% - 2rem);
  overflow: scroll;
  white-space: pre;
  scrollbar-width: none;
  -ms-overflow-style: none;
  @media screen and (max-width: 680px) {
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: calc(100% - 1rem);
  }
`;

export default function Shader({ canvasId, fragment, showCode }: ShaderProps) {
  const ID = canvasId;
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (err) return;
    try {
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
    } catch {
      setErr(true);
    }
  }, [ID, err, fragment]);

  if (err) {
    return <>ERROR! {err}</>;
  }

  return (
    <>
      <MainCanvas id={ID} />
      {showCode && (
        <Code>
          <CodeContent>{fragment}</CodeContent>
        </Code>
      )}
    </>
  );
}
