import * as React from "react"
import { graphql } from "gatsby"

const ProductsPage = ({ data }) => {
  const products = data.allMongodbMyGatsbyDbProducts.nodes

  // State to track active carousel slide
  const [currentIndex, setCurrentIndex] = React.useState(0)

  if (products.length === 0) {
    return (
      <div data-theme="cupcake" className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <p className="text-lg text-base-content/70 mb-4">No products found.</p>
          <button className="btn btn-primary">Seed Database</button>
        </div>
      </div>
    )
  }

  // Carousel gets top 5 products, grid gets the next 10
  const carouselProducts = products.slice(0, 5)
  const currentFeatured = carouselProducts[currentIndex]
  const gridProducts = products.slice(5, 15)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length)
  }

  return (
    <div data-theme="cupcake" className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-base-content mb-3 tracking-tight">
            Local Vagrant Store 🌱
          </h1>
          <p className="text-lg text-base-content/60">
            Sourced in real-time from your Vagrant MongoDB instance.
          </p>
        </header>

        {/* --- Interactive DaisyUI Hero Carousel --- */}
        <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl mb-16 min-h-[240px] flex items-center p-8 sm:p-12">
          {/* Left Arrow */}
          <button 
            className="absolute left-4 z-10 btn btn-circle btn-ghost text-white hover:bg-white/20 border-none" 
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ❮
          </button>
          
          {/* Active Carousel Item */}
          <div key={currentFeatured.id} className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 px-8 animate-fadeIn">
            <div className="max-w-xl space-y-4">
              <span className="badge badge-accent font-bold uppercase tracking-wider text-xs px-3 py-2">
                Featured Deal {currentIndex + 1}/5
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {currentFeatured.name}
              </h2>
              <p className="text-primary-content/85 text-sm sm:text-base leading-relaxed line-clamp-2">
                {currentFeatured.description}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 min-w-[150px]">
              <span className="text-3xl sm:text-4xl font-black">
                ${currentFeatured.price.toFixed(2)}
              </span>
              <button className="btn btn-neutral hover:scale-105 transition-transform duration-200 font-bold px-6 shadow-md border-none">
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 z-10 btn btn-circle btn-ghost text-white hover:bg-white/20 border-none" 
            onClick={handleNext}
            aria-label="Next slide"
          >
            ❯
          </button>
        </section>

        {/* --- Grid Title --- */}
        <div className="flex items-center justify-between mb-8 border-b border-base-300 pb-4">
          <h2 className="text-2xl font-bold text-base-content">
            Trending Products
          </h2>
          <span className="badge badge-neutral font-semibold py-3 px-4">
            Showing {gridProducts.length} Items
          </span>
        </div>

        {/* --- Limited DaisyUI Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridProducts.map((product) => (
            <div 
              key={product.id} 
              className="card bg-base-100 shadow-xl border border-base-300/60 hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out"
            >
              <div className="card-body justify-between h-[230px]">
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
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="btn btn-primary btn-sm rounded-lg hover:scale-105 transition-transform duration-150 border-none">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
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

export default ProductsPage