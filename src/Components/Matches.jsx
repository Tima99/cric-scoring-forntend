import React, { useEffect } from 'react'

export function Matches() {
    
    useEffect(()=>{
        fetch("https://api.datamuse.com/words?ml=ringing+in+the+ears")
        .then( res => console.log(res) )
        .catch(err => console.log(err) )
    }, [])
    
  return (
    <div>Matches</div>
  )
}
