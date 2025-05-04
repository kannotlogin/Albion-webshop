import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Albion',
  title: 'Albion',
  description:
    'Dit is de Albion website. Deze website is gemaakt door Quinten Delaere voor zijn eindwerk 2024-2025',
  images: [
    {
      url: 'https://mvvkjeoabgrmprvbhsop.supabase.co/storage/v1/object/public/uploads//Logo-animation-loop-background.webm',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
