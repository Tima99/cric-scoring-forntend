import React, { useRef, useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FaUser } from "react-icons/fa"
import { MdAddLocation, MdSportsCricket } from "react-icons/md"
import { TbGenderFemale } from "react-icons/tb"

import logo from "../assets/user-circle.jpg"

import styles from "./styles/ProfileOutlet.module.css"
import { useSubmitForm } from "../Hooks"
import { LabelInput, ShowMsg, Button } from "../Components"
import { CreatePlayer } from '../api/request'

export const ProfileOutlet = () => {
  const [isFormSubmit, SubmitForm, message] = useSubmitForm(CreatePlayer)
  const [inputData, setInputData]           = useState({role:"all rounder", gender: "not to say"})
  const formRef                             = useRef()
  const { setActiveTab }                    = useOutletContext()
  
  useEffect(()=>{
    setActiveTab(1)
  }, [])

  return (
    <form className={styles['profile-container']} ref={formRef}>
      <ShowMsg text={message} error={message[0]==='$' ? false : true } style={{gridColumn: '1/3'}}/>
      <div className={"add-logo"}>
        <input type="file" name='profile' id='profile-logo' accept='image/*' />
        <label htmlFor="profile-logo">
          <img src={logo} alt="" />
        </label>
      </div>

      <LabelInput
        label={<FaUser className='icon' size={20} />}
        placeholder="name"
        name={"name"}
        id="type-name"
        required  
        onChange = {setInputData}
      />
      <LabelInput
        label={<MdAddLocation size={26} className='icon' />}
        placeholder="location"
        name="location"
        id="type-location"
        required
        onChange = {setInputData}
      />

      <div className={styles["wraper"]}>

        <label htmlFor="select-role"><MdSportsCricket className='icon' size={28} /></label>
        <select name="role" id="select-role" className='select-input' 
          onChange={ (e) => setInputData(p => {return {...p, [e.target.name]: e.target.value} }) }
        >
          <option value="All Rounder">All Rounder</option>
          <option value="Right Hand Bats">Right Hand Bats</option>
          <option value="Left Hand Bats">Left Hand Bats</option>
          <option value="Fast Bowler">Fast Bowler</option>
          <option value="Medium Bowler">Medium Bowler</option>
          <option value="Leg Spinner">Leg Spinner</option>
          <option value="Off Spinner">Off Spinner</option>
        </select>
      </div>


      <div className={styles["wraper"]}>
        <label htmlFor="select-gender"> <TbGenderFemale size={27} className='icon'/> </label>
        <select name="gender" id="select-gender" className='select-input'
          onChange={ (e) => setInputData(p => {return {...p, [e.target.name]: e.target.value } }) }
        >
          <option value="Not to say">Not to say</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>


      <div className={styles['submit-btn']}>
        <Button 
            text={'Submit'} 
            isFormSubmit={isFormSubmit} 
            onClick={ (e) => SubmitForm(e, inputData, formRef.current) } 
          />
      </div>
      

    </form>
  )
}
