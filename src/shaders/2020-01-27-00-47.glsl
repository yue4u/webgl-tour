// title: sketch-2020-01-27-00-47
// author: yue

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define E 2.71828

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  float s=sin(u_time);
  float c=cos(u_time);
  
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=st;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  st=st-.5;
  st*=mat2(c,s,-s,c);
  st*=1000.;
  for(float n=0.;n<20.;n+=1.){
    float a=atan(st.x,st.y)+n*PI;
    float r=length(st);
    float width=r-pow(E,.2*a);
    
    if(abs(width)<2.){
      color-=vec3(1.);
    }else{
      color+=.1*vec3(a/10000.+s,mod(r*a/500.,1.),n/20.);
    }
  }
  gl_FragColor=vec4(color,1.);
}
