import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const useSubmitForm = (api, to, options) => {
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const navigate = useNavigate()
  // message start with $ symbol means submission success otherwise not sucess
  const [message, setMessage] = useState('')

  // set message to '' to hide error or sucess msg
  useEffect(()=>{
    const timeoutId = setTimeout(setMessage, 3500, '')
    return () => clearTimeout(timeoutId)
  }, [message])

  // submit form function 
  const submitForm = async (e, data, form) => {
    e.preventDefault()
    setIsFormSubmit(true)
    if(isFormSubmit) return setMessage("Loading...")
    
    console.log(data);
    
    try{
      const isEntriesValid = form.checkValidity()
      if(!isEntriesValid) throw Error("Please Provide Valid data.")

      // send data to api
      const res = api && await api()
      
      // if sucess append sucess msg
      setMessage(`$${res || 'Done'}`)

      // after sucess you have to navigate anywhere
      to && navigate(to, {...options, replace: true} )
    }
    catch(error){
      // if any error sent it back
      if(error instanceof Error)
        setMessage(error.message) 
    }
    finally{
      setIsFormSubmit(false)
    }
  }
  
  return [isFormSubmit, submitForm, message]
}
