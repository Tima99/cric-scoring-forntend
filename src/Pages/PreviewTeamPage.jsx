import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { TopNav } from '../Components'
import './PreviewTeamPage.css'


export const PreviewTeamPage = () => {
    const { state } = useLocation()
    // console.log(state);
    
    // state has array of team
    const team = useRef()

    useLayoutEffect(() => {
        team.current = state
    }, [])

    

    const menu = useMemo(() => {
        return <>
            <div className="buttons">
                <Link to={`/addPlayer/${state._id}`}><button>Add Player</button></Link>
                <Link to={`/team/${state._id}`}><button>View Profile</button></Link>
            </div>
        </>
    }, [])

    return (
        <div className='relative full-display tap-hightlight-none'>
            <TopNav title={state.name} toggleMenu={menu} />
            <div className="relative pd-1 pd-block-1 flex-col gap-06">
                {<Outlet context={state} />}
            </div>
        </div>
    )
}
