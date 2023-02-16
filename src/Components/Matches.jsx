import React from 'react'
import { useContext } from 'react'
import { useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MatchesContext } from '../Pages/TeamPage'
import { getTeamMatches } from '../Services'
import { Loader } from './Loader'
import { MatchCard } from './MatchCard'

export function Matches() {
  const {matches, setMatches, matchesIdArr} = useContext(MatchesContext)
  useLayoutEffect(() => {
    if(!matches)
        getTeamMatches(matchesIdArr)
        .then( matches => { setMatches(matches) })
        .catch( err => {
          console.log(err); 
          setMatches([]); 
        })
  }, [])

  return (
    <div className='relative flex-col-rev j-flex-end gap-1'>
      {
        matches === null 
        ? <Loader style={{paddingTop: '1.4rem', alignItems: 'flex-start' }}/>
        : (matches.length > 0 ? matches.map( match => {
              return <NavLink
                    key={match._id}
                    style={{ color: "inherit" }}
                    to={"/viewMatch"}
                    state={match}
                >
                    <MatchCard match={match} />
                </NavLink>
        }) : "No Matches Found. Play your first match.")
      }
    </div>
  )
}
