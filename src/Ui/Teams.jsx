import React, { useLayoutEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { TeamCard } from '../Components'

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

export const Teams = () => {
  const { id } = useParams()
  // id is my for myteams and opponents for opponentsTeam
  const { state } = useLocation()
  const [teams, setTeams] = useState([])
  // console.log(id, state);

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


  return (
    <div className='container'>
      <h2 style={{ textTransform: 'capitalize' }}>Teams: </h2>
      <div></div>
      {teamCards}
    </div>
  )
}
