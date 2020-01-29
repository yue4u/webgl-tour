const path = require('path');
const fs = require('fs');
const screenshotAll = require('./src/utils/thumbnails');
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /^three|glslCanvas/m,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const ShaderResult = await graphql(`
    {
      allShader {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  ShaderResult.data.allShader.edges.forEach(edge => {
    createPage({
      path: edge.node.name,
      component: path.resolve('./src/templates/ShaderTemplate.tsx'),
      context: { id: edge.node.id }
    });
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions;

  if (node.extension === 'glsl') {
    const content = await loadNodeContent(node);

    const [, title] = content.match(/\/\/ title: (.+?)$/m) || [];

    const shaderNode = {
      id: createNodeId(`[${node.id}] >>> GLSL`),
      children: [],
      name: node.name,
      title,
      content,
      birthTime: node.birthTime,
      modifiedTime: node.modifiedTime,
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(content),
        type: 'shader'
      }
    };

    createNode(shaderNode);
    createParentChildLink({ parent: node, child: shaderNode });
  }
};

exports.onPreBuild = async ({ graphql }) => {
  console.log('preBuild thumbnails!')

  const ShaderResult = await graphql(`
  {
    allShader {
      edges {
        node {
          name
          title
          content
        }
      }
    }
  }
`);

  const exists = await new Promise(res => {
    fs.readdir('./src/thumbnails', (err, items) => {
      if (err) throw err;
      res(items.map(item => item.replace('.png', '')));
    });
  })
  const shaders = ShaderResult.data.allShader.edges.map(
    ({ node }) => ({
      title: node.title || node.name,
      content: node.content
    })).filter(node => {
      let skip = exists.includes(node.title)
      if (skip) console.log(`skip ${node.title}`)
      return !skip
    });
  if (!shaders) return;
  await screenshotAll(shaders);
}

