import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegShareSquare } from "react-icons/fa"
import { FiFilter } from "react-icons/fi"

import logo from "../assets/user-circle.jpg"
import './TeamPage.css';
import { TeamCard, Backbutton } from '../Components'
import req from '../api/request'

const dummyData = [
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    }
    ,
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    },
    {
        name: "Dragons",
        logo,
        captain: "Amit"
    }
]

export const TeamPage = () => {
    const { id } = useParams()
    let currentActiveTab = useRef()
    let [team, setTeam] = useState({})

    useLayoutEffect(() => {
        console.log(id);
        (
            async () => {
                try {
                    const res = await req.get(`/getTeam/${id}`)
                    console.log(res);
                    setTeam(res.data)
                } catch (error) {
                    console.log(error);
                    setTeam(null)
                }
            }
        )()
    }, [])

    const teamMembers = useMemo(() => {
        console.log("Memo runs");
        console.log(team.players);
        return team.players && team.players.map((member, i) => {
            return <TeamCard obj={member} key={i} />
        })
    }, [team])

    const ScrollMySelect = (e) => {
        e.preventDefault()
        e.stopPropagation()

        currentActiveTab.current.classList.remove('active')
        currentActiveTab.current = e.target.parentElement
        currentActiveTab.current.classList.add('active')

        const id = e.target.href.split('#')[1]
        const view = document.getElementById(id)
        view.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        e.target.scrollIntoView()

    }

    const [Components, setComponents] = useState({})

    const handleScroll = async (e) => {
        const sectionWidth = window.innerWidth
        const scrollLeft = e.target.scrollLeft
        const containerSectionOrders = ["Members", "Stats", "Matches", "Leaderboard"]
        if (scrollLeft % sectionWidth === 0) {
            const sectionIndex = scrollLeft / sectionWidth
            const sectionName = containerSectionOrders[sectionIndex]
            const { [sectionName]: module } = await import('../Components')

            // applying active tab border
            const activeTab = document.querySelector(`.nav-layout .wraper li:nth-child(${sectionIndex + 1})`)
            currentActiveTab.current.classList.remove('active')
            currentActiveTab.current = activeTab
            currentActiveTab.current.classList.add("active")
            currentActiveTab.current.scrollIntoView()

            // see component already added or not 
            // this avoid reenders
            let currentComponents = { ...Components }
            for (let [key, value] of Object.entries(currentComponents))
                if (key === sectionName && value !== null) return

            // set dynamic loaded components
            module && setComponents(p => { return { ...p, [containerSectionOrders[sectionIndex]]: module } })
        }
    }

    return (
        <div className='team-page-container'>
            <section className="top-bar">
                <Backbutton />
                <div className="left-side">
                    <FaRegShareSquare />
                    <FiFilter />
                </div>
            </section>
            <section className="team-hero-banner">
                <div className="bg-img"></div>
                <div className="team">
                    <div className="image-logo">
                        <img src={logo} alt={'TeamName'} loading="lazy" />
                    </div>

                    <ul>
                        <li>TeamName</li>
                        <li>
                            <span>Location</span>
                            <span>Since 00 Jan 2021</span>
                        </li>
                        <li>
                            Challenge this team
                        </li>
                    </ul>

                </div>
            </section>

            <section className="nav-layout">
                <ul className='wraper'>
                    <li className='active' ref={currentActiveTab}>
                        <a href="#members" onClick={ScrollMySelect}>Members</a>
                    </li>
                    <li className='stats'>
                        <a href="#stats" onClick={ScrollMySelect}>Stats</a>
                    </li>
                    <li>
                        <a href="#matches" onClick={ScrollMySelect}>Matches</a>

                    </li>
                    <li>
                        <a href="#leaderboard" onClick={ScrollMySelect}>LeaderBoard</a>

                    </li>
                    <li>
                        <a href="#awards" onClick={ScrollMySelect}>Awards</a>
                    </li>
                    <li>
                        <a href="#photos" onClick={ScrollMySelect}>Photos</a>
                    </li>
                    <li>
                        <a href="#profile" onClick={ScrollMySelect}>Profile</a>
                    </li>
                </ul>
            </section>

            <section className="selected-tab-outlet" onScroll={handleScroll}>
                <section className='container' id='members'>
                    {teamMembers}
                </section>

                <section className='container stats' id='stats'>
                    {Components.Stats && <Components.Stats matches={team && team.matches} id={id} />}
                </section>

                <section className='container' id='matches'>
                    {Components.Matches
                        ? <Components.Matches />
                        : "Loading"

                    }
                </section>

                <section className='container' id='leaderboard'>
                    {Components.Leaderboard
                        ? <Components.Leaderboard />
                        : "Loading"

                    }
                </section>

                <section className='container' id='awards'>
                    awards
                </section>

                <section className='container' id='photos'>
                    Photos
                </section>

                <section className='container' id='profile'>
                    Profile
                </section>
            </section>

        </div>
    )
}
