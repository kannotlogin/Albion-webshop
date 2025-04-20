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

    // Stel de e-mailopties in
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Order Confirmation',
      text: `Your order has been confirmed. Your order ID is ${orderID}.`,
      html: `<h1>Order Confirmation</h1><p>Your order ID is <strong>${orderID}</strong>.</p>`,
    }

    // Verstuur de e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error)
      } else {
        console.log('Email sent: ' + info.response)
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
  title: 'Order Confirmation',
  description: 'Your order has been confirmed.',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation',
    url: '/order-confirmation',
  }),
}
