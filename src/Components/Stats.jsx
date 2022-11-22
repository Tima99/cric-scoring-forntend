import React, { useLayoutEffect, useState } from 'react'
import { Loader } from './Loader';
import { Tab } from './Tab'

export const Stats = ({ id , matches}) => {
    console.log(matches);
    const [stats, setStats] = useState(null)

    useLayoutEffect(() => {
        setStats(matches)
    }, [])

    return (
        <>
            {
                stats
                    ? <div className="tab-container">
                        < Tab title='matches' text={0} />
                        <Tab title='upcoming' text={0} />
                        <Tab title='won' text={0} />
                        <Tab title='lost' text={0} />
                        <Tab title='tie' text={0} />
                        <Tab title='drawn' text={0} />
                        <Tab title='NR' text={0} />
                        <Tab title='Win' text={0} />
                        <Tab title='toss won' text={0} />
                        <Tab title='bat first' text={0} />
                        <Tab title='field first' text={0} />
                    </div >
                    : <Loader style={{paddingTop: '1.4rem', alignItems: 'flex-start' }}/>
            }
        </>
    )
}
