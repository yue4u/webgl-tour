// title: sketch-2020-01-21-18-28
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  float s=sin(u_time);
  vec2 fc=gl_FragCoord.xy/u_resolution.y;
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st*=u_resolution.x/u_resolution.y;
  st/=length(st)*.1-fract(fract(st.x-st.y+u_time*.5)*st.xy*10.);
  vec3 color=vec3(st.x*st.y)-2.;
  color=clamp(color,.2,1.);
  
  color.x+=fc.x-.5;
  color.y-=fc.y*fc.x;
  color-=.5;
  
  gl_FragColor=vec4(color,1.);
}