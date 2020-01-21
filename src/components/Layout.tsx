import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import { Header, SideBar, Footer } from ".";

const Flex = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  min-height: 100%;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  min-height: 100%;
  flex-direction: column;
`;
const LayoutMain = styled.main`
  width: 80%;
  position: relative;
  @media screen and (max-width: 680px) {
    width: 100%;
  }
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
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          *::-webkit-scrollbar {
            display: none;
          }
          #gatsby-focus-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      <FlexColumn>
        <Header />
        <Flex>
          <SideBar />
          <LayoutMain>{children}</LayoutMain>
        </Flex>
      </FlexColumn>
      <Footer />
    </>
  );
}
