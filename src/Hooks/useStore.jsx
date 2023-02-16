import React, { useMemo, useRef } from 'react'

export const useStore = (data) => {
    const ref = useRef()
    
  const mutableData = useMemo(()=>{
    ref.current = data
    return ref.current 
  }, [])

  return mutableData
}
