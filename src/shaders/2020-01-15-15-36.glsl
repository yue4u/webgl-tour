// title: sketch-2020-01-15-15-36
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  float s=sin(u_time);
  float c=cos(u_time);
  
  st=mod(st,.5)-.25;
  
  color+=100.*s*vec3(st.xy,st.x/st.y*c);
  gl_FragColor=vec4(color,1.);
}