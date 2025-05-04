import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Albion',
  title: 'Albion',
  description:
    'Welkom op deze onofficiële Albion-website, gemaakt door Quinten Delaere als eindwerk voor het schooljaar 2024-2025. Met dit project wilde hij zijn passie voor design en webontwikkeling combineren in een persoonlijke interpretatie van het Albion-merk.',
  images: [
    {
      url: 'https://mvvkjeoabgrmprvbhsop.supabase.co/storage/v1/object/public/uploads//Logo-blurredShopBG.webp',
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
