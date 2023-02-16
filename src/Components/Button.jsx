import React from 'react'
import { Loader } from './Loader'

export const Button = ({text, alignRight=false, isFormSubmit=false, onClick, fontSize}) => {
  return (
    <button className={`${alignRight ? 'margin-left-auto': ''} relative`} onClick={onClick}>
            <span className={ isFormSubmit ? 'submit' : 'not-submit' } style={{fontSize}}>{text}</span>
            <Loader color='white' size='28'/>
    </button>
  )
}
