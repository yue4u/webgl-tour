// title: sketch-2020-01-13-17-33
// author: yue

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  float s_time=sin(u_time);
  float c_time=cos(u_time);
  vec3 color=vec3(.3);
  float diff=st.x+mod(abs(sin(u_time+st.x)),2.5*st.x*st.y);
  vec3 diff_color=vec3(diff*s_time+st.x,.8*c_time+st.y*diff,diff*st.x+st.y);
  gl_FragColor=vec4(color/diff_color,1.);
}