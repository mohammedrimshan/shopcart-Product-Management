
import { useMemo, useState } from 'react'
import type { Product } from '../validators/productValidator'
import { useDebounce } from './useDebounce'

export function useProductFilters(products: Product[]) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [maxPrice, setMaxPrice] = useState('')

    const debouncedSearch = useDebounce(search, 300)

    const categories = useMemo(
        () => [...new Set(products.map((product) => product.category))],
        [products],
    )

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(debouncedSearch.trim().toLowerCase())

            const matchesCategory =
                category === 'all' || product.category === category

            const matchesPrice =
                maxPrice.trim() === '' ||
                (Number.isFinite(Number(maxPrice)) &&
                    product.price <= Number(maxPrice))

            return matchesSearch && matchesCategory && matchesPrice
        })
    }, [products, debouncedSearch, category, maxPrice])

    function clearFilters() {
        setSearch('')
        setCategory('all')
        setMaxPrice('')
    }

    return {
        search,
        setSearch,
        category,
        setCategory,
        maxPrice,
        setMaxPrice,
        categories,
        filteredProducts,
        clearFilters,
    }
}
