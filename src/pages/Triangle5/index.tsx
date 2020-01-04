import React from "react";
import Shader from "../../components/Shader";

export default function() {
  return (
    <Shader
      fragment={`
#ifdef GL_ES
precision mediump float;
#endif

#define S3 1.73205080757
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void t(float r,vec2 center, inout vec3 color,vec2 point,float index){
    
    float dx = abs(center.x - point.x);
    float ybottom = 1. - .5 * r - center.y;
    float ytop = ybottom + (S3*r/3. - dx)*S3;
    if (dx < S3/ 2.  * r && point.y > ybottom && point.y < ytop){
        color +=  .4 * vec3(point,sin(dx + index));
    }
}

void main() {
    const float r = .15;
    
    vec2 point = gl_FragCoord.xy/u_resolution;
    
    vec3 color = vec3(0.);
     for (float y= 0.; y <= 6.; y+=1.) {
             vec2 tp = vec2(.5) + vec2(cos(u_time+ y)*r,sin(u_time+ y*y)*r);
        t(.1 + .4*abs(sin(u_time + y)),tp,color,point,y);
     }

    gl_FragColor = vec4(color,1.0);
}`}
    />
  );
}
