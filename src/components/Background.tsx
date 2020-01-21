import React from "react";
import styled from "@emotion/styled";
import { Shader } from ".";

const noise = `
// title: Noise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
  return fract(sin(dot(st.xy,u_mouse+vec2(999.,999.)))*40000.);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution;

  float rnd=random(st);

  gl_FragColor=vec4(vec3(rnd),.6);
}
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -100;
`;

export default function Background() {
  return (
    <Wrapper>
      <Shader fragment={noise} canvasId="bg" />
    </Wrapper>
  );
}
