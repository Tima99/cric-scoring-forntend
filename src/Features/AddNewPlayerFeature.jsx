import React, { useRef, useState } from 'react'
import { Button, LabelInput, ShowMsg } from '../Components'
import defaultLogo from "../assets/user-circle.jpg"
import { useSubmitForm } from '../Hooks'
import req from '../api/request'
import { useParams } from 'react-router-dom'


export const AddNewPlayerFeature = () => {
const [isFormSubmit, SubmitForm, msg] = useSubmitForm(createPlayerApi, -2, {replace: true})
  const [data, setData] = useState({})
  const formRef = useRef()
  const { teamId } = useParams()

  async function createPlayerApi(){
    try {
      // {email, name, location(optional), role(opt), gender(opt)}
      const res = await req.post('/createPlayer', data)
      const res2 = await addPlayerApi(res.data.email)
      return res2
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function addPlayerApi(playerId){
    try {
      // {teamId, playerId, role}
      const res = await req.post('/addPlayer', {teamId, playerId})
      return res
    } catch (error) {
      return Promise.reject(error)
    }
  }
  
  return (
    <div className='abs parent-size top-0 left-0 bg-body margin-auto'>
      <h1 className='title pd-1 pd-top-03'>Add New Player:</h1>
      <ShowMsg text={msg} error={msg?.[0] === '$' ? false : true} />
      <form ref={formRef} className="margin-auto parent-size flex-col gap-1">
        {/* <div className="add-logo flex center pd-block-06">
          <input type="file" name='profile' id='profile-logo' accept='image/*' />
          <label htmlFor="profile-logo">
            <img src={defaultLogo} alt="" />
          </label>
        </div> */}

        <LabelInput
          label='Email'
          type='email'
          name={'email'}
          id='type-email'
          onChange={setData}
          required
        />
        <LabelInput
          label='Name'
          type='text'
          name={'name'}
          id={'type-name'}
          onChange={setData}
          required
        />

        <div className="flex parent-full-width">
        <Button 
          text={'Add Player'}
          alignRight={true}
          isFormSubmit={isFormSubmit}
          onClick={ e => SubmitForm(e, data, formRef.current) }
        />
        </div>
      </form>
    </div>
  )
}
