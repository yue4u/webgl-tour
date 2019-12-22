import styled from "@emotion/styled";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../Routes";
import { colors } from "../Theme";

const GlobalSideBar = styled.aside`
  width: 20%;
  border-right: 1px solid #eee;
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
  const { pathname } = useLocation();
  const isCurrent = (url: string) => pathname === url;
  return (
    <GlobalSideBar>
      <NavigatorList>
        {routes.map((route, key) => (
          <NavigatorItem key={`sidebar-${key}`} current={isCurrent(route.url)}>
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
  );
}
