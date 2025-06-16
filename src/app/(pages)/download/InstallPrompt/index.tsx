'use client'

import React, { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice
    if (choiceResult.outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (isInstalled) {
    return <p>Bedankt voor het installeren van onze app!</p>
  }

  return deferredPrompt ? (
    <>
      <p>Je kunt de app hier installeren op je apparaat.</p>
      <button onClick={handleInstallClick} type="button">
        App installeren
      </button>
    </>
  ) : (
    <p>Gebruik de browser om de app toe te voegen aan je startscherm.</p>
  )
}
