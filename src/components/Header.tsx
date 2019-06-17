import styled from "@emotion/styled";
import React from "react";
import { colors } from "../Theme";

const GlobalHeader = styled.header`
  border-bottom: 3px solid ${colors.lightseagreen};
  box-shadow: 0 0 5px #888;
  text-align: left;
  padding: 10px;
  font-size: 30px;
  z-index: 1;
`;

export default function Header() {
  return <GlobalHeader>WebGL Lab.</GlobalHeader>;
}
