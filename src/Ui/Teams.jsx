import React, { useLayoutEffect, useState } from 'react'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom'

import { SelectTeamCard, TeamCard } from '../Components'

import logo from "../assets/user-circle.jpg"
import req from '../api/request'

const dummyData = [
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  }
  ,
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  },
  {
    name: "Dragons",
    logo,
    captain: "Amit"
  }
]

export const Teams = (props) => {
  const { id } = useParams()
  // id is my for myteams and opponents for opponentsTeam
  const [teams, setTeams] = useState([])

  const { state } = useLocation()
  const { title, isSelectionTeam} = state || { title: null, isSelectionTeam: null}
  const context = useOutletContext()
  const {setMyTeam} = context || {setMyTeam: null}
  
  useLayoutEffect(() => {
    (async () => {
      try {
        if (id === 'my') {
          const res = await req.get('/myTeams')
          setTeams(res.data)
        } else {

        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [id])

  const teamCards = teams.map((team, i) => {
    return(
      <Link 
        to={id==='my' ? '/teamPreview' : `/team/${team._id}`} 
        key={team._id} 
        state={team}
      >
        <TeamCard obj={team} />
      </Link>
    )
  })
  const selectTeamCards = teams.map((team, i) => {
    return(
        <SelectTeamCard obj={team} key={team._id} setSelected={setMyTeam}/>
    )
  })

  return (
    <div className='container abs top-0 parent-full-width pd-1 bg-body pd-block-06 left-0'>
      <h2 style={{ textTransform: 'capitalize' }}>{title || props.title || "Teams"}</h2>
      <div></div>
      {
        isSelectionTeam
        ? selectTeamCards
        : teamCards
      }
    </div>
  )
}
