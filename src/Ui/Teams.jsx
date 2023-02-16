import React, { useLayoutEffect, useState } from 'react'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom'

import { Loader, SelectTeamCard, TeamCard } from '../Components'

import logo from "../assets/user-circle.jpg"
import req from '../api/request'
import { BiSad} from 'react-icons/bi'
import { RiEmotionSadLine } from 'react-icons/ri'


export const Teams = (props) => {
  const { id } = useParams()
  // id is my for myteams and opponents for opponentsTeam
  const [teams, setTeams] = useState(null)

  const { state } = useLocation()
  const { title, isSelectionTeam} = state || { title: null, isSelectionTeam: null}
  const context = useOutletContext()
  const {setMyTeam} = context || {setMyTeam: null}
  
  useLayoutEffect(() => {
    (async () => {
      try {
        if (id === 'my') {
          const res = await req.get('/myTeams')
          // console.log(res.data);
          setTeams(res.data)
        } else {
          const res = await req.get('/myOpponentsTeam')
          setTeams(res.data)
        }
      } catch (error) {
        // console.log(error);
        setTeams([])
      }
    })()
  }, [id])

  const teamCards = Array.isArray(teams) ? teams.map((team, i) => {
    return(
      <Link 
        to={id==='my' ? '/teamPreview' : `/team/${team._id}`} 
        key={team._id+ i} 
        state={team}
        style={{color: "#333"}}
      >
        <TeamCard obj={team} />
      </Link>
    )
  }) : null

  const selectTeamCards = Array.isArray(teams) ? teams.map((team, i) => {
    return(
        <SelectTeamCard obj={team} key={team._id} setSelected={setMyTeam}/>
    )
  }) : null

  return (
    <div className='container abs top-0 parent-full-width pd-1 bg-body pd-block-06 left-0'>
      <div className={`flex between ${!isSelectionTeam ? 'r-v-center': ''}`}>
        <h2 style={{ textTransform: 'capitalize' }}>{title || props.title || id === "my" ? "Teams" : "Opponents"}</h2>
        {
          !isSelectionTeam
          && <Link to={'/home/teams'}>Create Team</Link>
        }
      </div>
     
      {
        isSelectionTeam
        ? (teams === null ?   
            <div className='flex-col gap-1 height-remain'>
              <Loader style={{
                paddingTop: "1.4rem",
                alignItems: "flex-start",
                marginTop: "3rem"
              }}/>
            </div>
          : <div className='flex-col gap-1 height-remain' style={{paddingBottom: ".8rem"}}>
              {teams.length ? selectTeamCards : <div className='flex-col center'>No Teams Found. <Link to={'/home/teams'} className='pd-block-1 font-xsmall'>First Create One.</Link></div>}
            </div>)

        : (teamCards === null 
          ? <Loader style={{
              paddingTop: "1.4rem",
              alignItems: "flex-start",
              marginTop: "3rem"
            }}/>
          : (teamCards.length ? teamCards : 
            <div className='flex-col center title-small'>
            { id === "my" 
              ? <>
                  <RiEmotionSadLine size={64} color={'grey'} />
                  <span>No Teams Found.</span>
                  <Link to={'/home/teams'} className='pd-block-1 btn-link font-xsmall'>First Create One.</Link>
                </>
              : <><span>No Opponents Found!</span> 
                  <Link to={'/home/teams/my'} className='btn-link pd-block-1'>My Teams</Link>
                  <Link to={'/home/teams/matches'} className='btn-link'>Go to Matches</Link>
                </>
            }

            </div>) 
          )  
      }
    </div>
  )
}
