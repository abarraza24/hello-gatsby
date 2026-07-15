/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Alex's Gatsby Lab",
    siteUrl: "http://localhost:8000",
  },

  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog`,
      },
    },

    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",

    {
      resolve: "gatsby-source-mongodb",
      options: {
        connectionString:
          process.env.MONGODB_CONNECTION_STRING ||
          "mongodb://localhost:27017",

        dbName:
          process.env.MONGODB_DATABASE ||
          "my_gatsby_db",

        collection: [
          process.env.MONGODB_COLLECTION ||
          "products",
        ],
      },
    },
  ],
}