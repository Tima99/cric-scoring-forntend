import React from 'react'
import {RiLoader4Line} from "react-icons/ri"

export const Loader = ({color = 'var(--primary)', size= 45, bg, speed, style : styles}) => {
    
    return (
        <div className='parent-size abs top-0 left-0 flex center' style={{background: bg, ...styles }}>
            <RiLoader4Line color={color} size={size} className='loader' style={{animationDuration: `${speed}s`}}/>
        </div>
    )
}
