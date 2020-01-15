// title: sketch-2020-01-15-15-32
// author: yue

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  float d=0.;
  float s=sin(u_time*5.);
  float c=cos(u_time);
  
  st=mod(st-.5,.1+.1*abs(s))-.05;
  
  color+=500.*s*vec3(st.xy,st.x/st.y*c);
  st*=mat2(c,s,-s,c);
  float v=-.5*sin(u_time*2.)/abs(st.y+st.x);
  gl_FragColor=vec4(color+v,1.);
}