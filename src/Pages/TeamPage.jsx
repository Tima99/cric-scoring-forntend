import React, {
    createContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useParams } from "react-router-dom";
import { FaCopyright, FaRegShareSquare } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

import logo from "../assets/user-circle.jpg";
import "./TeamPage.css";
import { TeamCard, Backbutton, Loader } from "../Components";
import req from "../api/request";
import { useEffect } from "react";
import { BiTimeFive } from "react-icons/bi"

export const MatchesContext = createContext();

export const TeamPage = () => {
    const { id } = useParams();
    let currentActiveTab = useRef();
    let navLayout = useRef();
    let [team, setTeam] = useState({});
    let [matches, setMatches] = useState(null);

    // console.log(team);
    useLayoutEffect(() => {        
        (async () => {
            try {
                const res = await req.get(`/getTeam/${id}`);
                // console.log(res.data);
                setTeam(res.data);
            } catch (error) {
                console.log(error);
                setTeam(null);
            }
        })();
    }, []);

    function ScrollHandler(){
        const navBar = document.querySelector(".top-bar")
        const top = navBar.getBoundingClientRect().height
        const {top: scrollTop} = navLayout.current.getBoundingClientRect()
        const offSet = 2
        const teamName = navBar.querySelector(".team--name .name-text")
        if(scrollTop <= top+offSet){
            navBar.style.background="var(--gradients-primary)"
            teamName && (teamName.innerText = team.name || '')
            return
        }
            navBar.style.background="linear-gradient(180deg, rgba(10,30,18,.55) 0%, rgba(10,30,18,0) 100%)"
            teamName && (teamName.innerText = '')
    }

    useEffect(() => {
        window.addEventListener("scroll", ScrollHandler)
        return ()=>{
            window.removeEventListener("scroll", ScrollHandler)
        }
    }, [])

    const teamMembers = useMemo(() => {
        const captain = team.captain;
        const wk = team.wicketkeeper;
        return (
            team.players &&
            team.players.map((member, i) => {
                return (
                    <div
                        className="relative flex r-v-center"
                        key={i + "PlayerMember"}
                    >
                        <TeamCard obj={member} />
                        <span className="flex center gap-06 abs right-0 pd-1">
                            {member._id === captain && (
                                <span className="">
                                    <FaCopyright color="green" size={20} />
                                </span>
                            )}
                            {member._id === wk && <span className="">wk</span>}
                        </span>
                    </div>
                );
            })
        );
    }, [team]);

    // Center a tab inside the horizontally scrollable tab strip
    // (never uses scrollIntoView: that also scrolls the page and fights the fixed header)
    const centerTab = (tabEl) => {
        const strip = tabEl?.parentElement;
        if (!strip) return;
        const left = tabEl.offsetLeft - (strip.clientWidth - tabEl.offsetWidth) / 2;
        strip.scrollTo({ left, behavior: "smooth" });
    };

    const ScrollMySelect = (e) => {
        e.preventDefault();
        const tab = e.currentTarget.parentElement;
        currentActiveTab.current?.classList.remove("active");
        currentActiveTab.current = tab;
        tab.classList.add("active");

        // slide only the horizontal panel container to the chosen section
        const view = document.getElementById(e.currentTarget.getAttribute("href").slice(1));
        const panel = view?.parentElement;
        if (panel) panel.scrollTo({ left: view.offsetLeft, behavior: "smooth" });
        centerTab(tab);
    };

    const [Components, setComponents] = useState({});

    const handleScroll = async (e) => {
        const sectionWidth = e.target.clientWidth;
        const scrollLeft = Math.round(e.target.scrollLeft);
        const containerSectionOrders = [
            "Members",
            "Stats",
            "Matches",
            "Leaderboard",
        ];
        if (scrollLeft % sectionWidth === 0) {
            const sectionIndex = scrollLeft / sectionWidth;
            const sectionName = containerSectionOrders[sectionIndex];
            const { [sectionName]: module } = await import("../Components");

            // applying active tab border
            const activeTab = document.querySelector(
                `.nav-layout .wraper li:nth-child(${sectionIndex + 1})`
            );
            currentActiveTab.current.classList.remove("active");
            currentActiveTab.current = activeTab;
            currentActiveTab.current.classList.add("active");
            centerTab(currentActiveTab.current);

            // see component already added or not
            // this avoid reenders
            let currentComponents = { ...Components };
            for (let [key, value] of Object.entries(currentComponents))
                if (key === sectionName && value !== null) return;

            // set dynamic loaded components
            module &&
                setComponents((p) => {
                    return {
                        ...p,
                        [containerSectionOrders[sectionIndex]]: module,
                    };
                });
        }
    };

    return (
        <div className="team-page-container">
            
            <section className="team-hero-banner">
                <div className="bg-img"></div>
                <section className="top-bar">
                <div className="team--name flex gap-06">
                    <Backbutton />
                    <span className="name-text" style={{color: "white"}}></span>
                </div>
                <div className="left-side">
                    <FaRegShareSquare />
                    <FiFilter />
                </div>
            </section>
                <div className="team">
                    <div className="image-logo">
                        <img src={logo} alt={"TeamName"} loading="lazy" />
                    </div>

                    <ul className="flex-col" style={{ gap: ".1rem" }}>
                        <li className="text-eclipse">{team.name || "..."}</li>
                        <li className="flex" style={{ flexWrap: "wrap" }}>
                            <span>{team.location || ""}</span>
                            <span><BiTimeFive size={18} style={{padding: '.1rem .1rem 0 0'}} color="white" /></span>
                            <span>{`Since ${new Date(team.createdAt)
                                .toDateString()
                                .slice(4)}`}</span>
                        </li>
                        <li>Challenge this team</li>
                    </ul>
                </div>
            </section>

            <section className="nav-layout" ref={navLayout}>
                <ul className="wraper">
                    <li className="active" ref={currentActiveTab}>
                        <a href="#members" onClick={ScrollMySelect}>
                            Members
                        </a>
                    </li>
                    <li className="stats">
                        <a href="#stats" onClick={ScrollMySelect}>
                            Stats
                        </a>
                    </li>
                    <li>
                        <a href="#matches" onClick={ScrollMySelect}>
                            Matches
                        </a>
                    </li>
                    <li>
                        <a href="#leaderboard" onClick={ScrollMySelect}>
                            LeaderBoard
                        </a>
                    </li>
                </ul>
            </section>

            <MatchesContext.Provider value={{matches, setMatches, matchesIdArr : team.matches}}>
                <section
                    className="selected-tab-outlet"
                    onScroll={handleScroll}
                >
                    <section
                        className="container height-max-content"
                        id="members"
                    >
                        {teamMembers}
                    </section>

                    <section className="container stats relative" id="stats">
                        {Components.Stats ? (
                            <Components.Stats
                                matches={team && team.matches.length}
                                stats={team && team.stats}
                                id={id}
                            />
                        ) : (
                            <Loader
                                style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                }}
                            />
                        )}
                    </section>

                    <section className="container relative" id="matches">
                        {Components.Matches ? (
                            <Components.Matches />
                        ) : (
                            <Loader
                                style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                }}
                            />
                        )}
                    </section>

                    <section className="relative" id="leaderboard">
                        {Components.Leaderboard ? (
                            <Components.Leaderboard teamId={team._id} />
                        ) : (
                            <Loader
                                style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                }}
                            />
                        )}
                    </section>
                </section>
            </MatchesContext.Provider>
        </div>
    );
};
