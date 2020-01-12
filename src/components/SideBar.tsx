import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import routes, { Route } from "../Routes";
import { colors } from "../Theme";

const GlobalSideBar = styled.aside<{ show: boolean }>`
  width: 20%;
  border-right: 1px solid #eee;
  @media screen and (max-width: 680px) {
    display: ${props => (props.show ? "block" : "none")};
    position: fixed;
    top: 3rem;
    left: 0;
    width: 100vw;
    height: calc(100vh - 3rem);
    z-index: 20;
    overflow: scroll;
    background-color: #fff;
  }
`;
const SideBarButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-image: linear-gradient(to bottom, skyblue, hotpink);
  z-index: 10;
  @media screen and (min-width: 680px) {
    display: none;
  }
`;

const NavigatorList = styled.ul`
  color: #000;
  text-align: left;
`;

const NavigatorItem = styled.li<{
  current: boolean;
}>`
  transition: 0.3s all ease-in-out;
  background-color: ${props => (props.current ? colors.lightseagreen : "")};
  &:hover {
    span {
      color: #fff;
      transition-delay: 0.1s;
    }
    background-color: ${colors.lightseagreen};
  }
`;

const NavigatorText = styled.span`
  padding: 5px 15px;
  display: block;
  color: #000;
  font-size: 24px;
`;

export default function SideBar() {
  const pathname = typeof window !== undefined || window.location.pathname;
  const [show, setShow] = useState(false);
  const isCurrent = (url: string) => pathname === url;
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <StaticQuery
      query={graphql`
        {
          allShader(sort: { order: ASC, fields: name }) {
            edges {
              node {
                id
                name
                title
              }
            }
          }
        }
      `}
      render={({ allShader }) => {
        const shaders: Route[] = allShader.edges.map(({ node }: any) => {
          return {
            title: node.title || node.name,
            url: node.name
          };
        });
        return (
          <>
            <SideBarButton
              onClick={() => {
                console.log(1);
                setShow(!show);
              }}
            />
            <GlobalSideBar show={show}>
              <NavigatorList>
                {[...routes, ...shaders].map((route, key) => (
                  <NavigatorItem
                    key={`sidebar-${key}`}
                    current={isCurrent(route.url)}
                  >
                    {isCurrent(route.url) ? (
                      <NavigatorText>{route.title}</NavigatorText>
                    ) : (
                      <Link to={route.url}>
                        <NavigatorText>{route.title}</NavigatorText>
                      </Link>
                    )}
                  </NavigatorItem>
                ))}
              </NavigatorList>
            </GlobalSideBar>
          </>
        );
      }}
    />
  );
}
