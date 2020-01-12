precision mediump float;
uniform float u_time;// time
uniform vec2 u_resolution;// resolution

void main(void){
  vec2 p=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);
  vec3 destColor=vec3(.8,.1+.5*abs(sin(u_time)),.7*sin(5.+length(gl_FragCoord.xy)));
  float f=0.;
  for(float i=0.;i<10.;i++){
    float s=sin(u_time+i*.5)*sin(u_time);
    float c=cos(u_time+i*.5)*cos(u_time);
    f+=.002/abs(length(p*vec2(c,s)));
  }
  gl_FragColor=vec4(vec3(destColor*f),1.);
}