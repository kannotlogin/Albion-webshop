'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC<{
  sendMail: (FormData: FormData) => Promise<{ success: boolean; error: string | null }>
}> = ({ sendMail }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (FormData: FormData) => {
      setError('') // Reset error state
      setSuccess(false) // Reset success state

      const response = await sendMail(FormData)

      if (response.success) {
        setSuccess(true)
      } else {
        setError(response.error || 'There was a problem sending the reset email.')
      }
    },
    [sendMail],
  )

  return (
    <Fragment>
      {!success ? (
        <>
          <p>
            Voer je geregistreerde e-mailadres in. We sturen je een link om je wachtwoord opnieuw in
            te stellen.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            {error && <Message error={error} className={classes.message} />}
            <Input
              name="email"
              label="Email Address"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Button
              type="submit"
              appearance="primary"
              label="Recover Password"
              className={classes.submit}
            />
          </form>
        </>
      ) : (
        <>
          <h1>Verzoek ingediend</h1>
          <p>Controleer uw e-mail voor een link om uw wachtwoord veilig opnieuw in te stellen.</p>
        </>
      )}
    </Fragment>
  )
}
