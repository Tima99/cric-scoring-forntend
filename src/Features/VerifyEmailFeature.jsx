import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm, useStopWatch } from '../Hooks'
import { ResendOtp } from '../Services'

export const VerifyEmailFeature = () => {
  const {email}                         = useParams()
  const [otp, setOtp]                   = useState('')
  const [isFormSubmit, SubmitForm, msg] = useSubmitForm()
  const formRef                         = useRef()
  const [timer, restart]                = useStopWatch()

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h4> Enter OTP sent on &nbsp;<b><u>{ email }</u></b>&nbsp; email </h4>
      </div>

      <ShowMsg text={msg} error={msg[0] === '$' ? false : true }/>

      <form className='flex-col center' ref={formRef}>
        <LabelInput 
          type='number'
          name='otp'
          id='type-otp'
          label='OTP'
          placeholder='xxxxxx'
          value={otp}
          setValue={setOtp}
          required
        />

        <div className="resend-otp flex parent-full-width">
          <span className='margin-left-auto'>
            <Link to='/' state={email} className='pd-1 active-link'>
              Change Email
            </Link>
            <Link onClick={e => ResendOtp(e, restart) } className={`${ timer > 0 ? 'disable-link' : 'active-link' }` } >
              Resend Otp <span>{timer>0 ? `${timer}s` : ''}</span>
            </Link>
          </span>
        </div>

        <div className="flex parent-full-width">
          <Button 
            text='Verify' 
            alignRight={true} 
            isFormSubmit={isFormSubmit} 
            onClick={(e)=> SubmitForm(e, otp, formRef.current)}
          />
        </div>
      </form>
    </div>
  )
}
