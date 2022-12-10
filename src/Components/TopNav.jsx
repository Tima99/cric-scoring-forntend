import React from 'react'
import { MdMenu } from 'react-icons/md'
import { Backbutton } from './Backbutton'

export const TopNav = ({ title = "Title", menu = true, toggleMenu, confirmPage , children, backConfirm, confirmRef, replace }) => {
    return (
        <div
            className={`flex gap-1 r-v-center pd-1 pd-block-06 bg-primary preview-top-bar ${menu && 'between'} relative`}
        >
            <Backbutton size={26} backConfirm={backConfirm} confirmRef ={confirmRef} replace={replace} />
            <h2 className='color-white'>{title}</h2>

            {
                menu
                    ? <>
                        <input type="checkbox" name='toggle-button' id='preview-pg-toggle-button' style={{ display: 'none' }} />
                        <label htmlFor='preview-pg-toggle-button'>
                            <MdMenu size={24} className='icon' color='black' />
                            {toggleMenu}
                        </label>
                    </>
                    : ''
            }

            {
                children
            }
        </div>
    )
}
