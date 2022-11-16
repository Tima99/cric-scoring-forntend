import React , { useRef , useState} from 'react'
import { Link } from 'react-router-dom'

import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks/useSubmitForm'

export const LoginFeature = () => {
  const formRef = useRef()
  const [isFormSubmit, SubmitForm, msg] = useSubmitForm()
  const [userInputData, setUserInputData] = useState({email: '', password: ''})

  return (
    <>
      <title className='flex center between pd-1'>
        <h2 className='primary-color'>Login</h2>
        <Link to='/'><h5>Create Account</h5></Link>
      </title>

      <ShowMsg text={msg} error={msg[0] === '$' ? false : true }/>
      
      <form ref={formRef}>
        <LabelInput type='email' name='email' id='type-email' placeholder='xxxxxx@gmail.com' label='Email' onChange={setUserInputData} required />
        <LabelInput type='password' name='password' id='type-password' label='Password' onChange={setUserInputData} required />

        
        <div className='flex parent-full-width'>
          <Link className='forgot-password'>forgot password ?</Link>
        </div>
        
        <div className='flex parent-full-width'>
          <Button text="Login" alignRight={true} isFormSubmit={isFormSubmit} onClick={(e)=> SubmitForm(e, userInputData, formRef.current) } />
        </div>
        
      </form>
    </>
  )
}
