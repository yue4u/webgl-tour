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
`;

export default function Header() {
  return <GlobalFooter>© {new Date().getFullYear()}</GlobalFooter>;
}
