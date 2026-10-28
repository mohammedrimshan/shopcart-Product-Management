
import ProductCard from './ProductCard'
import type { Product } from '../../validators/productValidator'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          No products found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="flex min-w-0">
          <div className="w-full">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  )
}
