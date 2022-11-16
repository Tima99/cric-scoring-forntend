import React, { useEffect, useState } from 'react'

export const useStopWatch = () => {
  const [timerCount, setTimerCount] = useState(10)  
  const [timer, setTimer] = useState()

  useEffect(()=>{
    setTimer(timerCount)

    const cb = current => {
        --current
        if(current <= 0) clearInterval(intervalId)
        return current.toString().padStart(2, 0)
    }

    const intervalId = setInterval(setTimer, 1000, cb)

    return () => clearInterval(intervalId)

  }, [timerCount])

  return [timer, setTimerCount]
}
