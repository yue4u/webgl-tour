// title: sketch-2020-01-25-20-58
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  float s=sin(u_time);
  float c=cos(u_time);
  
  vec2 r=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=r-.5;
  vec3 color=vec3(1.);
  for(float i=0.;i<24.;i+=1.){
    color*=p.y-tan(radians(i*10.))*p.x-.4*sin(u_time+i*30.+i*3.14/2.);
  }
  color=color.x>0.?vec3(1.):vec3(0.);
  color*=color.x>0.&&distance(r,vec2(.5))-.4<0.?r.xyy:vec3(0.);
  gl_FragColor=vec4(color,1.);
}