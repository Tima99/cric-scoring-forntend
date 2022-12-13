import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import req from '../api/request'
import { TopNav } from '../Components'
import './PreviewTeamPage.css'


export const PreviewTeamPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    // console.log(state);
    const [isDelete, setIsDelete] = useState(false)

    
    // state has array of team
    const team = useRef()

    useLayoutEffect(() => {
        team.current = state
    }, [])

    

    const menu = useMemo(() => {
        return <>
            <div className="buttons" style={{zIndex: 999999}}>
                <Link to={`/addPlayer/${state._id}`} className="flex"><button className='width-max-content'>Add Player</button></Link>
                <Link to={`/team/${state._id}`}><button  className='width-max-content'>View Profile</button></Link>
                {
                    state.matches.length <= 0 &&
                    <div onClick={async () => {
                        if(isDelete) return
                        try {
                            setIsDelete(true)
                            const res = await req.get(`/deleteTeam/${state._id}`)
                            // console.log(res.data);
                            if(res.data.includes("delete"))
                                navigate('/home/teams/my', { replace: true})
                        } catch (error) {
                            alert("Sorry, We are not able to delete.")
                        }
                        finally{
                            setIsDelete(false)
                        }
                    }}>
                            <button  className='width-max-content' style={{color: 'rgba(214, 25, 25, .8)'}}>Delete Team</button>
                    </div>
                }
            </div>
        </>
    }, [])

    return (
        <div className='relative full-display tap-hightlight-none'>
            <TopNav title={state.name && (state.name.slice(0,1)?.toUpperCase() + state.name.slice(1))} toggleMenu={menu} />
            <div className="relative pd-1 pd-block-1 flex-col gap-06">
                {<Outlet context={state} />}
            </div>
        </div>
    )
}
