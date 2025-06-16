import { Metadata } from 'next'
import { Gutter } from '../../_components/Gutter'
import InstallPrompt from './InstallPrompt'

import classes from './index.module.scss'

export default function DownloadPage() {
  return (
    <section className={classes.download}>
      <Gutter>
        <h1>Download onze app</h1>
        <InstallPrompt />
      </Gutter>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Download',
  description: 'Installeer onze PWA app op je apparaat.',
  openGraph: {
    title: 'Download onze app',
    url: '/download',
  },
}
