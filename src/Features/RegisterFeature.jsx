import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks/useSubmitForm'

import { ChangeEmail, Register } from '../api/request'

export const RegisterFeature = () => {
  const {state: changeEmail}            = useLocation()  
  // state has string i.e, email . this email is pass from verifyemail when user wants to change email

  const [inputData, setInputData]       = useState({ email : changeEmail , changeEmail })
  const [isFormSubmit, SubmitForm, msg] = useSubmitForm(changeEmail ? ChangeEmail : Register, `/${inputData.email}/verify`, changeEmail ? {} : {replace: true} )  
  const formRef                         = useRef()
  
  return (
    <>
      <title className='flex center between pd-1'>
        <h2 className='primary-color'>Create Account</h2>
        <Link to='/login'><h5>Login</h5></Link>
      </title>
      
      <ShowMsg text={msg} error={msg?.[0] === '$' ? false : true }/>

      <form ref={formRef}>
        <LabelInput type='email' name='email' id='type-email' value={inputData?.email || ''} placeholder='xxxxxx@gmail.com' label='Email' required onChange={setInputData} />
        
        {/* Hide password and confirm-password inputs when user wants to change email otherwise show */}
        { ! changeEmail 
          ? 
          <>
            <LabelInput type='password' name='password' id='type-password' label='Password' required onChange={setInputData} />
            <ul style={{
              listStylePosition: "inside",
              alignSelf: "flex-start"
            }}>
              <h5>Password must be</h5>
              <li>Minimum length 6</li>
              <li>Atleast one - <br /> <span className='pd-1'>Alphabet, Digit and Symbol</span></li>
            </ul>
            <LabelInput type='password' name='confirm-password' id='type-confirm-password' label='Confirm Password' required onChange={setInputData} />
          </>
          : null
        }
        
        <div className='flex parent-full-width'>
          <Button 
            text={changeEmail ? 'Change Email' : 'Get Started'} 
            alignRight={true} 
            isFormSubmit={isFormSubmit} 
            onClick={ (e) => SubmitForm(e, inputData, formRef.current) } 
          />
        </div>
        
      </form>
    </>
  )
}
