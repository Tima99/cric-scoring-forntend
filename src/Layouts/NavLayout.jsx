import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from "./styles/NavLayout.module.css"
import {TbGridDots, TbCricket} from "react-icons/tb"
import {CgProfile} from "react-icons/cg"
import {AiOutlineTeam} from "react-icons/ai"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {BiAddToQueue} from "react-icons/bi"
import {RiBoxingLine} from "react-icons/ri"
import {BsTrophy, BsSearch} from "react-icons/bs"

export const NavLayout = () => {
  const toggleTeamsRef = useRef()

  return (
    <div className={styles['nav-layout-container']}>
      <input type="checkbox" name="toggle-menu" id="toggle-menu" style={{display: 'none'}}/>
      
      <label htmlFor='toggle-menu' className={styles["nav-button"]}>
          <TbGridDots />
      </label>

      <div className={styles["mobile-logo"]}>
        <img src="https://i.postimg.cc/K842zBGP/465-4654947-fox-sports-live-fox-sports-logo-2009-hd-removebg-preview.png" alt="Logo" />
      </div>
      
      <ul className={styles["wraper"]}>
        <Link  className={styles["logo"]}>
          <li>
            <img src="https://i.postimg.cc/K842zBGP/465-4654947-fox-sports-live-fox-sports-logo-2009-hd-removebg-preview.png" alt="Logo" />
          </li>
        </Link>

        <li className={styles["search-bar-contain"]}>
          <input type="text" name="search" id="search" placeholder='Search for teams, players and more' />
          <button className={styles['search-button']}><BsSearch /></button>
        </li>

        <Link className={styles['active']}>
          <CgProfile size={24}/>
          <li>
            My Profile
          </li>
        </Link>

        
        <Link className={styles['teams']}>
          <AiOutlineTeam size={24} />
          <input type="checkbox" name='toggle-teams-menu' id='toggle-teams-menu' ref={toggleTeamsRef} style={{display: 'none'}}/>

          <li>
            Teams
            <label htmlFor='toggle-teams-menu' onClick={function(e){
              e.preventDefault()
              toggleTeamsRef.current.checked = !toggleTeamsRef.current.checked
            }}>
              <span><IoIosArrowUp /></span>
              <span><IoIosArrowDown /></span>
            </label>
          </li>

          <ul className={styles['teams-menu']}>
            <li><BiAddToQueue size={18}/> Create Team</li>
            <li><BsTrophy size={18} /> My Teams</li>
            <li><RiBoxingLine size={18} /> Opponents</li>
          </ul>
        </Link>
        
        <Link>
          <TbCricket size={24} />
          <li>
            Matches
          </li>
        </Link>

      </ul>

    </div>
  )
}
