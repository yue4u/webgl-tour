import React from "react";
import { graphql } from "gatsby";
import { Layout, Shader } from "../components";

export const ShaderPageTemplate = ({ data }: any) => {
  const { title, content } = data.shader;

  return (
    <Layout title={title}>
      <Shader canvasId={title} fragment={content} showCode />
    </Layout>
  );
};

export const query = graphql`
  query ShaderPageBySlug($id: String!) {
    shader(id: { eq: $id }) {
      title
      content
    }
  }
`;

export default ShaderPageTemplate;
