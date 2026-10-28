
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import { useCartStore } from '../store/cartStore'
import { canCheckout } from '../utils/cartCalculations'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-3 text-slate-600">
          Browse our products and add something you love.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </main>
    )
  }

  const checkoutAllowed = canCheckout(items)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-slate-600">
            Review your items before checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_350px]">
        <section className="space-y-4" aria-label="Cart items">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <CartSummary items={items} />

          {!checkoutAllowed && (
            <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              Add more products to reach the $10 minimum order subtotal.
            </p>
          )}

          {checkoutAllowed ? (
            <Link
              to="/checkout"
              className="block rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white hover:bg-indigo-700"
            >
              Proceed to checkout
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-slate-300 px-5 py-3 font-semibold text-slate-600"
            >
              Proceed to checkout
            </button>
          )}

          <Link
            to="/"
            className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}
