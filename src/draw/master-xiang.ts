import GL from "../utils/webgl";

export default function draw(effect: number[], colorSequence: string) {
  const image = new Image();
  image.src = require("../images/xds.jpg"); // 必须在同一域名下
  image.onload = function() {
    render(image, effect, colorSequence);
  };
}

function render(
  image: HTMLImageElement,
  effect: number[],
  colorSequence: string
) {
  const gl = GL("image");
  const vs = gl.utils.vert`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;

  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
     // convert the rectangle from pixels to 0.0 to 1.0
     vec2 zeroToOne = a_position / u_resolution;
  
     // convert from 0->1 to 0->2
     vec2 zeroToTwo = zeroToOne * 2.0;
  
     // convert from 0->2 to -1->+1 (clipspace)
     vec2 clipSpace = zeroToTwo - 1.0;
  
     gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  
     // pass the texCoord to the fragment shader
     // The GPU will interpolate this value between points.
     v_texCoord = a_texCoord;
  }
`;
  const fs = gl.utils.frag`

  precision mediump float;

  // our texture
  uniform sampler2D u_image;
  uniform vec2 u_textureSize;
  uniform float u_kernel[9];
  uniform float u_kernelWeight;
  
  // the texCoords passed in from the vertex shader.
  varying vec2 v_texCoord;
  
  void main() {
     vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
     vec4 colorSum =
         texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
         texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
         texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;
  
     gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1).${colorSequence};
  }
`;

  const program = gl.utils.useProgram(vs, fs);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var x1 = 0;
  var x2 = 0 + gl.canvas.width;
  var y1 = 0;
  var y2 = 0 + gl.canvas.height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );

  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,
      0.0,
      1.0,
      1.0,
      0.0,
      1.0,
      1.0
    ]),
    gl.STATIC_DRAW
  );

  // Create a texture.
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // lookup uniforms
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const textureSizeLocation = gl.getUniformLocation(program, "u_textureSize");
  const kernelLocation = gl.getUniformLocation(program, "u_kernel[0]");
  const kernelWeightLocation = gl.getUniformLocation(program, "u_kernelWeight");

  let weight = effect.reduce(function(prev, curr) {
    return prev + curr;
  });
  weight = weight <= 0 ? 1 : weight;

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

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

  // Turn on the teccord attribute
  gl.enableVertexAttribArray(texcoordLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  size = 2; // 2 components per iteration
  type = gl.FLOAT; // the data is 32bit floats
  normalize = false; // don't normalize the data
  stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    texcoordLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // set the resolution
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(textureSizeLocation, image.width, image.height);
  // set the kernel and it's weight
  gl.uniform1fv(kernelLocation, effect);
  gl.uniform1f(kernelWeightLocation, weight);

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}
