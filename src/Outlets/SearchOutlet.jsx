import React, { useMemo, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import req from "../api/request"
import { ShowMsg, TeamCard } from '../Components'

export const SearchOutlet = () => {
  const {teamId} = useParams()
  const [result, setResult] = useState()
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function Search(e) {
    let query = e.target.value.trim().toLowerCase()
    // setQuery(query)
    // minimum 3 character require
    if (query.length < 3)
      return
    try {
      const res = await req.get(`/search?query=${query}`)
      // console.log({ data: res.data, query })
      setResult(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function addPlayer(e, playerId) {
    try {
      console.log(playerId);
      // {teamId, playerId, role}
      const res = await req.post('/addPlayer', { teamId, playerId })

      navigate(-2, {state: res.data})
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
          <div className='abs right-0 pd-1'>
            <button className='btn-link' onClick={e => addPlayer(e, r.email)}>Add</button>
          </div>
        </div>
      )
    })
  }, [result])


  return (
    <div className='abs parent-size top-0 left-0 bg-body margin-auto'>
      <div className="margin-auto">
        <div className="search-container relative flex between parent-full-width">
          <input type="text" name="search" id="type-search" placeholder='Search for player' onChange={Search} />
          <div className='bg-white pd-1 flex center border-bottom'><BsSearch size={17} color='var(--primary-dark)' /></div>
        </div>

        <div className="pd-1 flex-col gap-1 pd-block-06">
          <ShowMsg text={msg} error={true} style={{paddingTop: 0}}/>
          {resultsEle}
        </div>

      </div>
    </div>
  )
}
