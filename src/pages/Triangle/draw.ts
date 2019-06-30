import { vec4, Vec4 } from "../../utils";
import GL from "../../utils/webgl";

export default function draw(
  color: Vec4,
  positions: number[],
  translate: { x: number; y: number },
) {
  positions = positions.map((val, index) =>
    index % 2 === 0 ? val + translate.x - 1 : val + translate.y - 1,
  );

  const gl = GL("canvas");
  const vs = gl.utils.vert`
  attribute vec4 a_position;
  void main() {
      gl_Position = a_position;
  }
`;
  const fs = gl.utils.frag`
  precision mediump float;
  void main() {
      gl_FragColor = ${vec4(color)};
  }
`;

  const program = gl.utils.createProgram(vs, fs);
  const aPosition = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.utils.clear();
  gl.useProgram(program);
  gl.enableVertexAttribArray(aPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(aPosition, size, type, normalize, stride, offset);

  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);
}
