import React from 'react'
import {LabelInput} from "../Components"
import {FaUser} from "react-icons/fa"
import {MdAddLocation} from "react-icons/md"

export const ProfileOutlet = () => {
  return (
    <div>
      <div className="add-logo">
        <label htmlFor="profile-logo">
          <img src="../assets/user-circle.jpg" alt="" />
        </label>
      </div>
      <LabelInput label={<FaUser />}/>
      <LabelInput label={<MdAddLocation size={23}/>} />
    </div>
  )
}
