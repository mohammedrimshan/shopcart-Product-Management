
import type { ReactNode } from 'react'
import { calculateTotal, getCartItemCount } from '../../utils/cartCalculations'
import type { CartItem } from '../../types/cart'

interface CartSummaryProps {
  items: CartItem[]
  children?: ReactNode
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

export default function CartSummary({ items, children }: CartSummaryProps) {
  const { subtotal, tax, discount, total } = calculateTotal(items)
  const itemCount = getCartItemCount(items)

  return (
    <section
      aria-label="Order summary"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
      <p className="mt-1 text-sm text-slate-500">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </p>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Tax (5%)</dt>
          <dd>{formatCurrency(tax)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Discount (10% over $100)</dt>
          <dd className="font-medium text-emerald-600">
            {discount > 0 ? `−${formatCurrency(discount)}` : '—'}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-slate-200 pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-bold">{formatCurrency(total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-5">{children}</div>}
    </section>
  )
}
