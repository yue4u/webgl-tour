// title: sketch-2020-01-19-02-01
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  float s=sin(u_time);
  float c=cos(u_time);
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  st*=fract(st.x+st.y+u_time);
  st-=.5;
  st.x=st.x>=0.?1.:-1.;
  st.y=st.y>=0.?1.:-1.;
  st*=mat2(c,s,-s,c);
  vec3 color=vec3(0.);
  color=vec3(st.xxy);
  
  gl_FragColor=vec4(color,1.);
}