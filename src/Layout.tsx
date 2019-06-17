import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const LayoutMain = styled.main`
  width: 80%;
`;
export default function Layout({ children }: any) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            font-family: sans-serif;
            text-align: center;
            font-size: 20px;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          a {
            text-decoration: none;
          }
          #root {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      />
      <Header />
      <FlexColumn>
        <SideBar />
        <LayoutMain>{children}</LayoutMain>
      </FlexColumn>
      <Footer />
    </>
  );
}
