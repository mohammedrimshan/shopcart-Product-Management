
import { Link } from 'react-router-dom'
import type { Product } from '../../validators/productValidator'
import { useCartStore } from '../../store/cartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/products/${product.id}`}
        aria-label={`View details for ${product.title}`}
        className="relative block aspect-square overflow-hidden bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div
          className="flex items-center gap-1 text-sm text-amber-500"
          aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
        >
          <span aria-hidden="true">★</span>
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="sr-only">out of 5 stars</span>
        </div>

        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-slate-900">
          <Link
            to={`/products/${product.id}`}
            className="transition hover:text-indigo-600 focus:outline-none focus:underline"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <p className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/products/${product.id}`}
              className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={() => addItem(product)}
              aria-label={`Add ${product.title} to cart`}
              className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
