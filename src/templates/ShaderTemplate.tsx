import React from "react";
import { graphql } from "gatsby";
import { Layout, Shader } from "../components";

export const ShaderPageTemplate = ({ data }: any) => {
  const { id, title, content } = data.shader;

  return (
    <Layout title={title}>
      <Shader canvasId={id} fragment={content} showCode />
    </Layout>
  );
};

export const query = graphql`
  query ShaderPageBySlug($id: String!) {
    shader(id: { eq: $id }) {
      id
      title
      content
    }
  }
`;

export default ShaderPageTemplate;
