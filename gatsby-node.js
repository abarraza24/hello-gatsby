exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MongodbMyGatsbyDbProducts implements Node {
      name: String
      price: Float
      description: String
    }
  `)
}