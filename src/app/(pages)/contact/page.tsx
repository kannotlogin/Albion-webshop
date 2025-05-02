import { Metadata } from 'next'
import nodemailer from 'nodemailer'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import ContactForm from './ContactForm'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
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

      const adminMailOptions = {
        from: formData.email,
        to: process.env.EMAIL_USER,
        replyTo: formData.email,
        subject: formData.subject,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        html: `
          <html>
            <body>
              <h3>Contact Form Submission</h3>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Message:</strong></p>
              <p>${formData.message}</p>
            </body>
          </html>
        `,
      }

      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: formData.email,
        subject: 'We hebben je bericht ontvangen',
        text: `Hallo ${formData.name},\n\nWe hebben je bericht ontvangen. We nemen zo snel mogelijk contact met je op.\n\nMet vriendelijke groet,\nAlbion`,
        html: `
          <html>
            <body>
              <h3>We hebben je bericht ontvangen</h3>
              <p>Hallo ${formData.name},</p>
              <p>We hebben je bericht ontvangen. We nemen zo snel mogelijk contact met je op.</p>
              <p>Met vriendelijke groet,<br>Albion</p>
            </body>
          </html>
        `,
      }

      await transporter.sendMail(adminMailOptions)
      await transporter.sendMail(userMailOptions)

      return {
        success: true,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Oops! Er is een fout opgetreden',
      }
    }
  }

  return <ContactForm sendMail={sendMail} />
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contacteer ons hier.',
  openGraph: mergeOpenGraph({
    title: 'Contact',
    url: '/contact',
  }),
}
