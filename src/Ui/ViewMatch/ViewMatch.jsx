import React from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { DetailMatch } from "../../Services";
import defaultLogo from "../../assets/user-circle.jpg";
import { BiRightArrow } from "react-icons/bi";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import { useEffect } from "react";
import { useMemo } from "react";

export const ViewMatch1 = () => {
    let match = useOutletContext();
    match = !match ? useLocation() : match;
    const current = match && DetailMatch(match);

    return (
        <div className="relative">
            <div className="title-small pd-1 pd-block-1">
                {match.teamA.name}{" "}
                <span style={{ textTransform: "initial" }}>vs</span>{" "}
                {match.teamB.name}
            </div>

            <section className="pd-block-1">
                <h2 className="title pd-1">Squads</h2>
                <ul className="flex-col width-vw">
                    <li className="bg-white pd-block-06">
                        <Link
                            to={"/viewMatch/squad"}
                            state={{
                                team: match.teamA,
                                title: "Playing Squad",
                                state: match
                            }}
                            className="flex r-v-center gap-1 pd-1 relative"
                        >
                            <div className="logo-wraper overflow-hidden radius-100 flex-shrink-0">
                                <img src={defaultLogo} alt="" width={"50px"} />
                            </div>
                            <div
                                className="title-small flex-1 text-eclipse"
                                style={{ color: "#333" }}
                            >
                                {match.teamA.name}
                            </div>
                            <span className="abs right-0 pd-1">
                                <BiRightArrow />
                            </span>
                        </Link>
                    </li>
                    <hr />
                    <li className="bg-white pd-block-06">
                        <Link
                            to={"/viewMatch/squad"}
                            state={{
                                team: match.teamB,
                                title: "Playing Squad",
                                state: match
                            }}
                            className="flex r-v-center gap-1 pd-1 relative"
                        >
                            <div className="logo-wraper overflow-hidden radius-100 flex-shrink-0">
                                <img src={defaultLogo} alt="" width={"50px"} />
                            </div>
                            <div
                                className="title-small text-eclipse"
                                style={{ color: "#333" }}
                            >
                                {match.teamB.name}
                            </div>
                            <span className="abs right-0 pd-1">
                                <BiRightArrow />
                            </span>
                        </Link>
                    </li>
                </ul>
            </section>

            <hr />

            <section className="flex-col gap-1 pd-1 pd-block-1 bg-white">
                <div>
                    <b>Match: </b> Individual Match
                </div>
                <div>
                    <b>Match Date:</b> {current.getDate}
                </div>
                <div>
                    <b>Match Time:</b> {current.getTime}
                </div>
                <div>
                    <b>Toss: </b> {current.tossWonTeamName} select{" "}
                    <span className="capital">{current.tossWonSelect}</span>{" "}
                    first
                </div>
                <div>
                    <b>Overs:</b> {match.overs}
                </div>
                <div className="capital">
                    <b>Ground: </b> {match.venue}{" "}
                </div>
                <div className="capital">
                    <b>Ball Type: </b> {match.ballType}{" "}
                </div>
            </section>
        </div>
    );
};

const Bats = ({bats}) => {
    if(!bats) return
    const sr = ((bats.runs / bats.balls) * 100).toFixed(1) || 0;
    return(
        <div className="flex grid-score">
            {bats.strike ? (
                <span className="green bold text-eclipse">
                    *{bats.name}
                </span>
            ) : (
                <span className="text-eclipse">{bats.name}</span>
            )}
            <span>
                {bats.runs || 0}({bats.balls || 0})
            </span>
            <span>{bats.fours || 0}</span>
            <span>{bats.sixes || 0}</span>
            <span>{isNaN(sr) ? "0.0" : sr}</span>
        </div>
    )
}

const Bowler = ({bowler}) => {
    const sr = bowler.ballsBowl / bowler.wickets;
    const completedOvers    = Math.floor(bowler.ballsBowl / 6) || 0
    const ongoingOverBalls  = (bowler.ballsBowl % 6) || 0
    const overs = `${completedOvers}.${ongoingOverBalls}`
    const eco = completedOvers > 0 ? bowler.runs / completedOvers : 0;

    return(
        <div
            className="flex grid-score"
        >
            {bowler.strike ? (
                <span className="green bold">
                    *{bowler.name}
                </span>
            ) : (
                <span>{bowler.name}</span>
            )}

            <span>{bowler.runs || 0}-{bowler.wickets || 0}</span>
            <span>{bowler.wide || 0}/{bowler.noBall || 0}</span>
            <span>{overs || 0}</span>
            <span>
                {isNaN(eco) ? "0.0" : eco.toFixed(1)}
            </span>
        </div>
    )
}

const BatTemplate = ({style}) => {
    return(
        <div className="flex grid-score capital" style={{padding: ".6rem 0 .4rem"}}>
            <span>
                <b>name</b>
            </span>
            <span>runs</span>
            <span>4's</span>
            <span>6's</span>
            <span>SR</span>
        </div>
    )
}

const BowlTemplate = () => {
    return (
        <div className="flex grid-score font-xsmall">
            <span>
                <b>name</b>
            </span>

            <span>r-w</span>
            <span>wd/nb</span>
            <span>Overs</span>
            <span>Eco.</span>
        </div>
    )
}
export const ViewMatch2 = ({ state }) => {
    const match = state.state || state
    const current = match && DetailMatch(match);
    
    const onCreaseBats = current?.batters.filter(
        (bats) => bats && bats.strike !== "undefined" && !bats.out
    );

    const strikeBowler = current.bowlers.filter(
        (bowler) => bowler.strike === true
    );
    // console.log(current.overSpell);
    const spell = useMemo(() => {
        return current.overSpell.map( (spellBall , i) => {
            return(
                <li key={i} >{spellBall}</li>
            )
        })
    }, [])


    return (
        <div className="pd-1 pd-top-1">
            <section
                className="teams pd-top-03 bg-white"
                style={{ borderRadius: ".5rem", padding: ".6rem .5rem" }}
            >
                {
                    current.teamAInn !== null &&
                    <div className={`teamA title-small flex between ${current.winTeam._id !== match.teamA._id && "opacity-08" || ''}`}>
                        <span
                            className={`match-teamName text-eclipse flex-1 
                            ${( current.winTeam._id || current.isBatTeamA && "active-team-inn") || ""}
                            ${(current.winTeam._id === match.teamA._id && "yellow bold") || "" }`}
                        >
                            {match.teamA.name}
                        </span>
                        <span>
                            <span>{current.teamAScore || 0}</span>/
                            <span>{current.teamAWickets || 0}</span>&nbsp;
                            <span>({current.teamAOvers})</span>
                        </span>
                    </div>
                }

                {
                    current.teamBInn !== null &&
                    <div className={`teamB title-small flex between pd-top-03 ${current.winTeam._id !== match.teamB._id && "opacity-08" || ''}`  }>
                        <span
                            className={`match-teamName text-eclipse flex-1 
                            ${(current.winTeam._id || current.isBatTeamB && "active-team-inn") || ""}
                            ${(current.winTeam._id === match.teamB._id && "yellow bold") || "" }
                            `}
                        >
                            {match.teamB.name}
                        </span>
                        <span>
                            <span>{current.teamBScore || 0}</span>/
                            <span>{current.teamBWickets || 0}</span>&nbsp;
                            <span>({current.teamBOvers})</span>
                        </span>
                    </div>
                }

                <div style={{marginTop: '.75rem'}} className="flex parent-full-width">

                    CRR: {current.runRate}
                    {
                        current.totalInn > 1 &&
                        <div className="flex-1" style={{textAlign: "right"}}>RRR: {current.requiredRunRate}</div>
                    }
                </div>
            </section>

            <section className="pd-block-1 font-xxsmall text-eclipse bold title-small">
                {current.isMatchOver
                    ? current.winTeam.name
                        ? `${current.winTeam.name} won the match`
                        : current.winTeam.matchTie
                    : current.targetRuns
                    ? current.chaseTarget
                    : `${current.tossWonTeamName} select ${current.tossWonSelect} first`}
            </section>

            <section className="batsman">
                <div className="title-small">Batting</div>
                <hr />
                <div className="capital flex-col gap-06">
                    <BatTemplate />
                    {onCreaseBats?.map((bats) => {
                        return (
                            <React.Fragment key={bats?._id+ "View1"} >
                                <Bats bats={bats} />
                            </React.Fragment>
                        );
                    })}
                </div>
            </section>

            <section className="bowling pd-top-1 flex-col gap-06">
                <div className="title-small">Bowling</div>
                <hr />
                <div className="capital flex-col gap-06">
                    <BowlTemplate />

                    {strikeBowler &&
                        strikeBowler?.map((bowler) => {
                            
                            return (
                                <React.Fragment key={bowler._id+"View1Bowlers"}>
                                    <Bowler bowler={bowler} current={current} />
                                </React.Fragment>
                            );
                        })}
                </div>
            </section>

            <section className="spell-runs relative flex-col pd-block-1">
                <div className="title-small">Spell</div>
                <ul style={{listStyle: 'none'}} className="flex evenly">
                {   
                 spell   
                }
                </ul>
            </section>
        </div>
    );
};

export const ViewMatch3 = ({ state }) => {
    const match = state.state || state
    // const current = match && DetailMatch(match);

    return (
        <div className="pd-block-1 flex-col-rev">
            {match.stats.map((stat,i) => {
                const bat   = stat.bat
                const bowl  = stat.bowl
                const extras = (stat.bat.wide || 0) + (stat.bat.noBall || 0) + (stat.bye || 0) 
                const completedOvers    = Math.floor(stat.totalBalls / 6) || 0
                const ongoingOverBalls  = (stat.totalBalls % 6) || 0
                const overs = `${completedOvers}.${ongoingOverBalls}`

                return (
                    <section className={`inn${i}`} style={{paddingBottom: '.4rem'}} key={stat.bat._id}>
                        <input 
                            type="checkbox" name="ViewMatch--toggle-scoreboard" 
                            id={"toggle"+ i} className="dis-none"
                            defaultChecked={i === 0 ? true : false }
                        />

                        <label htmlFor={"toggle"+ i} className="bg-green parent-full-width flex between capital pd-1 r-v-center" style={{color: '#fff', padding: '.4rem 1rem'}}>
                            <span className="title-small">{bat.name}</span>

                            <div style={{fontSize: '1rem'}}>
                                <span>{bat.score || 0} / {bat.wickets || 0}</span> &nbsp;
                                <span>({overs})</span>
                                <IoIosArrowUp   size={20}  className="viewMatch--arrow-up"/>
                                <IoIosArrowDown size={20}  className="viewMatch--arrow-down"/>
                            </div>

                        </label>


                        <section className="players-score" style={{fontSize: '1.1rem', padding: '0 .5rem'}}>
                            <div className="batsman-score flex-col" style={{gap: '0.5rem'}}>
                                <h5 className="pd-block-06">Batsman</h5>
                                <BatTemplate />
                                {
                                    bat.batters.map( bats =>  {
                                        if(!bats) return
                                        return(
                                            <React.Fragment key={bats?._id+ "View2"}>
                                                <div className="capital">
                                                    <Bats bats={bats}/>
                                                    <div  className="font-xxsmall grey-light" style={{textTransform: "initial"}}>
                                                        {
                                                            bats?.out ?
                                                            <span>{bats.out}</span>
                                                            : (<span>not out</span>)
                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                            </React.Fragment>
                                        )
                                    } )
                                }
                            </div>

                            <div className="extras pd-block-06 flex between font-xsmall">
                                <span><b>Total </b>&nbsp;{bat.score}/{bat.wickets || 0}</span>
                                <span><b>Extras</b>&nbsp;{extras}&nbsp;
                                    <span style={{fontSize: ".9rem", color: 'gray'}}>({`wd ${stat.bat.wide||0},nb ${stat.bat.noBall || 0},bye ${stat.bye || 0}`})</span>
                                </span>
                            </div>

                            <div className="bowling capital flex-col gap-06" style={{paddingBottom: "1rem"}}>
                                <h5>Bowlers</h5>
                                <BowlTemplate />
                                {
                                    bowl.bowlers.map( bowler => {
                                        return(
                                            <div key={bowler._id+"View2Bowlers"}>
                                                <Bowler bowler={bowler} />
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    </section>
                );
            })}
        </div>
    );
};
