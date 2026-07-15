import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/Seo"

const ProductsPage = ({ data }) => {
  const products = data?.allMongodbMyGatsbyDbProducts?.nodes ?? []

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const carouselProducts = products.slice(0, 5)
  const currentFeatured = carouselProducts[currentIndex]
  const gridProducts = products.slice(5, 15)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length)
  }

  if (products.length === 0) {
    return (
      <Layout pageTitle="Local Vagrant Store 🌱">
        <div className="flex items-center justify-center p-4 py-12">
          <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
            <div className="card-body text-center items-center py-12">
              <span className="text-6xl mb-4">🛒</span>
              <h2 className="card-title text-2xl font-black text-base-content">Your shelves are empty!</h2>
              <p className="text-base-content/70 mt-2 mb-6">
                There are no products in the database. Run your python seed script to stock up.
              </p>
              <div className="badge badge-accent animate-pulse px-4 py-3 font-semibold">
                Awaiting seed_more_products.py... 🌱
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout pageTitle="Local Vagrant Store 🌱">
      
      <p className="text-lg text-base-content/65 -mt-4 mb-12">
        Sourced in real-time from your Vagrant MongoDB instance.
      </p>

      
      {currentFeatured && (
        <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl mb-16 min-h-[260px] flex flex-col justify-center p-8 sm:p-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 px-6 sm:px-10 z-10">
            <div className="max-w-xl space-y-4">
              <span className="badge badge-accent font-extrabold uppercase tracking-wider text-xs px-3 py-2">
                Featured Deal {currentIndex + 1} of {carouselProducts.length}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {currentFeatured.name}
              </h2>
              <p className="text-primary-content/85 text-sm sm:text-base leading-relaxed line-clamp-2">
                {currentFeatured.description}
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-3 min-w-[160px]">
              <span className="text-4xl font-black tracking-tight">
                ${currentFeatured.price?.toFixed(2) ?? "0.00"}
              </span>
              <button className="btn btn-neutral hover:scale-105 active:scale-95 transition-transform duration-150 font-bold px-8 shadow-md border-none">
                Buy Now
              </button>
            </div>
          </div>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20 border-none" 
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-ghost text-white hover:bg-white/20 border-none" 
            onClick={handleNext}
            aria-label="Next slide"
          >
            ❯
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {carouselProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "bg-white scale-125 px-2" : "bg-white/50 hover:bg-white/85"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex items-center justify-between mb-8 border-b border-base-300 pb-4">
        <h2 className="text-2xl font-bold text-base-content tracking-tight">
          Trending Products
        </h2>
        <span className="badge badge-neutral font-semibold py-3 px-4">
          {gridProducts.length} Items Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridProducts.map((product) => (
          <div 
            key={product.id} 
            className="card bg-base-100 shadow-xl border border-base-300/40 hover:border-primary/20 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out"
          >
            <div className="card-body justify-between h-[240px] p-6">
              <div>
                <h3 className="card-title text-lg font-bold text-base-content line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-base-content/70 mt-2 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div className="card-actions justify-between items-center mt-4 border-t border-base-200 pt-4">
                <span className="text-xl font-extrabold text-primary">
                  ${product.price?.toFixed(2) ?? "0.00"}
                </span>
                <button className="btn btn-primary btn-sm rounded-lg hover:scale-105 active:scale-95 transition-transform duration-150 border-none">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMongodbMyGatsbyDbProducts {
      nodes {
        id
        name
        price
        description
      }
    }
  }
`

export const Head = () => <Seo title="Store" />

export default ProductsPage