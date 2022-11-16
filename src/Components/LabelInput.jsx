import React from 'react'
import styles from './styles/LabelInput.module.css'

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
  return (
    <div className={styles['wraper']} data={name}>
        <label htmlFor={id}>{label}</label>
        <input 
            type={type} 
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
    </div>
  )
}
