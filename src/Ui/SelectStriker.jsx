import React, { useEffect, useState } from "react";
import { useOutletContext, Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import logo from "../assets/user-circle.jpg";
import { MdSportsCricket, MdSports } from "react-icons/md";
import req from "../api/request"

export const SelectStriker = () => {
    const { state } = useLocation();
    const toss = state;
    const context = useOutletContext();
    const [opening, setOpening] = useState();
    const navigate = useNavigate();

    context.setOpening = setOpening
    context.opening = opening
    // team won toss is indx 0 and team not won toss is indx 1
    const labels = ['myteam', 'opponent']
    const indx = toss.won === context.myTeam._id ? 0 : 1
    let batFirstTeam  = labels[toss.select === 'bat' ? indx : 1-indx]
    let bowlFirstTeam = labels[toss.select === 'bowl' ? indx : 1-indx]

    // console.log(batFirstTeam, bowlFirstTeam, toss.select === 'bat');
    let [nextEle, setNextEle] = useState('')
    useEffect(()=>{
        let keys = opening && Object.keys(opening)
        setNextEle('')
        if(keys && keys.length === 3) {setNextEle(<button className="btn btn-squid margin-left-auto" onClick={Start}>Start Match</button>)}
    }, [opening])

    async function Start(){
        // navigate('/scoring', {replace: true})
        const {myTeam:teamA, opponent:teamB, details} = context
        try {
            const _toss = toss.toss
            const res = await req.post('/createMatch', {
                teamA,
                teamB,
                ...details,
                toss: {..._toss},
                striker: opening.striker._id,
                nonStriker: opening.nonStriker._id,
                bowler: opening.bowler._id
            })
            navigate('/scoring', {state: res.data, replace: true})
        } catch (error) {
            console.log(error)
        }
        
    }
    
    return (
        <div className="abs top-0 left-0 parent-size pd-1 bg-body pd-block-1">
            <section className="select-opening-batsman">
                <div className="title">
                    <RiTeamFill className="icon" /> Select Opening Batsmans
                </div>
                <div className="wraper pd-block-06 flex around">
                    <Link
                        className="card-img-large"
                        to={"/startMatch/selectOpen/striker"}
                        state={{
                            toss,
                            label: batFirstTeam,
                            assign: "striker",
                            select: "striker",
                            title: "Select Striker",
                            ignore: opening?.nonStriker?._id
                        }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">{ opening?.striker ? opening.striker.name : 'Striker'}</span>
                    </Link>
                    <Link
                    className="card-img-large"
                    to={"/startMatch/selectOpen/striker"}
                    state={{
                        toss,
                        label: batFirstTeam,
                        assign: "nonStriker",
                        select: "nonStriker",
                        title: "Select Non Striker",
                        ignore: opening?.striker?._id
                    }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">{ opening?.nonStriker ? opening.nonStriker.name : 'Non Striker'}</span>
                    </Link>
                </div>
            </section>

            <section className="select-opening-batsman pd-block-1">
                <div className="title">
                    <RiTeamFill className="icon" /> Select Bowler
                </div>
                <div className="wraper pd-block-06 pd-1">
                    <Link 
                    className="card-img-large"
                    to={"/startMatch/selectOpen/striker"}
                    state={{
                        toss,
                        label: bowlFirstTeam,
                        assign: "bowler",
                        select: "bowler",
                        title: "Select Bowler"
                    }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">{ opening?.bowler ? opening.bowler.name : 'Bowler'}</span>
                    </Link>
                </div>
            </section>

            <div className="flex parent-full-width">
                {nextEle}
            </div>
            <Outlet context={{ setOpening, context }} />
        </div>
    );
};
