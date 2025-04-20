'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact({
  sendMail,
}: {
  sendMail: (FormData: FormData) => Promise<{ success: boolean; error: string | null }>
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const [emailError, setEmailError] = useState<string>('')

  const onSubmit = async (formData: FormData) => {
    sendMail(formData)
    reset()
  }

  const formValues = watch()

  const validateEmail = (email: string) => {
    if (!email) return
    if (!email.includes('@')) {
      setEmailError('Invalid email (must have a @)')
    } else {
      const regex = /@([a-zA-Z0-9]+)/
      if (!regex.test(email)) {
        setEmailError('Invalid email (after @ must be a letter or number)')
      } else {
        const regex = /@([a-zA-Z0-9]+)\.[a-zA-Z0-9]+/
        if (!regex.test(email)) {
          setEmailError('Invalid email (have a .com/.be/...)')
        } else {
          setEmailError('')
        }
      }
    }
  }

  useEffect(() => {
    if (formValues.email) {
      validateEmail(formValues.email)
    }
  }, [formValues.email])

  return (
    <div className={classes.contactform}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name *
          <input {...register('name', { required: 'Name is required' })} type="text" />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </label>
        <br />

        <label>
          Email *
          <input
            {...register('email', {
              required: 'Email is required',
            })}
            type="email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}{' '}
          {emailError && !errors.email && <p style={{ color: 'red' }}>{emailError}</p>}{' '}
        </label>
        <br />

        <label>
          Subject *
          <input {...register('subject', { required: 'Subject is required' })} />
          {errors.subject && <p style={{ color: 'red' }}>{errors.subject.message}</p>}
        </label>
        <br />

        <label>
          Message *
          <textarea {...register('message', { required: 'Message is required' })} />
          {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
        </label>
        <br />

        <button
          type="submit"
          disabled={
            !formValues.name ||
            !formValues.email ||
            !formValues.subject ||
            !formValues.message ||
            !!emailError
          }
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
