# 🛒 ShopCart – Product Management & Shopping Cart

A responsive shopping cart application built with React, TypeScript, and modern frontend tools. ShopCart allows users to browse products, search and filter items, manage cart quantities, and complete a validated multi-step checkout process.

## ✨ Features

### 🛍️ Product Listing
- Fetches product data from the [DummyJSON Products API](https://dummyjson.com/products).
- Displays product images, titles, categories, prices, and ratings.
- Includes loading and error states.
- Supports product search, category filtering, and maximum-price filtering.
- Provides a clear-filters option.

### 🛒 Shopping Cart
- Add products to the cart and remove them.
- Increase or decrease item quantities.
- Enforces a minimum quantity of 1 and a maximum quantity of 5 per product.
- Automatically calculates the subtotal, tax, discount, and total.
- Persists cart data in browser local storage.

### 💳 Multi-Step Checkout
1. **Cart Review** – Review cart items and order totals.
2. **Shipping Details** – Enter and validate shipping information.
3. **Payment Summary** – Review shipping details and the final order amount before placing the order.

### ✅ Validation and Pricing
- Uses Zod to validate API responses and shipping form inputs.
- Displays inline validation errors.
- Applies 5% tax.
- Applies a 10% discount when the subtotal exceeds $100.
- Requires a minimum subtotal of $10 to proceed to checkout.
- Displays an order confirmation and clears the cart after a successful order.

### 📱 User Experience
- Responsive layout for desktop and mobile screens.
- Initial delivery-themed animation.
- Product loading skeletons.
- A custom 404 page for unknown routes.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| Tailwind CSS | Responsive styling |
| Zustand | Cart state management |
| TanStack Query | Product fetching and server-state management |
| Zod | Data and form validation |
| React Router | Page navigation |
| lottie-react | Delivery animation |
| pnpm | Package management |
| localStorage | Cart persistence |

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohammedrimshan/shopcart-Product-Management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shopcart-Product-Management
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## 🏗️ Production Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 📁 Project Structure

```text
src/
├── api/                 # Product API requests
├── assets/              # Images and animation assets
├── components/
│   ├── cart/            # Cart items and summary
│   ├── checkout/        # Checkout steps, shipping, payment summary
│   ├── common/          # Loader and shared pages
│   ├── layout/          # Header and layout components
│   └── products/        # Product cards and product list
├── hooks/               # Product fetching, filtering, and debounce hooks
├── pages/               # Products, cart, and checkout pages
├── store/               # Zustand cart store
├── types/               # TypeScript interfaces
├── utils/               # Cart calculations
├── validators/          # Zod schemas
├── App.tsx              # Application routes and initial loader
└── main.tsx             # Application entry point
```

## 🧮 Pricing Rules

| Rule | Calculation |
|---|---|
| Tax | 5% of subtotal |
| Discount | 10% of subtotal when subtotal is greater than $100 |
| Checkout eligibility | Subtotal must be at least $10 |
| Maximum quantity | 5 units per product |

The displayed total is calculated as:

**Total = Subtotal + Tax − Discount**

## 🌐 API

Product data is retrieved from:

[https://dummyjson.com/products](https://dummyjson.com/products)

TanStack Query manages product fetching, while Zod validates the API response before the application uses the data.

## 👨‍💻 Author

**Mohammed Rimshan**

- GitHub: [@mohammedrimshan](https://github.com/mohammedrimshan)

## 📄 License

This project was developed as a shopping cart application assignment.
