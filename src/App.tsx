
import { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header'
import InitialLoader from './components/common/InitialLoader'
import NotFoundPage from './components/common/NotFoundPage'

import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <InitialLoader onComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
