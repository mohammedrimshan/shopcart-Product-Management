
import type { CartItem } from '../types/cart'

const TAX_RATE = 0.05
const DISCOUNT_RATE = 0.1
const DISCOUNT_THRESHOLD = 100
const MINIMUM_CHECKOUT_AMOUNT = 10

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
}

export function calculateTax(subtotal: number): number {
  return subtotal * TAX_RATE
}

export function calculateDiscount(subtotal: number): number {
  return subtotal > DISCOUNT_THRESHOLD
    ? subtotal * DISCOUNT_RATE
    : 0
}

export function calculateTotal(items: CartItem[]) {
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const total = subtotal + tax - discount

  return {
    subtotal,
    tax,
    discount,
    total,
  }
}

export function canCheckout(items: CartItem[]): boolean {
  return calculateSubtotal(items) >= MINIMUM_CHECKOUT_AMOUNT
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}
