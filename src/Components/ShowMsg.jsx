import React from 'react'
import { MdErrorOutline } from "react-icons/md"
import { FiThumbsUp } from "react-icons/fi"

export const ShowMsg = ({ text='Error', error=true, style = new Object() }) => {
    return (
        <div
            className='flex center'
            style={{
                color: error ? 'red' : 'green',
                visibility: text ? 'visible' : 'hidden',
                gap: '.4rem',
                marginTop: '.5rem',
                textTransform: "capitalize",
                ...style
            }}
        >
            {error ? <MdErrorOutline /> : <FiThumbsUp />}

            {error
                ? <p>{ text }</p>
                : <p>{ text.slice(1) }</p>  // if sucess remove sucess notation i.e, $ symbol at index 0
            } 
            &nbsp;
        </div>
    )
}
