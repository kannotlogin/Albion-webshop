'use client'

import React, { useState } from 'react'

import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import SearchBar from '../../../_components/SearchBar'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

const Filters = ({ categories }: { categories: Category[] }) => {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter de categorieën op basis van de zoekterm
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),)

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)
      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>Search Products</h6>
        <SearchBar onSearch={query => setSearchTerm(query)} /> {/* Zoekterm instellen */}
        <HR className={classes.hr} />
        <h6 className={classes.title}>Product Categories</h6>
        <div className={classes.categories}>
          {filteredCategories.length === 0 ? (
            <p>No categories found</p> // Foutmelding als er geen resultaten zijn
          ) : (
            filteredCategories.map(category => {
              const isSelected = categoryFilters.includes(category.id)

              return (
                <Checkbox
                  key={category.id}
                  label={category.title}
                  value={category.id}
                  isSelected={isSelected}
                  onClickHandler={handleCategories}
                />
              )
            })
          )}
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="High to Low"
            value="-price"
            isSelected={sort === '-price'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Low to High"
            value="price"
            isSelected={sort === 'price'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
