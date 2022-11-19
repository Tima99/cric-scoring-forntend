import React from 'react'
import styles from "./styles/TeamCard.module.css"

export const TeamCard = ({obj}) => {
  return (
    <div className={styles['team-card-container']}>
        <div className={styles['team-logo']}>
            <img src={obj.logo} alt={obj.name} />
        </div>
        
        <ul>
            <li>
                {obj.name}
            </li>
            <li>
                {obj.captain}
            </li>
        </ul>
    </div>
  )
}
