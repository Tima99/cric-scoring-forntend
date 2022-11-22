import React from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import defaultLogo from "../assets/user-circle.jpg"

import styles from "./styles/PlayerRoleOutlet.module.css"

export const PlayerRoleOutlet = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const player = state

  if(!state){
    // if state is empty
    return navigate(-1)
  }
  
  return (
    <div className={styles['container']} onClick={() => navigate(-1)}>
      <div className={styles["wraper"]} onClick={e => e.stopPropagation()}>
        <div className={styles['player-describe']}>
          <ul>
            <li>
              <img src={player.logo || defaultLogo} alt={player.name} />
            </li>
            <li className={styles['player-box']}>
              <span>{player.name}</span>
              <span>
                <span>Edit Profile</span>
                <span>View Profile</span>
              </span>
            </li>
          </ul>
        </div>
        <hr />

        <ul className={styles['roles-container']}>
          <li>
            <input type="radio" name="roles" id="select-role-bat" />
            <label htmlFor='select-role-bat'>Bat</label>
          </li>
          <li>
            <input type="radio" name="roles" id="select-role-bowl" />
            <label htmlFor='select-role-bowl'>Bowl</label>
          </li>
          <li>
            <input type="radio" name="roles" id="select-role-all" />
            <label htmlFor='select-role-all'>All</label>
          </li>
          <li>
            <input type="radio" name="roles" id="select-role-cap" />
            <label htmlFor='select-role-cap'>Cap</label>
          </li>
          <li>
            <input type="radio" name="roles" id="select-role-admin" />
            <label htmlFor='select-role-admin'>Admin</label>
          </li>
        </ul>
      </div>
    </div>
  )
}
