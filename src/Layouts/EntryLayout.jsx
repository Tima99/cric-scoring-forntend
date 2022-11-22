import React, { useLayoutEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuthentic } from '../api/request'
import { Loader } from "../Components"

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
    <div className='full-display flex center'>
      <div className="entry-container">
        <Outlet />
      </div>
      {
        userAuthentic === null  // if Loading shows Loader component 
        ? <Loader size={'20vmin'} bg="#333" speed='0.75' />
        : userAuthentic  // if user authentic navigate to home , we keep loader visible as not to expose/show outlet
          ? <><Loader size={'20vmin'} bg="#333" speed='0.75' /> <Navigate to='/home' replace="true" state={userAuthentic} /></> 
          : ''  // else show signu or login form
      }
    </div>
  )
}
