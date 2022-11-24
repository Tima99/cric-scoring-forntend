import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MdArrowBack } from "react-icons/md"
import { Confirm } from './Confirm'

export const Backbutton = ({size : sizeIcon, replace, backTimes=1, backConfirm=false, confirmRef}) => {
    const navigate = useNavigate()

    function back(e){
        (!backConfirm && navigate(-backTimes, {replace}))
        console.log(confirmRef);
        confirmRef.current && (confirmRef.current.style.display = "block")
    }
    
    return (
        <span onClick={(e) => back(e) } style={{zIndex: 999}}>
            <MdArrowBack size={sizeIcon}/>
        </span>
    )
}
