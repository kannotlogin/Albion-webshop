import type { Metadata } from 'next'
import type { Page, Product } from '../../payload/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: { doc: Page | Product }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  if (typeof window !== 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
    script.defer = true
    document.head.appendChild(script)

    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      await OneSignal.init({
        appId: 'dd606204-aa30-4bb1-802f-b15127682761', // je App ID
        safari_web_id: 'web.onesignal.auto.1150f274-be67-4412-813c-e6f1ba6adf3e',
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      })
    })
  }

  return {
    title: doc?.meta?.title || 'Albion',
    description: doc?.meta?.description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || 'Albion',
      description: doc?.meta?.description,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
