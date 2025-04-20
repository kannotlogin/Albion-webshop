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

      // Mail naar jou (beheerder)
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

      // Bevestigingsmail naar de gebruiker
      const userMailOptions = {
        from: process.env.EMAIL_USER, // Je bevestigingsmail wordt verzonden vanaf jouw adres
        to: formData.email, // Het e-mailadres van de gebruiker
        subject: 'We hebben je bericht ontvangen', // Onderwerp voor de bevestiging
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

      // Verstuur de e-mails
      await transporter.sendMail(adminMailOptions) // Verstuur naar jou
      await transporter.sendMail(userMailOptions) // Verstuur naar de gebruiker

      return {
        success: true,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Oops! An error occurred',
      }
    }
  }

  return <ContactForm sendMail={sendMail} />
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact us here.',
  openGraph: mergeOpenGraph({
    title: 'Contact',
    url: '/contact',
  }),
}
