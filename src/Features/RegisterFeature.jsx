import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { LabelInput, Button, ShowMsg, Backbutton } from '../Components'
import { useSubmitForm } from '../Hooks/useSubmitForm'

import { ChangeEmail, Register } from '../api/request'
import { MdArrowBack } from 'react-icons/md'

export const RegisterFeature = () => {
  const {state: changeEmail}            = useLocation()  
  // state has string i.e, email . this email is pass from verifyemail when user wants to change email

  const [inputData, setInputData]       = useState({ email : changeEmail , changeEmail })
  const [isFormSubmit, SubmitForm, msg] = useSubmitForm(changeEmail ? ChangeEmail : Register, `/${inputData.email}/verify`, changeEmail ? {} : {replace: true} )  
  const formRef                         = useRef()
  const navigate                        = useNavigate()
  
  return (
    <>
      <title className={'flex center between pd-1'}>
        <span className='flex gap-06'>
          {changeEmail && 
            <span
              onClick={
                () => navigate(-1, {replace: true})
              }
            >
              <MdArrowBack size={24}/>
            </span>
          }
          <h2 className='primary-color'>
            Create Account
          </h2>
        </span>
        <Link to='/login' replace={true}><h5>Login</h5></Link>
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
              alignSelf: "flex-start",
              opacity: '.85',
              fontSize: ".75rem"
            }}>
              <h5>Password must be</h5>
              <li>Minimum length 6</li>
              <li>Atleast one - <span className='pd-1'>Alphabet, Digit and Symbol</span></li>
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
