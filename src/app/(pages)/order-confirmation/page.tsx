import React, { Suspense } from 'react'
import { Metadata } from 'next'
import nodemailer from 'nodemailer'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  const sendOrderConfirmationEmail = (userEmail, orderID) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Orderbevestiging',
      text: `Uw bestelling is bevestigd. Uw order-ID is ${orderID}.`,
      html: `<h1>Orderbevestiging</h1><p>Uw bestellings-ID is <strong>${orderID}</strong>.</p>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Fout bij het verzenden van e-mail:', error)
      } else {
        console.log('Email verzonden: ' + info.response)
      }
    })
  }

  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Orderbevestiging',
  description: 'Uw aankoop is bevestigt.',
  openGraph: mergeOpenGraph({
    title: 'Orderbevestiging',
    url: '/order-confirmation',
  }),
}
