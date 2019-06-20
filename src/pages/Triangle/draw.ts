import { vec4, Vec4, resize } from "../../helpers";

export default function draw(
  color: Vec4,
  positions: number[],
  translate: { x: number; y: number }
) {
  const v = `
  attribute vec4 a_position;
  void main() {
      gl_Position = a_position;
  }
`;
  const f = `
  precision mediump float;
  void main() {
      gl_FragColor = ${vec4(color)};
  }
`;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  resize(canvas);
  positions = positions.map((val, index) =>
    index % 2 === 0 ? val + translate.x - 1 : val + translate.y - 1
  );
  const createShader = (type: number, source: string) => {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  };

  const createProgram = (vShader: WebGLShader, fShader: WebGLShader) => {
    const program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  };

  const vs = createShader(gl.VERTEX_SHADER, v) as WebGLShader;
  const fs = createShader(gl.FRAGMENT_SHADER, f) as WebGLShader;

  const program = createProgram(vs, fs) as WebGLProgram;
  const aPosition = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.enableVertexAttribArray(aPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const size = 2;
  const tyoe = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(aPosition, size, tyoe, normalize, stride, offset);

  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);
}
