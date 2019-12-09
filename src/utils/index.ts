export const glsl = (x: TemplateStringsArray) => x.toString();
export type Vec4 = [number, number, number, number];
export const vec4 = (colors: Vec4) => {
  const colorStr = colors
    .map((color, index) => (index === 3 ? color : color / 255))
    .join(", ");
  return `vec4(${colorStr})`;
};

export const randomVec3 = () => [Math.random(), Math.random(), Math.random()];
export const randomVec4 = (opacity: number = 1) => [...randomVec3(), opacity];
