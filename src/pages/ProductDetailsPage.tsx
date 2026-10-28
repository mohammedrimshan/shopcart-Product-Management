
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import LoadingPage from '../components/common/LoadingPage'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Unable to load product
        </h1>
        <p className="mt-3 text-slate-600">
          {error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      </main>
    )
  }

  const productId = Number(id)
  const product = products.find((item) => item.id === productId)

  if (!id || !Number.isInteger(productId) || !product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Product not found
        </h1>
        <p className="mt-3 text-slate-600">
          This product may not exist or may no longer be available.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Back to products
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          <span aria-hidden="true">←</span>
          Back to products
        </Link>

        <section className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
          <div className="flex min-h-80 items-center justify-center bg-white p-8 sm:p-12">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[420px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center border-t border-slate-100 p-6 sm:p-10 md:border-l md:border-t-0">
            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
              {product.category}
            </span>

            <div
              className="mt-5 flex items-center gap-2 text-sm text-amber-500"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              <span aria-hidden="true">★</span>
              <span className="font-semibold">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-slate-500">out of 5</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              {product.description}
            </p>

            <p className="mt-6 text-3xl font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addItem(product)}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Cart
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              You can add up to 5 units of each product to your cart.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
