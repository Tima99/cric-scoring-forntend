import React, { useState, useRef } from 'react'
import { CreateTeamRequest } from '../api/request'
import logo from "../assets/user-circle.jpg"
import { LabelInput, Button, ShowMsg } from '../Components'
import { useSubmitForm } from '../Hooks'


export const CreateTeam = () => {
    const [isFormSubmit, SubmitForm, message] = useSubmitForm(CreateTeamRequest, '/home/teams/:_id', {replace: true})
    const formRef = useRef()
    const [inputData, setInputData] = useState({})
    
    return (
        <form className='flex flex-container' ref={formRef}>
            <ShowMsg text={message} error={message[0]==='$'? false: true}/>

            <div className={"add-logo"}>
                <input type="file" name='profile' id='profile-logo' accept='image/*' />
                <label htmlFor="profile-logo">
                    <img src={logo} alt="" />
                </label>
            </div>

            <LabelInput 
                label="Team Name"
                name="name"
                id="type-team-name"
                onChange={setInputData}
            />
            <LabelInput 
                label='Location'
                name='location'
                id='type-team-location'
                onChange={setInputData}
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
    )
}
