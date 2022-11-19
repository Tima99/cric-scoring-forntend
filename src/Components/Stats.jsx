import React, { useEffect, useState } from 'react'
import { Loader } from './Loader';
import { Tab } from './Tab'

export const Stats = ({ id }) => {
    console.log(id);
    const [stats, setStats] = useState(null)

    useEffect(() => {
        fetch("https://api.datamuse.com/words?ml=ringing+in+the+ears")
            .then(res => setTimeout(setStats, 1000, res) )
            .catch(err => console.log(err))
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
