import React, {useLayoutEffect} from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { NavLayout } from '../Layouts'

export const HomePage = () => {
  const {state} = useLocation()
  // const navigate = useNavigate()
  console.log(state)

  
  return (
    <div>
      <NavLayout />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  )
}
