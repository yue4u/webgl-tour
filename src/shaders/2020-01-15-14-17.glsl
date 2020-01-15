// title: sketch-2020-01-15-14-17
// author: yue

precision mediump float;
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
  float s=sin(u_time);
  float c=cos(u_time);
  
  st=st*2.-1.;
  int N=4;
  float a=atan(st.x,st.y)+PI;
  float r=TWO_PI/float(N);
  
  d=cos(floor(.5+a/r)*r-a)*length(st);
  float w=.8;
  color+=s*20.*vec3(.2*c,st.y*mod(st.x/st.y,.2),s+st.x-st.y);
  st*=mat2(c,s,-s,c);
  float v=.1/abs(st.y)*abs(st.x);
  gl_FragColor=vec4(color*v,1.);
}