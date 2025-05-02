import React, { Fragment } from 'react'
import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import { Message } from '../../_components/Message'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.error(error)
  }

  return (
    <div className={classes.checkout}>
      <Gutter>
        <CheckoutPage settings={settings} />
      </Gutter>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Maak een account aan of log in op uw bestaande account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
