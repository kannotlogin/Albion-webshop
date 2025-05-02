import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Wachtwoord resetten',
  description: 'Vul email-adress in om uw wachtwoord te resetten.',
  openGraph: mergeOpenGraph({
    title: 'Wachtwoord resetten',
    url: '/recover-password',
  }),
}
