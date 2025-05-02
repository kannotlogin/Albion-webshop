import React from 'react'
import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { LogoutPage } from './LogoutPage'

import classes from './index.module.scss'

export default async function Logout() {
  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {}

  return (
    <Gutter className={classes.logout}>
      <LogoutPage settings={settings} />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Uitloggen',
  description: 'U bent uitgelogd.',
  openGraph: mergeOpenGraph({
    title: 'Uitloggen',
    url: '/logout',
  }),
}
