import React from 'react'
import { draftMode } from 'next/headers'

import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { generateMeta } from '../../_utilities/generateMeta'
import Filters from './Filters'

import classes from './index.module.scss'
import { Metadata } from 'next'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

const Products = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    console.log(error)
  }

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} />
        <Blocks blocks={page?.layout} disableTopPadding={true} />
      </Gutter>
      <HR />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Albion - Products',
  description: 'Dit is de Albion producten pagina.',
  openGraph: mergeOpenGraph({
    title: 'Albion - Products',
    url: '/products',
  }),
}

export default Products
