import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../Routes";
import { colors } from "../Theme";

const GlobalSideBar = styled.aside`
  width: 20%;
  height: 100%;
  border-right: 1px solid #eee;
`;

const NavigatorList = styled.ul`
  color: #000;
  text-align: left;
`;

const NavigatorItem = styled.li`
  transition: 0.3s all ease-in-out;
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
  return (
    <GlobalSideBar>
      <NavigatorList>
        {routes.map((route, key) => (
          <NavigatorItem key={`sidebar-${key}`}>
            <Link to={route.url}>
              <NavigatorText>{route.title}</NavigatorText>
            </Link>
          </NavigatorItem>
        ))}
      </NavigatorList>
    </GlobalSideBar>
  );
}
