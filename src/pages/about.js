import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/Seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <div className="space-y-6 max-w-2xl">
        <p className="text-lg text-base-content/80 leading-relaxed">
          Hi there! I'm Alex, the proud creator of this Tutorial Site, which is built with Gatsby and DaisyUI.
        </p>

        {/* Clean DaisyUI button styling for the back link */}
        <div className="pt-4">
          <Link to="/" className="btn btn-outline btn-primary">
            ❮ Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="About me" />

export default AboutPage