import math from "./math";
export interface GLInstance extends WebGLRenderingContext {
  utils: GLUtils;
  math: typeof math;
  canvas: HTMLCanvasElement;
}
type GLUtils = ReturnType<typeof getGLUtils>;

export default function GL(canvasID: string) {
  const canvas = document.getElementById(canvasID) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("cannot get canvas Element");
  }
  const context =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!context) {
    throw new Error("cannot get rendering context");
  }
  const gl = context as GLInstance;
  gl.utils = getGLUtils(gl);
  gl.utils.resize(canvas);
  gl.math = math;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.utils.clear();
  return gl;
}

function getGLUtils(gl: WebGLRenderingContext) {
  return {
    resize(canvas: HTMLCanvasElement) {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    },
    createShader(type: number, source: string) {
      const shader = gl.createShader(type) as WebGLShader;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error("cannot create shader");
    },
    createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      }
      gl.deleteProgram(program);
      throw new Error("cannot create program");
    },
    useProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = this.createProgram(vertexShader, fragmentShader);
      gl.useProgram(program);
      return program;
    },
    vert(templateString: TemplateStringsArray, ...args: string[]) {
      const code = this.interpolate(templateString, ...args);
      // console.log(code)
      return this.createShader(gl.VERTEX_SHADER, code);
    },
    frag(templateString: TemplateStringsArray, ...args: string[]) {
      const code = this.interpolate(templateString, ...args);
      // console.log(code)
      return this.createShader(gl.FRAGMENT_SHADER, code);
    },
    interpolate(templateString: TemplateStringsArray, ...args: string[]) {
      return (
        templateString[0] +
        args
          .map((arg, i) => {
            const next = templateString[1 + i];
            return arg + (next ? next : "");
          })
          .join("")
      );
    },
    texture(src: string) {
      const img = new Image();
      const texture = gl.createTexture();
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          gl.LINEAR_MIPMAP_NEAREST
        );
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
      };
      img.src = src;
      return texture;
    },
    clear() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
    randomInt(range: number) {
      return Math.floor(Math.random() * range);
    }
  };
}
