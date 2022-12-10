import React, {useState} from 'react'
import { createContext } from 'react'
import { useLocation, Outlet} from 'react-router-dom'
import { useStore } from '../Hooks/useStore'
import { NavLayout } from '../Layouts'

export const UserContext = createContext()

export const HomePage = () => {
  const {state}                   = useLocation()
  const user                      = useStore(state)
  const [activeTab, setActiveTab] = useState(1)
  
  return (
    <UserContext.Provider value={{authUser: user}}>
      <div className='full-display relative'>
        <NavLayout activeTab={activeTab} />
        <div className="outlet-container relative">
          <Outlet context={{setActiveTab, user}} />
        </div>
      </div>
    </UserContext.Provider>
  )
}
