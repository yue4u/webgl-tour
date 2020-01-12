module.exports = {
  siteMetadata: {
    title: 'WebGl Lab.'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/shaders`,
        name: 'shaders'
      }
    },
    `gatsby-plugin-typescript`
  ]
};