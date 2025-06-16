'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import HeaderNav from '../Nav'

import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    setIsStandalone(standalone)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const scrollContainer = document.getElementById('app') || window
    const handleScroll = () => {
      const scrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop
      setScrolled(scrollTop > 50)
    }
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  if (isStandalone) {
    return (
      <nav className={classes.headerStandalone}>
        <Gutter className={classes.wrapStandalone}>
          {/* Gebruik Material Icons als icon buttons */}
          <button className={classes.iconButton} onClick={toggleMenu} aria-label="Menu">
            <span
              className="material-icons"
              style={{ fontSize: '28px', color: 'var(--theme-text)' }}
            >
              menu
            </span>
          </button>

          <Link href="/" className={classes.iconButton} aria-label="Home">
            <span
              className="material-icons"
              style={{ fontSize: '28px', color: 'var(--theme-text)' }}
            >
              home
            </span>
          </Link>

          {/* Voeg eventueel meer icon-buttons toe, bv. zoek-icoon */}
          <button className={classes.iconButton} aria-label="Search">
            <span
              className="material-icons"
              style={{ fontSize: '28px', color: 'var(--theme-text)' }}
            >
              search
            </span>
          </button>

          {/* Menu component */}
          <HeaderNav header={header} isOpen={isOpen} />
        </Gutter>
      </nav>
    )
  }

  // Normale header voor desktop/browser
  return (
    <nav className={classes.header}>
      <Gutter className={classes.wrap}>
        <Link href="/" className={classes.logoLink}>
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={scrolled ? 100 : 170}
            height={scrolled ? 30 : 50}
            style={{ transition: 'width 0.3s ease, height 0.3s ease' }}
          />
        </Link>

        <div className={classes.hamburger} onClick={toggleMenu}>
          <div className={`${classes.bar} ${isOpen ? classes.barTop : ''}`} />
          <div className={`${classes.bar} ${isOpen ? classes.barMiddle : ''}`} />
          <div className={`${classes.bar} ${isOpen ? classes.barBottom : ''}`} />
        </div>

        <HeaderNav header={header} isOpen={isOpen} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
