import * as React from 'react'
import { Link } from 'gatsby'
const AboutPage = () => {
    return(
        <main>
            <h1>About Me</h1>
            <Link to="/">Back to Home</Link>
            <p>HI there! I'm Alex the proud creator of this Tutorial Site which is built with Gatsby.</p>
        </main>
    )
}
export const Head = () => (
    <>
        <title>About Me | My Awesome Gatsby Tutorial Site</title>
        <meta name="description" content='Learn more about who I am and what I do.' />
        <meta name="robots" content='index, follow' />
    </>
)
export default AboutPage