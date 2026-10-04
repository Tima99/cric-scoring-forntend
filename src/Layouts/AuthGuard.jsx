import React, { useLayoutEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuthentic } from '../api/request'
import { Loader } from '../Components'

// Wraps protected routes: unauthenticated users go to /login, others see the page.
export const AuthGuard = () => {
  const [userAuthentic, setUserAuthentic] = useState(null) // null = checking

  useLayoutEffect(() => {
    UserAuthentic()
      .then(data => setUserAuthentic(!!data))
      .catch(() => setUserAuthentic(false))
  }, [])

  if (userAuthentic === null)
    return <div className='full-display relative'><Loader size={'20vmin'} speed='0.75' /></div>

  return userAuthentic ? <Outlet /> : <Navigate to='/login' replace />
}
