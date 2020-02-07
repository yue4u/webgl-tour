import styled from "@emotion/styled";
import React, { useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import routes, { Route } from "../Routes";
import { colors } from "../Theme";

const GlobalSideBar = styled.aside<{ show: boolean }>`
  width: 20%;
  padding: 1rem 0;
  position: sticky;
  overflow: scroll;
  top: 0;
  height: 100vh;
  background-color: ${colors.opaque};
  *::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  @media screen and (max-width: 680px) {
    padding: 0;
    display: ${props => (props.show ? "block" : "none")};
    position: fixed;
    top: 2.8rem;
    left: 0;
    width: 100vw;
    height: calc(100vh - 2.8rem);
    z-index: 20;
    background-color: rgb(0 0 0 / 0.9);
  }
`;
const SideBarButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-image: conic-gradient(
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
  z-index: 10;
  @media screen and (min-width: 680px) {
    display: none;
  }
`;

const NavigatorList = styled.ul`
  color: #000;
  text-align: left;
`;

type ItemProp = {
  current: boolean;
};

const SideBarImg = styled(Img)`
  transition: 0.3s all ease-in-out;
  max-height: 0;
`;

const NavigatorItem = styled.li<ItemProp>`
  transition: 0.3s all ease-in-out;
  background-color: ${props => (props.current ? colors.border : "")};
  span {
    color: #fff;
  }
  &:hover {
    ${SideBarImg} {
      max-height: 200px;
    }
    background-color: rgb(255 255 255 / 0.2);
  }
`;

const NavigatorText = styled.span`
  padding: 5px 15px;
  display: block;
  color: #000;
  font-size: 1rem;
`;

const Hr = styled.hr`
  margin: 0;
  border: 1.5px solid #000;
`;
type RouteWithThumbnail = {
  img?: any;
} & Route;

export default function SideBar() {
  const [show, setShow] = useState(false);
  const isCurrent = (url: string) => {
    if (typeof window === "undefined") return false;
    return window.location.pathname === url;
  };

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

          allFile(filter: { extension: { eq: "png" } }) {
            nodes {
              name
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 120) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      `}
      render={({ allShader, allFile }) => {
        const shaders: RouteWithThumbnail[] = allShader.edges.map(
          ({ node }: any) => {
            const title = node.title || node.name;
            return {
              title,
              url: node.name.startsWith("/") ? node.name : `/${node.name}`,
              img: allFile.nodes.find((n: any) => n.name === title)
                ?.childImageSharp?.fluid
            };
          }
        );
        return (
          <>
            <SideBarButton
              onClick={() => {
                setShow(!show);
              }}
            />
            <GlobalSideBar show={show}>
              <NavigatorList>
                {([...routes, ...shaders] as RouteWithThumbnail[]).map(
                  (route, key) => (
                    <NavigatorItem
                      key={`sidebar-${key}`}
                      current={isCurrent(route.url)}
                    >
                      {key !== 0 && <Hr />}
                      <Link to={route.url}>
                        {route.img && <SideBarImg fluid={route.img} />}
                        <NavigatorText>{route.title}</NavigatorText>
                      </Link>
                    </NavigatorItem>
                  )
                )}
              </NavigatorList>
            </GlobalSideBar>
          </>
        );
      }}
    />
  );
}
