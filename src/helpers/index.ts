export const glsl = (x: TemplateStringsArray) => x.toString();
export type Vec4 = [number, number, number, number];
export const vec4 = (colors: Vec4) => {
  const colorStr = colors
    .map((color, index) => (index === 3 ? color : color / 255))
    .join(", ");
  return `vec4(${colorStr})`;
};

export const resize = (canvas: HTMLCanvasElement) => {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
};
