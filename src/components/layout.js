import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Products 🛒", to: "/products" },
]

const Layout = ({ pageTitle, description, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title

  return (
    <div className="min-h-screen bg-base-200">
      <header className="border-b border-base-300 bg-base-100">
        <div className="navbar mx-auto max-w-6xl px-4 sm:px-6">
          <div className="navbar-start">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-base-content"
            >
              {siteTitle}
            </Link>
          </div>

          <nav className="navbar-end">
            <ul className="menu menu-horizontal gap-1 p-0">
              {navigation.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeClassName="bg-base-200 font-semibold"
                    className="rounded-md text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-140px)] w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {pageTitle && (
          <header className="mb-10 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {pageTitle}
            </h1>

            {description && (
              <p className="mt-3 text-base leading-7 text-base-content/65">
                {description}
              </p>
            )}
          </header>
        )}

        {children}
      </main>

      <footer className="border-t border-base-300 bg-base-100">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-base-content/60 sm:px-6">
          © {new Date().getFullYear()} {siteTitle}
        </div>
      </footer>
    </div>
  )
}

export default Layout