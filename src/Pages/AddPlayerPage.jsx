import React from 'react'
import { TopNav } from '../Components'
import defaultLogo from "../assets/user-circle.jpg"
import { Outlet, Link, useParams, useLocation } from 'react-router-dom'

export const AddPlayerPage = () => {
    const {teamId} = useParams()
    
    return (
        <div className='tap-hightlight-none'>
            <TopNav title='Add Player' menu={false} />
            <div className="pd-1 pd-block-1 flex-col gap-1 relative">
                <Link to={`/addPlayer/${teamId}/search`}>
                    <ul className='media-object'>
                        <li><img src={defaultLogo} alt="" /></li>
                        <li>Search player</li>
                    </ul>
                </Link>
                <Link to={`/addPlayer/${teamId}/new`}>
                    <ul className='media-object'>
                        <li><img src={defaultLogo} alt="" /></li>
                        <li>Add new player</li>
                    </ul>
                </Link>
                <ul className='media-object'>
                    <li><img src={defaultLogo} alt="" /></li>
                    <li>Contacts</li>
                </ul>

                <Outlet />
            </div>
        </div>
    )
}
