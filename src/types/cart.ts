
import type { Product } from '../validators/productValidator'

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}
