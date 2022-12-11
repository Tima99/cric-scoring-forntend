import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from "./styles/NavLayout.module.css"
import {TbGridDots, TbCricket} from "react-icons/tb"
import {CgProfile} from "react-icons/cg"
import {AiOutlineTeam} from "react-icons/ai"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {BiAddToQueue} from "react-icons/bi"
import {RiBoxingLine} from "react-icons/ri"
import {BsTrophy, BsSearch} from "react-icons/bs"
import { BiLogOut } from 'react-icons/bi'
import req from "../api/request"
import brandLogo from "../assets/fox-sports-logo.png"
import { Backbutton } from '../Components'

export const NavLayout = ({ activeTab }) => {
  const toggleTeamsRef = useRef()
  const navigate = useNavigate()
  const {state} = useLocation()
  const ref = useRef()
  
  return (
    <div className={styles['nav-layout-container']}>
      <input type="checkbox" name="toggle-menu" id="toggle-menu" ref={ref} style={{display: 'none'}}/>
      <label htmlFor="toggle-menu" className={styles['hide-menu-full']} ></label>
      
      <label htmlFor='toggle-menu' className={styles["nav-button"]}>
          {
            state && typeof state._id === "string" && !state.email
            ? <Backbutton size={26} replace={true} />
            : <TbGridDots />
          }       
          
      </label>

      <Link to={'/'} className={styles["mobile-logo"]}>
        <img src={brandLogo} alt="Logo" />
      </Link>
      
      <ul className={styles["wraper"]}>
        <Link  className={styles["logo"]} to={"/"}>
          <li>
            <img src={brandLogo} alt="Logo" />
          </li>
        </Link>

        <Link className={styles["search-bar-contain"]} to={'/search'} state={{placeholder: "Search for teams, players and more..."}}>
            <input type="text" name="search" id="search" placeholder='Search for teams, players and more' />
            <button className={styles['search-button']}><BsSearch /></button>
        </Link>

        <Link className={ activeTab===1 ? styles['active'] : '' }
          onClick={(e)=>{
            e.preventDefault()
            ref.current.checked = false
            navigate('/home', {replace: true})
          }}
          to={'/home'}
          replace={true}
        >
          <CgProfile size={24}/>
          <li>
            My Profile
          </li>
        </Link>

        
        <Link className={ activeTab===2 ? `${styles['teams']} ${styles['active']}` : styles['teams'] } 
          to={'/home/teams'}
          replace={true}
          onClick={(e)=>{
            e.preventDefault()
            ref.current.checked = false
            navigate('/home/teams', {replace: true})
          }}
        >
          <AiOutlineTeam size={24} />
          <input type="checkbox" name='toggle-teams-menu' id='toggle-teams-menu' ref={toggleTeamsRef} style={{display: 'none'}}/>

          <li>
            Teams
            <label htmlFor='toggle-teams-menu' onClick={function(e){
              e.preventDefault()
              e.stopPropagation()
              toggleTeamsRef.current.checked = !toggleTeamsRef.current.checked
            }}>
              <span><IoIosArrowUp /></span>
              <span><IoIosArrowDown /></span>
            </label>
          </li>

          <ul className={styles['teams-menu']}>
            <li><BiAddToQueue size={18}/> Create Team</li>
            
            <li onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              ref.current.checked = false
              navigate('/home/teams/my', {replace: true}) 
            } }><BsTrophy size={18} /> My Teams</li>
            
            <li 
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                ref.current.checked = false
                navigate('/home/teams/opponents', {replace: true}) 
              } }
            >
            <RiBoxingLine size={18} /> Opponents</li>
          </ul>
        </Link>
        
        <Link className={ activeTab===3 ? styles['active'] : '' }
          to={'/home/teams/matches'}
          replace={true}
          onClick={(e)=>{
            e.preventDefault()
            ref.current.checked = false
            navigate('/home/teams/matches', {replace: true})
          }}
        >
          <TbCricket size={24} />
          <li>
            Matches
          </li>
        </Link>

        <Link
          onClick={async(e) => {
            e.preventDefault()
            try {
              const res = await req.get('/logout')
              if(res.data.toLowerCase().includes("logout"))
                navigate('/')
            } catch (error) {
              alert("We are not able to logout.\nSomething went wrong 😟")
            }
          }}
        >
            <BiLogOut size={22}/>
            <li>Logout</li>
        </Link>

      </ul>

    </div>
  )
}
