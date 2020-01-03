import React from "react";
import Shader from "../../components/Shader";

export default function() {
  return (
    <Shader
      fragment={`
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec3 color = vec3(0.);
    const float count = 25.;
    vec2 g = gl_FragCoord.xy/u_resolution.xy;
    for(float i = 0.0; i < count; i++){
      float siny = .5+.25 * sin(2. *3.14*g.x + u_time + .2 * i);
      float curve = siny - g.y;
    if (curve >= 0. && curve < .01){
        color += vec3(g.x , g.y, g.x*g.y + i/count);
      }
    }
    gl_FragColor = vec4(color,1.0);
}`}
    />
  );
}
