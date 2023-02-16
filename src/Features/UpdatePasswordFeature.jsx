import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import req from '../api/request'
import { Button, LabelInput, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks'

export const UpdatePasswordFeature = () => {
    const {email} = useParams()
    const [inputData, setInputData] = useState({})
    const formRef = useRef()
    const [isFormSubmit, SubmitForm, msg] = useSubmitForm(resetPassword, '/login')

    async function resetPassword(data){
        try {
            const res = await req.post("/resetPassword", data)
            alert("Reset password sucess 😀.")
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }

  return (
    <>
        <title className='flex center between pd-1'>
            <h2 className='primary-color'>Change Password</h2>
            <Link to='/login'><h5>Login</h5></Link>
        </title>

        <ShowMsg text={msg} error={msg?.[0] === '$' ? false : true }/>

        
        <form ref={formRef}>
            <LabelInput type='password' name='newPassword' id='type--password' label='New Password' required onChange={setInputData} />
            <LabelInput type='password' name='newConfirmPassword' id='type--confirm-password' label='Confirm New Password' required onChange={setInputData} />
            
            <div className={`flex parent-full-width`} >
                <Button text={'Change Password'} alignRight={true} isFormSubmit={isFormSubmit} onClick={(e)=> {
                    e.preventDefault()
                    SubmitForm(e, {...inputData, email}, formRef.current)
                }} 
                fontSize= ".9rem"
                />
            </div>
        </form>


    </>
  )
}
