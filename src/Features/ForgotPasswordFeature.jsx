import React, { useState, useRef } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import req from '../api/request'
import { LabelInput, ShowMsg, Button } from '../Components'
import { useStopWatch, useSubmitForm } from '../Hooks'

export const ForgotPasswordFeature = () => {
    const {state} = useLocation()
    const [email, setEmail] = useState({email: state || ''})
    const formRef = useRef()
    const [isFormSubmit, SubmitForm, msg] = useSubmitForm(forgotPassword, `/${email.email}/verify`)

    async function forgotPassword({ email }){
        try {
            const res = await req.get(`/verifyFor/resetPassword/${email}`)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
  return (
    <>
        <title className='flex center between pd-1'>
            <h2 className='primary-color'>Forgot Password</h2>
            <Link to='/login' replace={true}><h5>Login</h5></Link>
        </title>

        <ShowMsg text={msg} error={msg?.[0] === '$' ? false : true }/>

        <form ref={formRef}>
            <LabelInput type='email' name='email' id='type--email' placeholder='xxxxxx@gmail.com' label='Email' value={email.email} onChange={setEmail} required />
            <div className={`flex parent-full-width`} >
                <Button text={'Reset Password'} alignRight={true} isFormSubmit={isFormSubmit} onClick={(e)=> {
                    SubmitForm(e, email, formRef.current)
                }} 
                fontSize= ".9rem"
                />
            </div>
        </form>
    </>
  )
}
