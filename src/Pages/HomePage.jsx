import React, {useState} from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { useStore } from '../Hooks/useStore'
import { NavLayout } from '../Layouts'

export const HomePage = () => {
  const {state}                   = useLocation()
  const user                      = useStore(state)
  const [activeTab, setActiveTab] = useState(1)
  console.log(user);
  
  return (
    <div className='full-display relative'>
      <NavLayout activeTab={activeTab} />
      <div className="outlet-container relative">
        <Outlet context={{setActiveTab}} />
      </div>
    </div>
  )
}
