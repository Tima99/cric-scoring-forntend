import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import req from "../api/request";
import { Backbutton, Radios } from "../Components";
import styles from "./ScoringPage.module.css";

export const ScoringPage = () => {
    const { state } = useLocation();
    const navigate  = useNavigate()
    // console.log(state);
    const matchId = useLocation().search?.split("=")[1];

    const [matchDetails, setMatchDetails] = useState(state);
    const [renderComponent, setRenderComponent] = useState("");

    useLayoutEffect(() => {
        (async () => {
            if (matchId) {
                try {
                    const res = await req.get(`/getMatch/${matchId}`);
                    // console.log(res.data);
                    setMatchDetails(res.data);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
        })();
    }, []);

    if (!matchDetails) return <div>Loading...</div>;
    // return <div>Loaded</div>

    const totalInn = matchDetails.stats.length;
    const current = {
        inn: matchDetails.stats[totalInn - 1][`inning${totalInn}`],
        get bat() {
            return this.inn.bat;
        },
        get batTeam(){
            const team = (matchDetails.teamA._id === this.bat._id && matchDetails.teamA) || (matchDetails.teamB._id === this.bat._id && matchDetails.teamB)
            return team
        },
        get bowl() {
            return this.inn.bowl;
        },
        get fieldTeam(){
            const team = (matchDetails.teamA._id === this.bowl._id && matchDetails.teamA) || (matchDetails.teamB._id === this.bowl._id && matchDetails.teamB)
            return team
        },
        get batters() {
            return this.bat.batters;
        },
        get bowlers() {
            return this.bowl.bowlers;
        },
        get score() {
            return this.inn.bat.score;
        },
    };

    const onCreaseBats = current.batters.filter(
        (bats) => bats.strike !== "undefined"
    );
    const [strikerBats, nonStrikerBats] = [
        onCreaseBats.filter((b) => b.strike === true)[0],
        onCreaseBats.filter((b) => b.strike === false)[0],
    ];
    // console.log({strikerBats, nonStrikerBats});
    const [strikeBowler] = current.bowlers.filter(
        (bowler) => bowler.strike === true
    );
    // console.log(strikeBowler);
    const batsTeam = { name: current.bat.name, _id: current.bat._id };
    const bowlTeam = { name: current.bowl.name, _id: current.bowl._id };
    // console.log(bowlTeam);
    const wicketsDown = current.bat.batters.filter((bats) => bats.out).length;
    // console.log(wicketsDown, current.score);

    const action = ({outType, many, wideShow, noBallShow}) => {
        setRenderComponent('')
        navigate('/scoring/selectFielders', {state: {outType, many, wideShow, noBallShow}})
    }

    function SelectType(e) {
        const label = e.target.innerText.toLowerCase();
        if (label === "out") {
            const titles = [
                // [typeOfOut, how many template(fielders) shown, wideShow, noBallShow]
                "Bowled",
                ["Caught behind", 1],
                ["run out", 2, 1, 1],
                "LBW",
                ["Caught out", 1],
                "hit wicket",
                "mankanding",
            ];
            setRenderComponent(<Radios titles={titles} pageTitle="Out Type" btnClick={action}/>);
        }
    }

    return (
        <div className="full-display relative flex-col">
            {renderComponent}
            <section className="nav pd-1 pd-block-06 abs top-0 left-0 z9999">
                <Backbutton
                    size={25}
                    replace={true}
                    backTimes={2}
                    setStateEmpty={setRenderComponent}
                />
            </section>

            <section
                className={`${styles["scoreboard-container"]} flex-col center relative`}
            >
                <div className="score flex center gap-1">
                    <span className="title bold">{batsTeam.name}:</span>
                    <div className="title-small">
                        <span>{current.score}</span>/<span>{wicketsDown}</span>
                    </div>
                </div>

                <div
                    className={`${styles["run-rate"]} parent-full-width pd-block-06 flex around`}
                >
                    <div>CRR: 0.0</div>
                    {totalInn > 1 && <div>RRR: 0.0</div>}
                </div>

                <div className={styles["bottom-score-contain"]}>
                    <div
                        className={`${styles["batsman-score"]} flex parent-full-width`}
                    >
                        <div className={styles["strike"]}>
                            <span className="bats-name">
                                *{strikerBats.name} &nbsp;
                            </span>
                            <span>
                                {strikerBats.runs}({strikerBats.balls || 0})
                            </span>
                        </div>
                        <div>
                            {nonStrikerBats.name}&nbsp;{" "}
                            <span>
                                {strikerBats.runs}({strikerBats.balls || 0})
                            </span>
                        </div>
                    </div>

                    <div className={styles["spell-runs"]}>
                        <ul>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                            <li>0</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles["score-keyboard-container"]}>
                <ul className={styles["keyboard-wraper"]}>
                    <li className="flex-col">
                        <span>0</span>
                        <div className="caption">Dot</div>
                    </li>
                    <li>1</li>
                    <li>2</li>
                    <li className="flex-col">
                        <span>Wd</span>
                        <span className="caption">Wide</span>
                    </li>
                    <li>3</li>
                    <li className="flex-col">
                        <span className="blue">4</span>
                        <div className="caption">Four</div>
                    </li>
                    <li className="flex-col">
                        <span className="green">6</span>
                        <div className="caption">Six</div>
                    </li>
                    <li className="flex-col">
                        <span>Nb</span>
                        <span className="caption">No-ball</span>
                    </li>
                    <li>Lb</li>
                    <li>5,7...</li>
                    <li className="red" onClick={SelectType}>
                        Out
                    </li>
                    <li>Bye</li>
                </ul>
            </section>

            <Outlet context={{onCreaseBats, batTeam: current.batTeam ,fieldTeam: current.fieldTeam}} />
        </div>
    );
};
