import React from "react";
import Shader from "../../components/Shader";

export default function() {
  const test = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main(void){
    float t = u_time + 100.;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float x = sin(length(p * gl_FragCoord.xy));
    vec3 destColor = vec3(0.0);
    for(float i = 0.0; i < 3.; i++){
        float j = i + .8;
        vec2 q = p + vec2(cos(t * j), sin(t * j)) * 0.300;
        destColor += vec3(.4*x,.2*cos(t),2. *sin(t* p)) *  .08 / (length(q) - (0.1*sin(t) + 0.4));
    }
    gl_FragColor = vec4(destColor, 1.0);
}`;

  return <Shader fragment={test} />;
}
