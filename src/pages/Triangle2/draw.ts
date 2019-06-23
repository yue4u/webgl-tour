import { vec4, Vec4 } from "../../utils";
import GL from "../../utils/webgl";

export default function draw(
  color: Vec4,
  positions: number[],
  translate: { x: number; y: number },
  scale: number
) {
  positions = positions.map((val, index) =>
  (  index % 2 === 0 ? val + translate.x : val + translate.y) * scale
  );

  const gl = GL("rectangle");

  const vs = gl.utils.vert`
    attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      gl_Position = vec4(clipSpace, 0, 1);
    }
  `;

  const fs = gl.utils.frag`
    precision mediump float;
    void main() {
        gl_FragColor = ${vec4(color)};
    }
  `;

  const program = gl.utils.createProgram(vs, fs);
  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const aPosition = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.utils.clear();
  gl.useProgram(program);

  gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height);
  gl.enableVertexAttribArray(aPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const size = 2;
  const tyoe = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(aPosition, size, tyoe, normalize, stride, offset);

  const primitiveType = gl.TRIANGLES;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}
