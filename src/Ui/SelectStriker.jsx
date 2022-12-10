import React, { useEffect, useState } from "react";
import {
    useOutletContext,
    Link,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import logo from "../assets/user-circle.jpg";
import { MdSportsCricket, MdSports } from "react-icons/md";
import req from "../api/request";
import { useRef } from "react";

export const SelectStriker = () => {
    const { pathname, state } = useLocation();
    const { toss, homeRouteName, btnText } = state;
    const context = useOutletContext();

    // console.log(state, context)
    const [opening, setOpening] = useState();
    const navigate = useNavigate();

    context.setOpening = setOpening;
    context.opening = opening;
    // team won toss is indx 0 and team not won toss is indx 1
    const labels = ["myteam", "opponent"];
    const indx = toss.won === context.myTeam._id ? 0 : 1;
    let batFirstTeam = labels[toss.select === "bat" ? indx : 1 - indx];
    let bowlFirstTeam = labels[toss.select === "bowl" ? indx : 1 - indx];
    // console.log(batFirstTeam, bowlFirstTeam, toss.select === 'bat');
    let [nextEle, setNextEle] = useState("");
    const ref = useRef()
    useEffect(() => {
        let keys = opening && Object.keys(opening);
        setNextEle("");
        if (keys && keys.length === 3) {
            setNextEle(
                <button
                    className="btn btn-squid margin-left-auto"
                    onClick={pathname.includes("scoring") ? NextInning : Start}
                    ref={ref}
                >
                    {btnText || "Start"}
                </button>
            );
        }
    }, [opening]);

    function NextInning() {
        const { socket } = context;
        socket.current.emit("next-inning-start", {
            ...opening,
            batTeam: {
                id: context.current.fieldTeam._id,
                name: context.current.fieldTeam.name,
            },
            bowlTeam: {
                id: context.current.batTeam._id,
                name: context.current.batTeam.name,
            }
        });
        navigate(-1, {replace: true})
    }

    async function Start() {
        const { myTeam: teamA, opponent: teamB, details, scorer } = context;
        try {
            ref.current.style.display = "none"
            const res = await req.post("/createMatch", {
                teamA,
                teamB,
                ...details,
                toss,
                striker: opening.striker._id,
                nonStriker: opening.nonStriker._id,
                bowler: opening.bowler._id,
                scoringBy: scorer?.email
            });
            if(res.data._id)
                navigate("/scoring", { state: res.data, replace: true });
            else
                navigate("/home/teams/matches" , {replace: true})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="abs top-0 left-0 parent-size pd-1 bg-body pd-block-1 tap-hightlight-none">
            <section
                className={
                    "select-opening-batsman " +
                    (homeRouteName === "scoring" ? "pd-block-1" : "")
                }
            >
                <div className="title">
                    <RiTeamFill className="icon" /> Select Opening Batsmans
                </div>
                <div className="wraper pd-block-06 flex around">
                    <Link
                        className="card-img-large"
                        to={`/${homeRouteName}/selectOpen/striker`}
                        state={{
                            toss,
                            label: batFirstTeam,
                            assign: "striker",
                            select: "striker",
                            title: "Select Striker",
                            ignore: opening?.nonStriker?._id,
                            selfBackBtn: true,
                        }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">
                            {opening?.striker
                                ? opening.striker.name
                                : "Striker"}
                        </span>
                    </Link>
                    <Link
                        className="card-img-large"
                        to={`/${homeRouteName}/selectOpen/striker`}
                        state={{
                            toss,
                            label: batFirstTeam,
                            assign: "nonStriker",
                            select: "nonStriker",
                            title: "Select Non Striker",
                            ignore: opening?.striker?._id,
                            selfBackBtn: true,
                        }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">
                            {opening?.nonStriker
                                ? opening.nonStriker.name
                                : "Non Striker"}
                        </span>
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
                        to={`/${homeRouteName}/selectOpen/striker`}
                        state={{
                            toss,
                            state,
                            label: bowlFirstTeam,
                            assign: "bowler",
                            select: "bowler",
                            title: "Select Bowler",
                            selfBackBtn: true,
                        }}
                    >
                        <MdSportsCricket size={45} color="grey" />
                        <span className="title-small">
                            {opening?.bowler ? opening.bowler.name : "Bowler"}
                        </span>
                    </Link>
                </div>
            </section>

            <div className="flex parent-full-width">{nextEle}</div>
            <Outlet
                context={{
                    setOpening,
                    context: { ...context, backBtnFun: null },
                }}
            />
        </div>
    );
};
