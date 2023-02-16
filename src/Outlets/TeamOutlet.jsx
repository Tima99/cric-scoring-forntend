import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import styles from "./styles/TeamOutlet.module.css"


export const TeamOutlet = () => {
  const { setActiveTab } = useOutletContext()
  
  useEffect(()=>{
    setActiveTab(2)
  }, [])

  
  return (
    <div className={styles['team-outlet-container']}>
      <Outlet />
    </div>
  )
}
