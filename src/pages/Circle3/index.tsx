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

void main(){
    vec2 r = u_resolution;
    float t = u_time;
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    float x = sin(length(gl_FragCoord.xy));
    vec3 destColor = vec3(0.0);
    for(float i = 0.0; i < 3.; i++){
        float j = i + 1.0;
        vec2 q = p + vec2(cos(t * j), sin(t * j)) * 0.300;
        destColor += vec3(.4*x,.2*cos(u_time),.8 *sin(u_time)) *  0.058 / (length(q) - 0.5);
    }
    gl_FragColor = vec4(destColor, 1.0);
}`;

  return <Shader fragment={test} />;
}
