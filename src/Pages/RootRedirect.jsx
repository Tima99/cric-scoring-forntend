import React from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { Loader } from '../Components'

// "/" : signed-in users go to their home, visitors land on the public Matches page
export const RootRedirect = () => {
  const { isAuth } = useOutletContext() || {}

  if (isAuth === null || isAuth === undefined) return <Loader />
  return <Navigate to={isAuth ? '/home' : '/matches'} replace />
}
