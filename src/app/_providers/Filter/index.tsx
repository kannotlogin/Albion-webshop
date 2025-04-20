'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextType {
  categoryFilters: string[]
  setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState([]) // categorieën
  const [sort, setSort] = useState('-createdAt') // standaard sortering is op 'createdAt'

  // Functie om sorteerwaarde bij te werken (om -price of price toe te voegen)
  const handleSortChange = (newSort: string) => {
    setSort(newSort) // de nieuwe waarde van sort instellen (bijv. 'price' of '-price')
  }

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort: handleSortChange, // gebruiken van handleSortChange
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
