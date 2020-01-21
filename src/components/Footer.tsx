import styled from "@emotion/styled";
import React from "react";
import { colors } from "../Theme";

const GlobalFooter = styled.footer`
  background-color: ${colors.opaque};
  color: #fff;
  border-top: 3px solid ${colors.border};
  text-align: center;
  padding: 10px;
  font-size: 30px;
  box-shadow: 0 0 1rem #000;
`;

export default function Header() {
  return <GlobalFooter>© {new Date().getFullYear()}</GlobalFooter>;
}
