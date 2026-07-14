import * as React from 'react'
import { Link } from 'gatsby'
import Seo from '../components/Seo'

const AboutPage = () => {
    return(
        <main>
            <h1>About Me</h1>
            <Link to="/">Back to Home</Link>
            <p>HI there! I'm Alex the proud creator of this Tutorial Site which is built with Gatsby.</p>
        </main>
    )
}
export const Head = () => <Seo title="About me" />

export default AboutPage