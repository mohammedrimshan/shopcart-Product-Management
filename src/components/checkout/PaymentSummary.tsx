
import CartSummary from '../cart/CartSummary'
import type { CartItem, ShippingDetails } from '../../types/cart'

interface PaymentSummaryProps {
  items: CartItem[]
  shipping: ShippingDetails
  placingOrder: boolean
  onPlaceOrder: () => void
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

export default function PaymentSummary({
  items,
  shipping,
  placingOrder,
  onPlaceOrder,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Shipping Details
        </h2>

        <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          {[
            { label: 'Full name', value: shipping.fullName },
            { label: 'Email', value: shipping.email },
            { label: 'Phone', value: shipping.phone },
            {
              label: 'Address',
              value: `${shipping.address}, ${shipping.city}, ${shipping.postalCode}`,
            },
          ].map((field) => (
            <div key={field.label}>
              <dt className="text-slate-500">{field.label}</dt>
              <dd className="mt-1 break-words font-medium text-slate-900">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Your Items
        </h2>

        <ul className="mt-4 divide-y divide-slate-200">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex items-center gap-3 py-3"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                className="size-14 shrink-0 rounded-lg bg-slate-50 object-contain p-1"
              />

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-slate-900">
                  {product.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {quantity} × {formatCurrency(product.price)}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold text-slate-900">
                {formatCurrency(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CartSummary items={items}>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={placingOrder}
          className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>

        <p className="mt-3 text-center text-xs text-slate-500">
          This is a simulated order. No real payment will be processed.
        </p>
      </CartSummary>
    </div>
  )
}
