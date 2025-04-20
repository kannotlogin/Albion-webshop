'use client'

import React, { useState } from 'react'

import classes from './index.module.scss'

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value) // 🔍 Roep de zoekfunctie aan
  }

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
        className={classes.input}
      />
    </div>
  )
}

export default SearchBar
