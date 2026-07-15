import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div data-theme="cupcake" className="min-h-screen bg-base-200 flex flex-col">
      
      <header className="navbar bg-base-100 shadow-sm px-4 sm:px-8">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-black tracking-tight normal-case">
            {data.site.siteMetadata.title}
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-1 sm:gap-2 font-bold">
            <li>
              <Link to="/" activeClassName="bg-primary text-primary-content">Home</Link>
            </li>
            <li>
              <Link to="/about" activeClassName="bg-primary text-primary-content">About</Link>
            </li>
            <li>
              <Link to="/blog" activeClassName="bg-primary text-primary-content">Blog</Link>
            </li>
            <li>
              <Link to="/products" activeClassName="bg-primary text-primary-content">Store 🛒</Link>
            </li>
          </ul>
        </div>
      </header>

      <main className="flex-grow max-w-5xl w-full mx-auto p-6 sm:p-8">
        {pageTitle && (
          <h1 className="text-3xl sm:text-4xl font-black text-base-content mb-6 tracking-tight">
            {pageTitle}
          </h1>
        )}
        {children}
      </main>

      <footer className="footer footer-center p-4 bg-base-100 text-base-content/60 border-t border-base-200">
        <aside>
          <p>© {new Date().getFullYear()} {data.site.siteMetadata.title} • Sourced from Vagrant MongoDB</p>
        </aside>
      </footer>

    </div>
  )
}

export default Layout