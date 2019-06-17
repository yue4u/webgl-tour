import styled from "@emotion/styled";
import React from "react";
import { colors } from "../Theme";

const GlobalFooter = styled.footer`
  border-top: 3px solid ${colors.lightseagreen};
  text-align: center;
  padding: 10px;
  font-size: 30px;
`;

export default function Header() {
  return <GlobalFooter>© {new Date().getFullYear()}</GlobalFooter>;
}
