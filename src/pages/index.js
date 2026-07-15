import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from "gatsby-plugin-image"
import Seo from '../components/Seo'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <div className="space-y-6 max-w-2xl">
        <p className="text-lg text-base-content/80">
          I'm making this by following the Gatsby.js Tutorial!
        </p>
        <div className="w-full rounded-box overflow-hidden shadow-md border border-base-300/40">
          <StaticImage 
            alt='Gordo, a golden-brown Chihuahua, with a cuban chain'
            src="../images/fito.png"       
          />
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home Page" />

export default IndexPage
