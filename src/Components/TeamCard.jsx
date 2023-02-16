import React from 'react'
import styles from "./styles/TeamCard.module.css"
import { BiCurrentLocation } from "react-icons/bi"
import defaultLogo from "../assets/user-circle.jpg"
import { Link } from 'react-router-dom'

export const TeamCard = ({obj, btn=false, btnTo}) => {
  return (
    <section className={styles['team-card-container']} id={obj._id}>
        <div className={styles['team-logo']}>
            <img src={obj.logo || defaultLogo} alt={obj.name} />
        </div>
        
        <ul style={{textTransform: 'capitalize'}}>
            <li>
                {obj.name}
            </li>
            <li>
                <span className={obj.captainName ? styles["captain-name"] : ''}>
                    {obj.captainName }
                </span>
                <span className={obj.creatorName ? styles["admin-name"]: ''}>
                    {obj.creatorName}
                </span>
                <span style={{display: obj.location ? 'inline-block' : 'none'}}>
                    <BiCurrentLocation size={19} className='icon' color='rgba(0,0,0,.7)' style={{margin: '0 .35rem'}}/>
                    {obj.location}
                </span>
            </li>
        </ul>

        {
            btn
            ? <div className='margin-left-auto'>
                <Link to={btnTo} className='btn-link'>Add</Link>
            </div>
            : ''
        }
    </section>
  )
}
