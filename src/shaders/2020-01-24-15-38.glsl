// title: sketch-2020-01-24-15-38
// author: yue

precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  float s=sin(u_time);
  float c=cos(u_time);
  
  vec2 p=gl_FragCoord.xy/u_resolution.xy;
  vec2 r=p;
  p=fract(p*3.+u_time*.5);
  vec3 color=p.y+.2*s>.5?vec3(1.):vec3(-1.);
  
  color*=p.x+.2*s-.5;
  color*=p.x+.2*c-.3;
  color*=p.y+.2*c-.5;
  color*=p.x+.2*s-p.y;
  color*=p.y+.2*s-p.x;
  color*=p.y+p.x+.2*s-.8;
  color*=p.y+p.x+.2*c-1.2;
  
  color*=distance(p,vec2(.5*abs(c)))-.3-.1*s;
  color*=distance(p,vec2(.5*abs(s)))-.1-.4*abs(c);
  
  color*=r.x+.2*c-.5;
  color*=r.x+.2*s-.3;
  color*=r.y+.2*s-.5;
  color*=r.x+.2*s-p.y;
  color*=r.y+.2*c-p.x;
  color*=r.y+p.x+.2*c-.8;
  color*=r.y+p.x+.2*s-1.2;
  color*=distance(r,vec2(.5))-.4>0.?0.:1.;
  color=color.x>0.?r.yxx:vec3(0.);
  
  gl_FragColor=vec4(color,1.);
}