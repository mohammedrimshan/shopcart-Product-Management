
import { Link } from 'react-router-dom'
import { getCartItemCount } from '../../utils/cartCalculations'
import { useCartStore } from '../../store/cartStore'

export default function Header() {
  const items = useCartStore((state) => state.items)
  const cartCount = getCartItemCount(items)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <span aria-hidden="true">🛍️</span>
          </span>
          ShopCart
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Shop
          </Link>

          <Link
            to="/cart"
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Cart
            <span className="rounded-full bg-white px-2 py-0.5 text-xs text-indigo-700">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
