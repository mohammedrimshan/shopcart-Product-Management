
import { useState, type FormEvent } from 'react'
import { shippingSchema } from '../../validators/shippingValidator'
import type { ShippingDetails } from '../../types/cart'

interface ShippingFormProps {
  initialValues?: ShippingDetails
  onSubmit: (details: ShippingDetails) => void
}

type FieldName = keyof ShippingDetails

const FIELDS: {
  name: FieldName
  label: string
  type: string
  autoComplete: string
  placeholder: string
}[] = [
  {
    name: 'fullName',
    label: 'Full name',
    type: 'text',
    autoComplete: 'name',
    placeholder: 'Jane Doe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'jane@example.com',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    autoComplete: 'tel',
    placeholder: '9876543210',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    autoComplete: 'street-address',
    placeholder: '123 Main Street',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    autoComplete: 'address-level2',
    placeholder: 'Bengaluru',
  },
  {
    name: 'postalCode',
    label: 'Postal code (PIN code)',
    type: 'text',
    autoComplete: 'postal-code',
    placeholder: '560001',
  },
]

export default function ShippingForm({
  initialValues,
  onSubmit,
}: ShippingFormProps) {
  const [values, setValues] = useState<ShippingDetails>(
    initialValues ?? {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  )

  const [errors, setErrors] = useState<
    Partial<Record<FieldName, string>>
  >({})

  function validateField(name: FieldName, value: string) {
    const result = shippingSchema.shape[name].safeParse(value)

    setErrors((previous) => ({
      ...previous,
      [name]: result.success
        ? undefined
        : result.error.issues[0]?.message,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = shippingSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {}

      for (const issue of result.error.issues) {
        const name = issue.path[0] as FieldName | undefined

        if (name && !fieldErrors[name]) {
          fieldErrors[name] = issue.message
        }
      }

      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Shipping information"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const isNumericField =
            field.name === 'phone' ||
            field.name === 'postalCode'

          return (
            <div
              key={field.name}
              className={
                field.name === 'address' ? 'sm:col-span-2' : ''
              }
            >
              <label
                htmlFor={`shipping-${field.name}`}
                className="text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>

              <input
                id={`shipping-${field.name}`}
                name={field.name}
                type={field.type}
                inputMode={isNumericField ? 'numeric' : undefined}
                pattern={isNumericField ? '[0-9]*' : undefined}
                maxLength={
                  isNumericField ? 10 : undefined
                }
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(event) => {
                  let value = event.target.value

                  if (isNumericField) {
                    value = value.replace(/\D/g, '').slice(0, 10)
                  }

                  setValues((previous) => ({
                    ...previous,
                    [field.name]: value,
                  }))

                  validateField(field.name, value)
                }}
                onBlur={() =>
                  validateField(field.name, values[field.name])
                }
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name]
                    ? `shipping-${field.name}-error`
                    : undefined
                }
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {errors[field.name] && (
                <p
                  id={`shipping-${field.name}-error`}
                  role="alert"
                  className="mt-1 text-xs font-medium text-red-600"
                >
                  {errors[field.name]}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  )
}
