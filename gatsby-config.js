module.exports = {
  siteMetadata: {
    title: 'WebGl Lab.'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `thumbnails`,
        path: `${__dirname}/src/thumbnails/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/shaders`,
        name: 'shaders'
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`
  ]
};