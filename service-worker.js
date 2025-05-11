importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.worker.js')
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.NetworkFirst(),
)
