import GL from "../utils/webgl";

export default function draw() {
  const gl = GL("triangle-3");

  const vs = gl.utils.vert`
  attribute vec2 a_position;
  attribute vec4 a_color;
  varying vec4 v_color;

  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_color = a_color;
  }
  `;

  const fs = gl.utils.frag`
  precision mediump float;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }
  `;

  const program = gl.utils.useProgram(vs, fs);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const colorLocation = gl.getAttribLocation(program, "a_color");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  // Create a buffer for the colors.
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // Set the colors.

  const randomVec3 = () => [Math.random(), Math.random(), Math.random()];
  const randomVec4 = (opacity: number = 1) => [...randomVec3(), opacity];

  const color = [
    ...randomVec4(),
    ...randomVec4(),
    ...randomVec4(),
    ...randomVec4(),
    ...randomVec4(),
    ...randomVec4()
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation as number);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  let size = 2; // 2 components per iteration
  let type = gl.FLOAT; // the data is 32bit floats
  let normalize = false; // don't normalize the data
  let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // Turn on the color attribute
  gl.enableVertexAttribArray(colorLocation as number);

  // Bind the color buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  // Tell the color attribute how to get data out of colorBuffer (ARRAY_BUFFER)
  size = 4; // 4 components per iteration
  type = gl.FLOAT; // the data is 32bit floats
  normalize = false; // don't normalize the data
  stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

  size = 4; // 4 components per iteration
  type = gl.FLOAT; // the data is 32bit floats
  normalize = false; // don't normalize the data
  stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}
