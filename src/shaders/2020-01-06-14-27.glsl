#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  
  vec3 color=vec3(0.);
  if(abs(st.y-.5)<=abs(cos(st.x*u_time))){
    color+=step(.2,.5*abs(sin(mod(st.x,.1)))+st.x*abs(cos(u_time)))-vec3(st.yxx)*.5*step(.2,.5*abs(sin(mod(st.x,.2)))+st.x*abs(cos(u_time+.5)));
  }
  gl_FragColor=vec4(color,1.);
}