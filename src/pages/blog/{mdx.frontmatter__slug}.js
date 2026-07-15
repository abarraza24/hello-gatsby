import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/Seo'

const BlogPost = ({ data, children }) => {
  const post = data.mdx.frontmatter
  const image = getImage(post.hero_image)

  return (
    <Layout pageTitle={post.title}>
      <article className="space-y-6 max-w-2xl">
        
        <div className="badge badge-outline p-4">
          📅 {post.date}
        </div>

        {image && (
          <div className="w-full rounded-box overflow-hidden shadow-md">
            <GatsbyImage 
              image={image} 
              alt={post.hero_image_alt} 
            />
          </div>
        )}
        <div className="text-base-content mt-6">
          {children}
        </div>

      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost