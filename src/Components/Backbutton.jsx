import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MdArrowBack } from "react-icons/md"

export const Backbutton = ({size : sizeIcon}) => {
    const navigate = useNavigate()
    
    return (
        <span onClick={() => navigate(-1) } style={{zIndex: 999}}>
            <MdArrowBack size={sizeIcon}/>
        </span>
    )
}
