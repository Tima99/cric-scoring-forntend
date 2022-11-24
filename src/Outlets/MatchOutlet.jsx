import React , {useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom'

export const MatchOutlet = () => {
    const { setActiveTab } = useOutletContext()
  
  useEffect(()=>{
    setActiveTab(3)
  }, [])

    
  return (
    <div className='flex center pd-1 pd-block-1'>
        <Link to={'/startMatch'}>
            Start a Match
        </Link>
    </div>
  )
}
