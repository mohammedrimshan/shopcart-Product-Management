
import { describe, it, expect } from 'vitest'
import type { CartItem } from '../types/cart'
import {
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  canCheckout,
  getCartItemCount,
} from './cartCalculations'

function createCartItem(price: number, quantity: number): CartItem {
  return {
    product: {
      id: 1,
      title: 'Test Product',
      description: 'A product for testing',
      category: 'beauty',
      price,
      rating: 4.5,
      thumbnail: 'https://example.com/product.jpg',
    },
    quantity,
  }
}

describe('calculateSubtotal', () => {
  it('returns zero for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates the subtotal for multiple items', () => {
    const items = [
      createCartItem(20, 2),
      createCartItem(15, 1),
    ]

    expect(calculateSubtotal(items)).toBe(55)
  })
})

describe('calculateTax', () => {
  it('calculates 5% tax', () => {
    expect(calculateTax(100)).toBe(5)
  })
})

describe('calculateDiscount', () => {
  it('does not apply a discount at exactly $100', () => {
    expect(calculateDiscount(100)).toBe(0)
  })

  it('applies a 10% discount above $100', () => {
    expect(calculateDiscount(120)).toBe(12)
  })
})

describe('calculateTotal', () => {
  it('calculates subtotal, tax, discount, and total', () => {
    const items = [createCartItem(120, 1)]

    expect(calculateTotal(items)).toEqual({
      subtotal: 120,
      tax: 6,
      discount: 12,
      total: 114,
    })
  })

  it('calculates totals for an empty cart', () => {
    expect(calculateTotal([])).toEqual({
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    })
  })
})

describe('canCheckout', () => {
  it('returns false when the subtotal is below $10', () => {
    expect(canCheckout([createCartItem(9.99, 1)])).toBe(false)
  })

  it('returns true when the subtotal is exactly $10', () => {
    expect(canCheckout([createCartItem(10, 1)])).toBe(true)
  })

  it('returns true when the subtotal is above $10', () => {
    expect(canCheckout([createCartItem(15, 1)])).toBe(true)
  })
})

describe('getCartItemCount', () => {
  it('returns zero for an empty cart', () => {
    expect(getCartItemCount([])).toBe(0)
  })

  it('sums the quantities of all cart items', () => {
    const items = [
      createCartItem(20, 2),
      createCartItem(15, 3),
    ]

    expect(getCartItemCount(items)).toBe(5)
  })
})
