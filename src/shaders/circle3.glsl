#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(void){
  float t=u_time+100.;
  vec2 p=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);
  float x=sin(length(p*gl_FragCoord.xy));
  vec3 destColor=vec3(0.);
  for(float i=0.;i<3.;i++){
    float j=i+.8;
    vec2 q=p+vec2(cos(t*j),sin(t*j))*.300;
    destColor+=vec3(.4*x,.2*cos(t),2.*sin(t*p))*.08/(length(q)-(.1*sin(t)+.4));
  }
  gl_FragColor=vec4(destColor,1.);
}