import React, {useState} from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { NavLayout } from '../Layouts'

export const HomePage = ({navigate}) => {
  const {state} = useLocation()
  // const navigate = useNavigate()
  console.log(state)

  const [activeTab, setActiveTab] = useState(1)
  
  return (
    <div className='full-display relative'>
      <NavLayout activeTab={activeTab} />
      <div className="outlet-container">
        <Outlet context={{setActiveTab}} />
      </div>
    </div>
  )
}
