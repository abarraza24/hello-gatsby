import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/Seo"

const formatPrice = (price) => {
  const numericPrice = Number(price)

  return Number.isFinite(numericPrice)
    ? numericPrice.toFixed(2)
    : "0.00"
}

const ProductsPage = ({ data }) => {
  const products = data?.allMongodbMyGatsbyDbProducts?.nodes ?? []

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = React.useState(false)

  const carouselProducts = products.slice(0, 5)
  const currentFeatured = carouselProducts[currentIndex]
  const gridProducts = products

  React.useEffect(() => {
    if (carouselProducts.length <= 1 || isCarouselPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex(
        (previousIndex) =>
          (previousIndex + 1) % carouselProducts.length
      )
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [carouselProducts.length, isCarouselPaused])

  React.useEffect(() => {
    if (
      carouselProducts.length > 0 &&
      currentIndex >= carouselProducts.length
    ) {
      setCurrentIndex(0)
    }
  }, [carouselProducts.length, currentIndex])

  const handleNext = () => {
    if (carouselProducts.length === 0) return

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) % carouselProducts.length
    )
  }

  const handlePrev = () => {
    if (carouselProducts.length === 0) return

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex - 1 + carouselProducts.length) %
        carouselProducts.length
    )
  }

  if (products.length === 0) {
    return (
      <Layout>
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Local Vagrant Store{" "}
            <span role="img" aria-label="seedling">
              {"\u{1F331}"}
            </span>
          </h1>

          <p className="mt-3 text-lg text-base-content/65">
            Sourced in real-time from your Vagrant MongoDB instance.
          </p>
        </div>

        <div className="flex items-center justify-center p-4 py-12">
          <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
            <div className="card-body items-center py-12 text-center">
              <span
                className="mb-4 text-6xl"
                role="img"
                aria-label="shopping cart"
              >
                {"\u{1F6D2}"}
              </span>

              <h2 className="card-title text-2xl font-black text-base-content">
                Your shelves are empty!
              </h2>

              <p className="mb-6 mt-2 text-base-content/70">
                There are no products in the database. Run your Python seed
                script to stock up.
              </p>

              <div className="badge badge-accent animate-pulse px-4 py-3 font-semibold">
                Awaiting seed_more_products.py...{" "}
                <span role="img" aria-label="seedling">
                  {"\u{1F331}"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Local Vagrant Store{" "}
          <span role="img" aria-label="seedling">
            {"\u{1F331}"}
          </span>
        </h1>

        <p className="mt-3 text-lg text-base-content/65">
          Sourced in real-time from your Vagrant MongoDB instance.
        </p>
      </div>

      {currentFeatured && (
        <section
          className="relative mb-16 flex min-h-[260px] w-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-primary-content shadow-2xl sm:p-12"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocus={() => setIsCarouselPaused(true)}
          onBlur={() => setIsCarouselPaused(false)}
        >
          <div className="z-10 flex w-full flex-col items-start justify-between gap-8 px-6 sm:px-10 md:flex-row md:items-center">
            <div className="max-w-xl space-y-4">
              <span className="badge badge-accent px-3 py-2 text-xs font-extrabold uppercase tracking-wider">
                Featured Deal {currentIndex + 1} of{" "}
                {carouselProducts.length}
              </span>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {currentFeatured.name}
              </h2>

              <p className="line-clamp-2 text-sm leading-relaxed text-primary-content/85 sm:text-base">
                {currentFeatured.description}
              </p>
            </div>

            <div className="flex min-w-[160px] flex-col items-start gap-3 md:items-end">
              <span className="text-4xl font-black tracking-tight">
                ${formatPrice(currentFeatured.price)}
              </span>

              <button
                type="button"
                className="btn btn-neutral border-none px-8 font-bold shadow-md transition-transform duration-150 hover:scale-105 active:scale-95"
              >
                Buy Now
              </button>
            </div>
          </div>

          {carouselProducts.length > 1 && (
            <>
              <button
                type="button"
                className="btn btn-circle btn-ghost absolute left-4 top-1/2 z-20 -translate-y-1/2 border-none text-white hover:bg-white/20"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                ❮
              </button>

              <button
                type="button"
                className="btn btn-circle btn-ghost absolute right-4 top-1/2 z-20 -translate-y-1/2 border-none text-white hover:bg-white/20"
                onClick={handleNext}
                aria-label="Next slide"
              >
                ❯
              </button>

              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {carouselProducts.map((product, index) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-6 scale-125 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/85"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <div className="mb-8 flex items-center justify-between border-b border-base-300 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-base-content">
          All Products
        </h2>

        <span className="badge badge-neutral px-4 py-3 font-semibold">
          {gridProducts.length}{" "}
          {gridProducts.length === 1 ? "Item" : "Items"} Available
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gridProducts.map((product) => (
          <div
            key={product.id}
            className="card border border-base-300/40 bg-base-100 shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary/20 hover:shadow-2xl"
          >
            <div className="card-body h-[240px] justify-between p-6">
              <div>
                <h3 className="card-title line-clamp-1 text-lg font-bold text-base-content">
                  {product.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-base-content/70">
                  {product.description}
                </p>
              </div>

              <div className="card-actions mt-4 items-center justify-between border-t border-base-200 pt-4">
                <span className="text-xl font-extrabold text-primary">
                  ${formatPrice(product.price)}
                </span>

                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-lg border-none transition-transform duration-150 hover:scale-105 active:scale-95"
                >
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
  query ProductsPageQuery {
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