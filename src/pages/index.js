import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/Seo"

const IndexPage = () => {
  return (
    <Layout>
      <section className="grid items-center gap-10 py-6 lg:grid-cols-2 lg:py-14">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Gatsby practice project
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Learning Gatsby through a real data-driven project
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-base-content/65">
            This site uses Gatsby, React, GraphQL, MDX, DaisyUI, and a MongoDB
            database running in a local Vagrant environment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn btn-primary">
              View products
            </Link>

            <Link to="/blog" className="btn btn-outline">
              Read the blog
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
          <StaticImage
            alt="Gordo, a golden-brown Chihuahua wearing a Cuban chain"
            src="../images/fito.png"
            className="w-full"
          />
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
