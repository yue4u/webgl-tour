import React, { useEffect } from "react";
import GlslCanvas from "glslCanvas";
import MainCanvas from "../components/MainCancas";

const ID = `shader-canvas`;

type ShaderProps = {
  fragment: string;
};

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

  return (
    <>
      <MainCanvas id={ID} />
    </>
  );
}
