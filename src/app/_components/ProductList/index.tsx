'use client'

import React, { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  // Voeg andere producteigenschappen toe indien nodig
}

interface ProductListProps {
  products: Product[]
  searchQuery: string
}

const ProductList: React.FC<ProductListProps> = ({ products, searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', products)
      setFilteredProducts([])
      return
    }

    console.log('Filtering products with query:', searchQuery)
    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredProducts(filtered)
  }, [products, searchQuery])

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  )
}

export default ProductList
