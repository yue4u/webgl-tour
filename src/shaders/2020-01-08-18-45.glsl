// title: sketch-2020-01-08-18-45
// author: yue

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st,in float _radius){
  vec2 dist=_st-vec2(.5);
  return 1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(dist,dist)*4.);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  float h1=step(.5,abs(sin(u_time)+mod(st.x,.1)-.05));
  float h2=step(.5,abs(sin(u_time)+mod(st.y,.1)-.05));
  
  vec3 color=h1*h2*vec3(st.xyy)*circle(st,.9);
  
  gl_FragColor=vec4(color,1.);
}
