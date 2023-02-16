import { AxiosError } from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const useSubmitForm = (api=new Function(), to= new String() || new Array() || new Number(), options= new Object()) => {
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const navigate = useNavigate()
  // message start with $ symbol means submission success otherwise not sucess
  const [message, setMessage]   = useState('')
  const [response, setResponse] = useState('')

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
    
    // console.log(data);
    
    try{
      const isEntriesValid = form.checkValidity()
      if(!isEntriesValid) throw Error("Please Provide Valid data.")

      // send data to api
      const res = api && await api(data)
      // console.log(res)

      // if sucess append sucess msg
      setMessage(`$${'Done'}`)
      setResponse(res)
      if(to === null) return

      // after sucess you have to navigate anywhere
      if(Array.isArray(to)){
        const to1 = to[0]
        const to2 = to[1]
        const data = res.data
        if(typeof data === "string" && data.toLowerCase().includes("verify"))
          to1 && navigate(to1, {...options, replace: true} )
        else
          to2 && navigate(to2, {...options, state: data, replace: true} )

        return
      }

      // checking to has : 
      to = (isNaN(to) && to.includes(':') && (to.split(":")[0] + res[to.split(":")[1]])) || to 
      // console.log(res, to)
      to && navigate(to, {state : res.data, ...options} )
    }
    catch(error){
      // console.log(error)
      // if any error sent it back
      if(error instanceof Error)
        setMessage(error.message) 
      if(error instanceof AxiosError){
        // /console.log(error)
        // if axios timeout exceed we show timeout time in second 
        // because axios gives message in ms as "timeout of 25000ms exceeded"
        let timeoutError = error.message || ''
        const timeMs = timeoutError.length > 1 && timeoutError.split(' ').filter(str => str.includes('ms')).reduce((a, v)=> a+v, '')       
        const timeSec = timeMs.replace('ms', '').replaceAll('0', '') + 'sec'
        timeoutError = timeoutError.split(' ').map(str => (str.includes('ms') && timeSec) || str).reduce((a, v)=> a+' '+v, '')
        
        setMessage(error?.response?.data || `Error: ${timeoutError}`)
      }
    }
    finally{
      setIsFormSubmit(false)
    }
  }
  
  return [isFormSubmit, submitForm, message, setMessage, response]
}
