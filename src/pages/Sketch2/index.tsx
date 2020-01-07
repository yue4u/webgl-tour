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
      
      float circle(in vec2 _st, in float _radius){
          vec2 dist = _st-vec2(0.5);
        return 1.-smoothstep(_radius-(_radius*0.01),
                               _radius+(_radius*0.01),
                               dot(dist,dist)*25.*(1.-.5 * abs(sin(u_time))));
      }
      
      void main() {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          st.x *= u_resolution.x/u_resolution.y;
          vec3 color = vec3(0.);
          float r = step(0.7, sin(10.*u_time + 10.* (sin(st.y) / sin(st.x))));
          color = circle(st,r) * vec3(st.yxx);
          gl_FragColor = vec4(color,1.0);
      }`}
    />
  );
}
