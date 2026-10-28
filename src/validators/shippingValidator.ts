
import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .regex(
      /^[0-9]{10}$/,
      'Phone number must contain exactly 10 digits',
    ),

  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters'),

  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters'),

  postalCode: z
    .string()
    .trim()
    .regex(
      /^[0-9]{4,10}$/,
      'Postal code must contain 4–10 digits',
    ),
})

export type ShippingFormData = z.infer<typeof shippingSchema>
