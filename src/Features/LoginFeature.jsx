import React , { useRef , useState} from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../api/request'

import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks/useSubmitForm'

export const LoginFeature = () => {
  const formRef = useRef()
  const [userInputData, setUserInputData] = useState({email: '', password: ''})
  const [isFormSubmit, SubmitForm, msg] = useSubmitForm(Login, [`/${userInputData.email}/verify`, '/home'], {replace: true} )

  return (
    <>
      <title className='flex center between pd-1'>
        <h2 className='primary-color'>Login</h2>
        <Link to='/' replace={true}><h5>Create Account</h5></Link>
      </title>

      <ShowMsg text={msg} error={msg?.[0] === '$' ? false : true }/>
      
      <form ref={formRef}>
        <LabelInput type='email' name='email' id='type-email' placeholder='xxxxxx@gmail.com' label='Email' onChange={setUserInputData} required />
        <LabelInput type='password' name='password' id='type-password' label='Password' onChange={setUserInputData} required />

        
        <div className='flex parent-full-width'>
          <Link to={"/forgotPassword"} replace={true} className='forgot-password font-xxsmall capital'>forgot password ?</Link>
        </div>
        
        <div className='flex parent-full-width'>
          <Button text="Login" alignRight={true} isFormSubmit={isFormSubmit} onClick={(e)=> SubmitForm(e, userInputData, formRef.current) } />
        </div>
        
      </form>
    </>
  )
}
