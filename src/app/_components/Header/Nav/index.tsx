'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

const HeaderNav: React.FC<{ header: HeaderType; isOpen: boolean }> = ({ header, isOpen }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav className={`${classes.nav} ${isOpen ? classes.open : ''}`}>
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="none" />
      ))}
      <CartLink />
      {user ? (
        <Link href="/account">
          <div className={classes.account}>
            <Image src="/assets/icons/profile.svg" alt="profile" width={30} height={30} />
          </div>
        </Link>
      ) : (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
    </nav>
  )
}

export default HeaderNav
