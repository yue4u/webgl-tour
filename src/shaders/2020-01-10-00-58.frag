// title: sketch-2020-01-10-00-58
// author: yue

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy-.5;
  vec2 p=2.*st-vec2(1.);
  float s_time=sin(u_time);
  float c_time=cos(u_time);
  float f=4.*c_time*cos((50.*s_time)*st.x)+(10.*s_time)*cos(20.*st.y);
  vec3 col=.5+.5*sin(3.1416*f+vec3(st.xy,abs(c_time)));
  gl_FragColor=vec4(col,1.);
}