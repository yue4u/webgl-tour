// title: SinCurve2

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926538
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec3 color=vec3(0.);
  const float count=8.;
  vec2 g=gl_FragCoord.xy/u_resolution.xy;
  for(float i=0.;i<count;i++){
    float ip=i/count;
    float siny=.5+.25*sin(2.*PI*g.x+i/PI+u_time+.2*i)*ip*sin(u_time*i/5.);
    float curve=siny-g.y;
    if(curve>=0.&&curve<.05*ip){
      color+=.5*vec3(g.xy,g.x*g.y+ip*length(g));
    }
  }
  gl_FragColor=vec4(color,1.);
}