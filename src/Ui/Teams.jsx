import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { TeamCard } from '../Components'

import logo from "../assets/user-circle.jpg"

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

    const teamCards = dummyData.map( (team, i) => {
        return <Link to={'/team/89ih78aks8789snn'} key={i} ><TeamCard obj={team} /></Link>
      })
      
    
  return (
    <div className='container'>
      <h2 style={{textTransform: 'capitalize'}}>{id} Teams: </h2>
      <div></div>
      {teamCards}
    </div>
  )
}
