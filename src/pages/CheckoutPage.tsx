
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import CheckoutSteps, {
  type CheckoutStepIndex,
} from '../components/checkout/CheckoutSteps'
import PaymentSummary from '../components/checkout/PaymentSummary'
import ShippingForm from '../components/checkout/ShippingForm'
import { useCartStore } from '../store/cartStore'
import type { ShippingDetails } from '../types/cart'
import { canCheckout } from '../utils/cartCalculations'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [currentStep, setCurrentStep] =
    useState<CheckoutStepIndex>(1)
  const [shipping, setShipping] =
    useState<ShippingDetails | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  function handlePlaceOrder() {
    setPlacingOrder(true)

    // Simulate placing an order; no real payment is processed.
    clearCart()
    setOrderSuccess(true)
    setPlacingOrder(false)
  }

  if (orderSuccess) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Order placed successfully!
        </h1>

        <p className="mt-3 text-slate-600">
          Thank you for shopping with ShopCart. Your demo order is complete.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-3 text-slate-600">
          Add products to your cart before checking out.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </main>
    )
  }

  if (!canCheckout(items)) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Minimum order not reached
        </h1>

        <p className="mt-3 text-slate-600">
          Your subtotal must be at least $10 to checkout.
        </p>

        <Link
          to="/cart"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Return to Cart
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Checkout
      </h1>

      <CheckoutSteps currentStep={currentStep} />

      <div className="mt-8">
        {currentStep === 1 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Review Your Cart
            </h2>

            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </ul>

            <CartSummary items={items}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Continue to Shipping
              </button>
            </CartSummary>
          </section>
        )}

        {currentStep === 2 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Shipping Information
            </h2>

            <ShippingForm
              key="shipping-form"
              initialValues={shipping ?? undefined}
              onSubmit={(details) => {
                setShipping(details)
                setCurrentStep(3)
              }}
            />

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-sm font-medium text-indigo-700 hover:underline"
            >
              Back to Cart Review
            </button>
          </section>
        )}

        {currentStep === 3 && shipping && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Payment Summary
            </h2>

            <p className="text-sm text-slate-600">
              Review your order and shipping details before placing
              your order.
            </p>

            <PaymentSummary
              items={items}
              shipping={shipping}
              placingOrder={placingOrder}
              onPlaceOrder={handlePlaceOrder}
            />

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-sm font-medium text-indigo-700 hover:underline"
            >
              Back to Shipping
            </button>
          </section>
        )}
      </div>
    </main>
  )
}
