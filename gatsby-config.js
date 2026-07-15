/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "My First Gatsby Site",
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
         path: `${__dirname}/blog`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",

    // Mongo configuration 
    {
      resolve: `gatsby-source-mongodb`,
      options: {
         //Point to Vagrant VM's forwarded MongoDB port
         connectionString: `mongodb://localhost:27017`,
         dbName: `my_gatsby_db`,
         //Gatsby will look specifically for 'products' in the collection
         collection: [`products`],
      },
    },
  ],
};
