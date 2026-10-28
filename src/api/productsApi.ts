
import {
  productsResponseSchema,
  type Product,
} from '../validators/productValidator'

const PRODUCTS_API_URL = 'https://dummyjson.com/products'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again.')
  }

  const data: unknown = await response.json()
  const validatedData = productsResponseSchema.parse(data)

  return validatedData.products
}
