import GL from "../../utils/webgl";

export default function draw() {
  const gl = GL("RandomRectangle");
  const vs = gl.utils.vert`
  attribute vec2 a_position;

  void main() {
     gl_Position = vec4(a_position,0, 1);
  }
`;
  const fs = gl.utils.frag`
  precision mediump float;
  uniform vec4 u_color;
  void main() {
    gl_FragColor = u_color;
  }
`;
  const program = gl.utils.createProgram(vs, fs);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  Array(50)
    .fill(0)
    // eslint-disable-next-line
    .map(() => {
      const drawRectangle = (
        x: number,
        y: number,
        width: number,
        height: number,
      ) => {
        const x1 = x;
        const x2 = x + width;
        const y1 = y;
        const y2 = y + height;
        console.log({ x1, x2, y1, y2 });
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
          gl.STATIC_DRAW,
        );
      };

      drawRectangle(
        -Math.random(),
        -Math.random(),
        Math.random(),
        Math.random(),
      );

      gl.uniform4f(
        colorUniformLocation,
        Math.random(),
        Math.random(),
        Math.random(),
        1,
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });
}
