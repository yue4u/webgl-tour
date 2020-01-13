import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Shader from "../components/Shader";

export const ShaderPageTemplate = ({ data }: any) => {
  const { title, content } = data.shader;

  return (
    <Layout title={title}>
      <Shader fragment={content} showCode />
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
