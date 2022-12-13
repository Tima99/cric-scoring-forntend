import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CreateTeamRequest } from '../api/request'
import logo from "../assets/user-circle.jpg"
import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks'
import { RiTeamFill } from 'react-icons/ri'
export const CreateTeam = () => {
    const [isFormSubmit, SubmitForm, message] = useSubmitForm(CreateTeamRequest, '/home/teams/my', {replace: true, state: null})
    const formRef = useRef()
    const [inputData, setInputData] = useState({})
    
    return (
        <>
            <div className='flex between parent-full-width pd-block-06'>
                <Link to={'/home/teams/my'}>My Teams</Link>
                <Link to={'/home/teams/opponents'}>Opponents</Link>
            </div>
            
            <h1 className="title pd-top-1" style={{color: "#333"}}> <RiTeamFill /> Create Team</h1>
        <form className='flex flex-container' ref={formRef}>
            <ShowMsg text={message} error={message[0]==='$'? false: true} style={{marginTop: '.3rem'}}/>

            {/* <div className={"add-logo"}>
                <input type="file" name='profile' id='profile-logo' accept='image/*' />
                <label htmlFor="profile-logo">
                    <img src={logo} alt="" />
                </label>
            </div> */}

            <LabelInput 
                label="Team Name"
                name="name"
                id="type-team-name"
                onChange={setInputData}
                required
            />
            <LabelInput 
                label='Location'
                name='location'
                id='type-team-location'
                onChange={setInputData}
                required
            />
            
            <div className="flex gap-1 parent-full-width">
                <input type="checkbox" name="admin" id="is-admin" onChange={(e)=>{ 
                    setInputData(p => {return {...p, admin: e.target.checked}})
                }} />
                <label htmlFor="is-admin">
                    Add myself in this team
                </label>
            </div>

            <div className="parent-full-width flex">
                <Button 
                    text={'Create Team'}
                    alignRight={true}
                    onClick={(e) => SubmitForm(e, inputData, formRef.current)}
                    isFormSubmit={isFormSubmit}
                />
            </div>
        </form>
        </>
    )
}
