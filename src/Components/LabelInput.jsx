import React, { useState } from 'react'
import styles from './styles/LabelInput.module.css'
import { MdVisibility, MdVisibilityOff, MdEmail, MdLockOutline, MdPin, MdGroups, MdPlace, MdPerson, MdEdit } from 'react-icons/md'

// Pick a leading icon from the field type / name
const fieldIcon = (type, name = '') => {
  if (type === 'email') return <MdEmail />
  if (type === 'password') return <MdLockOutline />
  if (name === 'otp') return <MdPin />
  if (/team/i.test(name)) return <MdGroups />
  if (/location|venue/i.test(name)) return <MdPlace />
  if (/name/i.test(name)) return <MdPerson />
  return <MdEdit />
}

export const LabelInput = ({
    label="Label",
    type="text",
    name, 
    id,
    placeholder=null,
    value,
    required,
    spellCheck,
    onChange,
    setValue
}) => {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className={styles['wraper']} data={name}>
        <label htmlFor={id}>{label}</label>
        <div className={styles['field']}>
        <span className={styles['icon-left']}>{fieldIcon(type, name)}</span>
        <input 
            type={isPassword && show ? 'text' : type} 
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>{
              onChange && onChange(prevData =>{ return {...prevData, [e.target.name] : e.target.value } })
              setValue && setValue(e.target.value)
            }}
            
            required={required}
            spellCheck={spellCheck}
        />
        {isPassword &&
          <span className={styles['eye']} onClick={() => setShow(s => !s)} role="button" aria-label="Toggle password visibility">
            {show ? <MdVisibilityOff /> : <MdVisibility />}
          </span>
        }
        </div>
    </div>
  )
}
