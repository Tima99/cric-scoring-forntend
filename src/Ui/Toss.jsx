import React, { useMemo, useState } from "react";
import { useNavigate, useOutletContext , Outlet} from "react-router-dom";
import logo from "../assets/user-circle.jpg";
import { MdSportsCricket, MdSports } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

export const Toss = () => {
    const {
        myTeam,
        opponent: opponentTeam,
    } = useOutletContext();
    const [toss, setToss] = useState({won: null, select: null})

    const navigate = useNavigate()

    function Start(e){
        navigate('/startMatch/selectOpen', {state: {toss, homeRouteName: "startMatch", btnText: "Start Match"}, replace: true})
    }
    
    
    const submitAll = useMemo(()=>{
        if(!toss.select || !toss.won) return null

        return (
            <button className="btn-squid btn margin-left-auto"
            onClick={Start}
            >Next</button>
        )
    }, [toss])

    return (
        <div className="full-display bg-body abs top-0 left-0">
            <section className="select-team-wonToss pd-1 pd-block-1">
                <div className="title">
                    <RiTeamFill className="icon" /> Who won toss?
                </div>
                <div className="teams pd-block-06 flex around">
                    <input
                        type="radio"
                        name="toss"
                        id="team1"
                        className="dis-none"
                        onChange={() => {
                            setToss((prev) => {
                                return { ...prev ,won: myTeam._id};
                            });
                        }}
                    />
                    <label htmlFor="team1" className="card-img-large">
                        <img src={logo} alt="" width={"60px"} />
                        <span>{myTeam.name}</span>
                    </label>

                    <input
                        type="radio"
                        name="toss"
                        id="team2"
                        className="dis-none"
                        onChange={(e) => {
                            setToss( prev =>{ return {...prev, won: opponentTeam._id}} );
                        }}
                    />
                    <label htmlFor="team2" className="card-img-large">
                        <img src={logo} alt="" width={"60px"} />
                        <span>{opponentTeam.name}</span>
                    </label>
                </div>
            </section>

            <section className="select-team-wonToss pd-1 pd-block-1">
                <div className="title">
                    <MdSports className="icon" /> What want to do?
                </div>
                <div className="teams pd-block-06 flex around">
                    <input
                        type="radio"
                        name="tossAdvantage"
                        id="select-batFirst"
                        className="dis-none"
                        onChange={() => setToss(prev => {return {...prev, select: 'bat' }})}
                    />
                    <label htmlFor="select-batFirst" className="card-img-large">
                        <MdSportsCricket size={45} color="grey" />
                        <span>Bat</span>
                    </label>

                    <input
                        type="radio"
                        name="tossAdvantage"
                        id="select-bowlFirst"
                        className="dis-none"
                        onChange={() => setToss(prev => {return {...prev, select: 'bowl'}})}
                    />
                    <label
                        htmlFor="select-bowlFirst"
                        className="card-img-large"
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span>Bowl</span>
                    </label>
                </div>
            </section>

            <div className="flex pd-1">
                {submitAll}
            </div>

            <Outlet context={{myTeam, opponentTeam, toss}} />
        </div>
    );
};
