
import { useCartStore } from '../../store/cartStore'
import type { CartItem as CartItemType } from '../../types/cart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const { product, quantity } = item

  return (
    <li className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="size-20 shrink-0 rounded-xl bg-slate-50 object-contain p-2 sm:size-24"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium capitalize text-slate-500">
              {product.category}
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 sm:text-base">
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              ${product.price.toFixed(2)} each
            </p>
          </div>

          <p className="shrink-0 font-bold text-slate-900">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => decreaseQuantity(product.id)}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${product.title}`}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="w-6 text-center text-sm font-semibold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(product.id)}
              disabled={quantity >= 5}
              aria-label={`Increase quantity of ${product.title}`}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="rounded-lg px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
