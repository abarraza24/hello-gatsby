import * as React from 'react'
import Layout from '../components/layout'
//Define the component
const IndexPage = () => {
  return(
  <main>
    <h1>Welcome to my Gatsby site!</h1>
     <Layout pageTitle="Home Page">
       <p>I'm making this by following the Gatbsyjs Tutorial</p>
     </Layout>
    
  </main>
  )
}


export const Head = () => <title>Home Page</title>

export default IndexPage
