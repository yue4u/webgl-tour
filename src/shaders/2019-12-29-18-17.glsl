// title: Mix

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
  st=vec2(dot(st,st.yx),
  dot(st,vec2(-.220,-.640)*st.yx));
  return-1.+2.*fract(sin(st)*500.);
}

float noise(vec2 st){
  vec2 i=floor(st);
  vec2 f=fract(st);
  
  vec2 u=f*f*(3.-2.*f);
  
  return mix(mix(dot(random2(i+vec2(0.,0.)),f-vec2(0.,0.)),
  dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.)),u.x),
  mix(dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.)),
  dot(random2(i+vec2(1.,1.)),f-vec2(1.,1.)),u.x),u.y);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  
  float t=1.;
  // Uncomment to animate
  t=abs(1.-sin(u_time*.1)+.5)*50.;
  // Comment and uncomment the following lines:
  st+=noise(st*2.)*t;// Animate the coordinate space
  color=vec3(1.)*smoothstep(.18,.2,noise(st));// Big black drops
  color+=smoothstep(.15,.2,noise(st*10.));// Black splatter
  color-=smoothstep(.35,.4,noise(st*10.));// Holes on splatter
  
  gl_FragColor=vec4(1.-color,1.)-vec4(.45,.25,.05,0);
}
