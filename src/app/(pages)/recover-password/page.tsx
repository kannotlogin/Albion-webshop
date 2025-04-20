import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import nodemailer from 'nodemailer'
import payload from 'payload'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export default async function RecoverPassword() {
  const sendMail = async (formData: FormData) => {
    'use server'

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const response = await payload.forgotPassword({
        collection: 'users',
        data: { email: formData.email },
      })

      if (!response) {
        throw new Error('Token is missing in the response')
      }

      const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${response}`

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: formData.email,
        subject: 'Reset Password',
        text: `Click the following link to reset your password: ${resetLink}`,
        html: `<a href="${resetLink}">Click here to reset your password</a>`,
      }

      await transporter.sendMail(mailOptions)

      return { success: true, error: null }
    } catch (error) {
      console.error('Error sending password reset email:', error)
      return { success: false, error: 'Oops! An error occurred' }
    }
  }

  return (
    <section className={classes.recoverPassword}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image src="/assets/icons/arrow-left.svg" alt="left arrow" width={24} height={24} />
            <p>Back</p>
          </Link>
          <div className={classes.formTitle}>
            <h3>Forgot Password</h3>
          </div>
          <RecoverPasswordForm sendMail={sendMail} />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
