import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from "gatsby-plugin-image"
import Seo from '../components/Seo'
//Define the component
const IndexPage = () => {
  return(
  <main>
    <h1>Welcome to my Gatsby site!</h1>
     <Layout pageTitle="Home Page">
       <p>I'm making this by following the Gatbsyjs Tutorial</p>
       <StaticImage 
          alt='Gordo, a golden-brown Chihuahua, with a cuban chain'
          src="../images/fito.png"       
       />
     </Layout>
    
  </main>
  )
}


export const Head = () => <Seo title="Home Page" />

export default IndexPage
