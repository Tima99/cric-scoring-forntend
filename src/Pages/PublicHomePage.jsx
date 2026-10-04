import React from 'react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import { MdLogin, MdPersonAddAlt1, MdSensors, MdListAlt, MdGroups } from 'react-icons/md'
import { TbCricket } from 'react-icons/tb'
import { Loader } from '../Components'
import brandLogo from '../assets/fox-sports-logo.png'

// Home tab for visitors: explains the app and asks them to log in or sign up.
export const PublicHomePage = () => {
  const { isAuth } = useOutletContext() || {}

  if (isAuth === null) return <Loader />
  // already signed in -> straight to their home
  if (isAuth) return <Navigate to='/home' replace />

  return (
    <div className='landing'>
      <div className='landing-card'>
        <img className='landing-logo' src={brandLogo} alt='FoxSports' />
        <h1>Score every ball.<br />Follow every match.</h1>
        <p>Create teams, score live matches ball by ball, and share the scorecard with everyone.</p>

        <div className='landing-actions'>
          <Link to='/login' className='landing-btn primary'><MdLogin /> Login</Link>
          <Link to='/register' className='landing-btn outline'><MdPersonAddAlt1 /> Create account</Link>
        </div>

        <ul className='landing-features'>
          <li><MdSensors /><span>Live scores</span></li>
          <li><MdListAlt /><span>Scorecards</span></li>
          <li><MdGroups /><span>Teams</span></li>
        </ul>

        <Link to='/matches' className='landing-link'><TbCricket /> Browse matches without logging in</Link>
      </div>
    </div>
  )
}
