import React, { useMemo, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import req from "../api/request"
import { ShowMsg, TeamCard, SelectTeamCard } from '../Components'
import SearchPlayer from '../Services/SearchPlayer'
import SearchTeam from '../Services/SearchTeam'
import { BiSad } from 'react-icons/bi'

export const SearchOutlet = () => {
  const { teamId } = useParams()
  const [result, setResult] = useState([])
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  // search opponenet start match passed from "StartMatchPage.jsx"
  const { state } = useLocation()
  const { placeholder, searchFor, isSelection, addBtn } = state 
  const context = useOutletContext()
  const {setOpponent} = context || {setOpponent : null}
  // console.log(isSelection, setOpponent);

  async function addPlayer(e, playerId) {
    try {
      console.log(playerId);
      // {teamId, playerId, role}
      const res = await req.post('/addPlayer', { teamId, playerId })

      navigate(-2, { state: res.data })
    } catch (error) {
      console.log(error);
      setMsg(error.response.data)
    }
  }
  const resultsEle = useMemo(() => {
    return Array.isArray(result) && result.map(r => {
      return (
        <div
          key={r._id}
          className='relative flex center'
        >
            <TeamCard obj={r} />
          {
            addBtn
            &&
            <div className='abs right-0 pd-1'>
              <button className='btn-link' onClick={e => addPlayer(e, r.email)}>Add</button>
            </div>
          }
        </div>
      )
    })
  }, [result])

  const selectedEle = useMemo(()=>{
    return Array.isArray(result) && result.map(r => {
      return (
        <SelectTeamCard obj={r} setSelected={setOpponent} key={r._id}/>
      )
    })
  }, [result])


  return (
    <div className='abs full-display top-0 left-0 bg-body margin-auto'>
      <div className="margin-auto">
        <div className="search-container relative flex between parent-full-width">
          <input type="text" name="search" id="type-search" placeholder={placeholder}
            onChange={e => {
              (searchFor === "players" && SearchPlayer(e, setResult)) || (searchFor === "teams" && SearchTeam(e, setResult))
            }}
          />
          <div className='bg-white pd-1 flex center border-bottom'><BsSearch size={17} color='var(--primary-dark)' /></div>
        </div>

        <div className="pd-1 flex-col gap-1 pd-block-06">
          <ShowMsg text={msg} error={true} style={{ paddingTop: 0 }} />
          {Array.isArray(result) && result.length === 0
            ? <div className='flex-col center' style={{ textTransform: "capitalize" }}>
              <BiSad size={80} color='gray' />
              {`No ${searchFor} found`}
            </div>
            : (isSelection ? selectedEle :resultsEle )
          }
        </div>

      </div>
    </div>
  )
}
