interface GLInstance extends WebGLRenderingContext {
  utils: GLUtils;
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
  gl.utils.resize(canvas)
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
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw new Error("cannot create program");
    },
    vert(templateString: TemplateStringsArray, ...args: string[]) {
      const code = this.interpolate(templateString, ...args);
      console.log(code)
      return this.createShader(
        gl.VERTEX_SHADER,
        code
      );
    },
    frag(templateString: TemplateStringsArray, ...args: string[]) {
      const code = this.interpolate(templateString, ...args);
      console.log(code)
      return this.createShader(
        gl.FRAGMENT_SHADER,
        code
      );
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
    clear(){
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }
}
