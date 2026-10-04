import React, { useLayoutEffect, useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { MdHome, MdSearch, MdLogin, MdPersonAddAlt1 } from 'react-icons/md'
import { TbCricket } from 'react-icons/tb'
import { UserAuthentic } from '../api/request'
import brandLogo from '../assets/fox-sports-logo.png'

// Shell for the public pages (Home, Matches, Search). ONE header is used for all of them,
// so pages never draw their own. Visitors only get Home / Matches / Search (no Teams, no logout).
export const PublicLayout = () => {
  const [isAuth, setIsAuth] = useState(null) // null = checking

  useLayoutEffect(() => {
    UserAuthentic().then(() => setIsAuth(true)).catch(() => setIsAuth(false))
  }, [])

  const homeTo = isAuth ? '/home' : '/welcome'
  const searchState = { placeholder: 'Search for teams, players and more...' }

  const links = (
    <>
      <NavLink to={homeTo} end><MdHome /><span>Home</span></NavLink>
      <NavLink to='/matches'><TbCricket /><span>Matches</span></NavLink>
      <NavLink to='/search' state={searchState}><MdSearch /><span>Search</span></NavLink>
    </>
  )

  return (
    <div className='public-shell'>
      {/* same green header as the app: logo + links (+ login / sign up) */}
      <header className='public-header'>
        <span className='public-header-spacer' />
        <Link to='/' className='public-nav-brand'><img src={brandLogo} alt='Logo' /></Link>

        <nav className='public-header-links' aria-label='Main'>{links}</nav>

        <div className='public-nav-cta'>
          {isAuth === false && (
            <>
              <Link to='/login' className='cta-ghost'><MdLogin /> Login</Link>
              <Link to='/register' className='cta-solid'><MdPersonAddAlt1 /> Sign up</Link>
            </>
          )}
          {isAuth === true && <Link to='/home' className='cta-solid'>My account</Link>}
        </div>
      </header>

      <main className='public-main'>
        <Outlet context={{ isAuth }} />
      </main>

      {/* phones: app-style bottom tabs with icon + title */}
      <nav className='public-bottom' aria-label='Main tabs'>{links}</nav>
    </div>
  )
}
