import React from 'react'
import { TopNav } from '../Components'
import defaultLogo from "../assets/user-circle.jpg"
import { Outlet, Link, useParams } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi'

export const AddPlayerPage = () => {
    const {teamId} = useParams()
    
    return (
        <div className='tap-hightlight-none'>
            <TopNav title='Add Player' menu={false} />
            <div className="pd-1 pd-block-1 flex-col gap-1 relative">
                <Link to={`/addPlayer/${teamId}/search`} style={{color: "#333"}} state={{placeholder: "Search for player", searchFor: "players", addBtn: true}}>
                    <ul className='media-object'>
                        <li
                            style={{
                                width: '45px',
                                height: '45px',
                                background: "#999999",
                                borderRadius: "100%",
                                color: "white"
                            }}
                            className='flex center'
                        >
                            <BiSearchAlt size={30}/>
                        </li>
                        <li>Search player</li>
                    </ul>
                </Link>
                <Link to={`/addPlayer/${teamId}/new`} style={{color: "#333"}}>
                    <ul className='media-object'>
                        <li><img src={defaultLogo} alt="" /></li>
                        <li>Add new player</li>
                    </ul>
                </Link>

                <Outlet />
            </div>
        </div>
    )
}
