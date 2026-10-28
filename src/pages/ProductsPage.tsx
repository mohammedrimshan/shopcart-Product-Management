
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useProductFilters } from '../hooks/useProductFilters'
import ProductList from '../components/products/ProductList'
import LoadingPage from '../components/common/LoadingPage'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating'

const fieldClass =
  'w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100'

const iconClass =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600'

function ProductsError({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl font-bold text-red-600">
          !
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Unable to load products
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {message}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </section>
    </main>
  )
}

export default function ProductsPage() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts()

  const {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  } = useProductFilters(products)

  const [sortBy, setSortBy] = useState<SortOption>('default')

  // Sort a copy so the original filtered array is not mutated.
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price

      case 'price-desc':
        return b.price - a.price

      case 'rating':
        return b.rating - a.rating

      default:
        return 0
    }
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <ProductsError
        message={
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        }
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 px-6 py-10 text-white shadow-lg shadow-indigo-200 sm:px-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-violet-300/20 blur-2xl" />

          <span className="relative inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            Welcome to ShopCart
          </span>

          <h1 className="relative mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Discover Products
          </h1>

          <p className="relative mt-3 max-w-xl text-indigo-100">
            Find your favourites and add them to your cart.
          </p>
        </header>

        <section
          aria-label="Product filters and sorting"
          className="sticky top-3 z-10 mb-6 rounded-3xl border border-white bg-white/80 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <label className="group relative block">
              <svg
                className={iconClass}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className={fieldClass}
              />
            </label>

            {/* Category filter */}
            <label className="group relative block">
              <span className={iconClass} aria-hidden="true">
                ▦
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className={`${fieldClass} cursor-pointer capitalize`}
              >
                <option value="all">All categories</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {/* Maximum price filter */}
            <label className="group relative block">
              <span
                className={`${iconClass} font-semibold`}
                aria-hidden="true"
              >
                $
              </span>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Maximum price"
                aria-label="Maximum price"
                className={fieldClass}
              />
            </label>

            {/* Product sorting */}
            <label className="group relative block">
              <span className={iconClass} aria-hidden="true">
                ↕
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                aria-label="Sort products"
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600" aria-live="polite">
              <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-bold text-indigo-700">
                {filteredProducts.length}
              </span>{' '}
              products found
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              Clear filters
            </button>
          </div>
        </section>

        <ProductList products={sortedProducts} />
      </div>
    </main>
  )
}
