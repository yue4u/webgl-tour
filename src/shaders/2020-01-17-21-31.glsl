// title: sketch-2020-01-17-21-31
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  float s=sin(u_time);
  st*=fract(st*st.x*5.+u_time);
  st-=fract(st.y*st.x*2.);
  st+=.2*fract(st.y*st.x);
  st-=.2*fract(st.y+st.x);
  vec3 color=vec3(0.);
  color+=st.yxx+.5*abs(s)*st.xyx;
  gl_FragColor=vec4(color,1.);
}