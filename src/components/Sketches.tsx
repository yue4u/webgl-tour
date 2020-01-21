import React, { FC } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import Shader from "../components/Shader";

type SketchSource = {
  title: string;
  name: string;
  content: string;
  modifiedTime: string;
};

const SketchesWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 880px) {
    justify-content: center;
  }
`;

const Sketch = styled.li`
  width: 44%;
  height: 15rem;
  margin: 1rem;
  a {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 0px skyblue, 3px 0 0 hotpink;
    overflow: auto;
    display: inline-block;
  }
  @media screen and (max-width: 880px) {
    width: 90%;
  }
`;

const Sketches: FC<{ sketches: SketchSource[] }> = ({ sketches }) => {
  return (
    <SketchesWrapper>
      {sketches.map(({ title, name, content }) => (
        <Sketch key={name}>
          <Link to={`/${name}`}>
            <Shader canvasId={title} fragment={content} />
            <span>{title || name}</span>
          </Link>
        </Sketch>
      ))}
    </SketchesWrapper>
  );
};

const SketchesQuery = () => (
  <StaticQuery
    query={graphql`
      {
        allShader(sort: { order: DESC, fields: birthTime }) {
          edges {
            node {
              title
              name
              content
              modifiedTime
            }
          }
        }
      }
    `}
    render={({ allShader }) => (
      <Sketches
        sketches={allShader.edges.map(({ node }: { node: SketchSource }) => ({
          ...node
        }))}
      />
    )}
  />
);

export default SketchesQuery;
