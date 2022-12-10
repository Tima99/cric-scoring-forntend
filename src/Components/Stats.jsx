import React from 'react'
import { Tab } from './Tab'

export const Stats = ({ id , matches, stats}) => {

    return (
        <div className='relative'>
            {
                    <div className="tab-container">
                        < Tab title='matches' text={matches || 0} />
                        <Tab title='upcoming' text={0} />
                        <Tab title='won' text={stats?.won || 0} />
                        <Tab title='lost' text={ (matches - (stats?.won || 0) - (stats?.tie || 0)) } />
                        <Tab title='tie' text={stats?.tie || 0} />
                        <Tab title='drawn' text={stats?.drawn || 0} />
                        <Tab title='NR' text={0} />
                        <Tab title='Win %' fontSize="1.15rem" text={ isNaN(stats?.won) ? '0.0' : (stats.won/matches*100).toFixed(2).toString()+'%' } />
                        <Tab title='toss won' text={stats?.tossWon || 0} />
                        <Tab title='bat first' text={stats?.batFirst || 0} />
                        <Tab title='field first' text={(stats?.tossWon - stats?.batFirst) || 0} />
                    </div >
            }
        </div>
    )
}
