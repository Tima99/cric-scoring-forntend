import React, { useLayoutEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuthentic } from '../api/request'
import { Loader } from "../Components"
import logo from "../assets/fox-sports-logo.png"

export const EntryLayout = () => {
  // if user is authentic than value is true(object) otherwise false
  /* 3 stages:
    1) Loading... , where userAuthentic = null 
    2) complete but not auth, where userAuthentic = false
    3) complete but auth, where userAuthentic = object  
  */
  const [userAuthentic, setUserAuthentic] = useState(null)

  useLayoutEffect(()=>{
    UserAuthentic()
    // authentic user comes navigate it to their home 
    .then( data => setUserAuthentic(data) )
    .catch(err => setUserAuthentic(false) )
  }, [])
  
  return (
    <div className='full-display flex-col entry-layout-container'>
      <div className="brand-logo--contain">
        <img src={logo} alt="FoxSports" />
      </div>
      <div className="entry-container">
        <div className='bg-image'></div>
        <Outlet />
      </div>
      {
        userAuthentic === null  // if Loading shows Loader component 
        ? <Loader size={'20vmin'} bg="#444" speed='0.75' style={{zIndex: "9999999"}}/>
        : userAuthentic  // if user authentic navigate to home , we keep loader visible as not to expose/show outlet
          ? <><Loader size={'20vmin'} bg="#333" speed='0.75' style={{zIndex: "9999999"}} /> <Navigate to='/home' replace="true" /></> 
          : ''  // else show signu or login form
      }
    </div>
  )
}
