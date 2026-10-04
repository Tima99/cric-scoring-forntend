import React, { useEffect, useRef } from 'react'
import { MdMenu } from 'react-icons/md'
import { Backbutton } from './Backbutton'

export const TopNav = ({ back = true, title = "Title", menu = true, toggleMenu, confirmPage , children, backConfirm, confirmRef, replace }) => {
    const checkRef = useRef()
    const menuRef = useRef()

    // hide the dropdown when clicking/tapping anywhere outside of it
    useEffect(() => {
        const isOutside = (e) => !menuRef.current?.contains(e.target) && e.target !== checkRef.current

        const onClick = (e) => {
            if (!checkRef.current?.checked) return
            // a label click also dispatches a click on its hidden checkbox: that is part of the menu
            if (e.target === checkRef.current) return
            if (isOutside(e)) checkRef.current.checked = false
            // choosing an item inside the dropdown also closes it (after the item's own click ran)
            else if (e.target.closest('.buttons a, .buttons button, .buttons > div')) checkRef.current.checked = false
        }
        // touch: only react to taps OUTSIDE. Closing on a touch inside would hide the item
        // before its click fires, so links like "Add Player" would never navigate on mobile.
        const onTouch = (e) => {
            if (checkRef.current?.checked && isOutside(e)) checkRef.current.checked = false
        }

        document.addEventListener('click', onClick)
        document.addEventListener('touchstart', onTouch, { passive: true })
        return () => {
            document.removeEventListener('click', onClick)
            document.removeEventListener('touchstart', onTouch)
        }
    }, [])

    return (
        <div className='top-nav bg-primary preview-top-bar relative'>
            {back && <Backbutton size={24} backConfirm={backConfirm} confirmRef ={confirmRef} replace={replace} />}
            <h2 className='top-nav-title text-eclipse'>{title}</h2>

            <div className='top-nav-actions'>
                {
                    menu
                        ? <>
                            <input type="checkbox" name='toggle-button' id='preview-pg-toggle-button' ref={checkRef} style={{ display: 'none' }} />
                            <label htmlFor='preview-pg-toggle-button' className='top-nav-menu' ref={menuRef}>
                                <MdMenu size={24} />
                                {toggleMenu}
                            </label>
                        </>
                        : null
                }
                {children}
            </div>
        </div>
    )
}
