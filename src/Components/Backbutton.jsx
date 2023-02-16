import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MdArrowBack } from "react-icons/md"

export const Backbutton = ({size : sizeIcon, replace, backTimes=1, backConfirm=false, confirmRef, setStateEmpty} ) => {
    const navigate = useNavigate()
    
    function back(e){
        ( !(typeof setStateEmpty === 'function') && !backConfirm && navigate(-backTimes, {replace}))
        if(setStateEmpty) return (typeof setStateEmpty === 'function') && setStateEmpty('')

        // // console.log(confirmRef);
        // confirmRef?.current && (confirmRef.current.style.display = "block")
    }
    
    return (
        <span onClick={(e) => back(e) } style={{zIndex: 999}}>
            <MdArrowBack size={sizeIcon}/>
        </span>
    )
}
