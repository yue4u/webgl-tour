import styled from "@emotion/styled";
import React from "react";
import { Link } from "gatsby";
import { colors } from "../Theme";

const StyledLink = styled(Link)`
  color: #000;
  font-size: 30px;
  filter: drop-shadow(0px 0px 1px #000) drop-shadow(0px 0px 3px #333);
  display: inline-block;
  background: linear-gradient(skyblue, hotpink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const GlobalHeader = styled.header`
  background: ${colors.opaque};
  border-bottom: 3px solid ${colors.border};
  box-shadow: 0 0 5px #000;
  text-align: left;
  padding: 10px;
  font-weight: bold;
  z-index: 1;
`;

export default function Header() {
  return (
    <GlobalHeader>
      <StyledLink to="/">WebGL Lab.</StyledLink>
    </GlobalHeader>
  );
}
