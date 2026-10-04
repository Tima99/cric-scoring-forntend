import React from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { DetailMatch } from "../../Services";
import { SpellBall } from "../../Components/SpellBall";
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

// ---- shared scorecard rows (used by the Live tab and the Scorecard tab) ----
const Bats = ({bats}) => {
    if(!bats) return null
    const sr = (bats.runs / bats.balls) * 100
    return(
        <div className="sc-row sc-bat">
            <span className="sc-name">
                <span className={`sc-player capital text-eclipse ${bats.strike && !bats.out ? "sc-striker" : ""}`}>
                    {bats.name}{bats.strike && !bats.out && <i className="sc-dot" />}
                </span>
                <span className="sc-sub">{bats.out ? bats.out : "not out"}</span>
            </span>
            <span className="sc-num sc-strong">
                {bats.runs || 0}<small>({bats.balls || 0})</small>
            </span>
            <span className="sc-num">{bats.fours || 0}</span>
            <span className="sc-num">{bats.sixes || 0}</span>
            <span className="sc-num sc-muted">{isNaN(sr) || !isFinite(sr) ? "0.0" : sr.toFixed(1)}</span>
        </div>
    )
}

const Bowler = ({bowler}) => {
    const balls = bowler.ballsBowl || 0
    const completedOvers    = Math.floor(balls / 6)
    const ongoingOverBalls  = balls % 6
    const overs = `${completedOvers}.${ongoingOverBalls}`
    const eco = balls > 0 ? (bowler.runs || 0) / (balls / 6) : 0;

    return(
        <div className="sc-row sc-bowl">
            <span className="sc-name">
                <span className={`sc-player capital text-eclipse ${bowler.strike ? "sc-striker" : ""}`}>
                    {bowler.name}{bowler.strike && <i className="sc-dot" />}
                </span>
            </span>
            <span className="sc-num">{overs}</span>
            <span className="sc-num sc-strong">{bowler.runs || 0}-{bowler.wickets || 0}</span>
            <span className="sc-num sc-muted">{bowler.wide || 0}/{bowler.noBall || 0}</span>
            <span className="sc-num sc-muted">{eco.toFixed(1)}</span>
        </div>
    )
}

const BatTemplate = () => (
    <div className="sc-row sc-head-row sc-bat">
        <span className="sc-name">Batter</span>
        <span className="sc-num">R(B)</span>
        <span className="sc-num">4s</span>
        <span className="sc-num">6s</span>
        <span className="sc-num">SR</span>
    </div>
)

const BowlTemplate = () => (
    <div className="sc-row sc-head-row sc-bowl">
        <span className="sc-name">Bowler</span>
        <span className="sc-num">O</span>
        <span className="sc-num">R-W</span>
        <span className="sc-num">Wd/Nb</span>
        <span className="sc-num">Eco</span>
    </div>
)

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
            return <SpellBall key={i} value={spellBall} />
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

            <section className="sc-card">
                <div className="sc-table">
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

            <section className="sc-card" style={{marginTop: ".8rem"}}>
                <div className="sc-table">
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

            <section className="live-spell">
                <div className="live-spell-head">
                    <span className="live-spell-title">This Over</span>
                    {strikeBowler?.[0] && (
                        <span className="caption capital text-eclipse">
                            {strikeBowler[0].name}
                        </span>
                    )}
                </div>
                {spell.length > 0
                    ? <ul className="spell-balls">{spell}</ul>
                    : <div className="spell-empty">No balls bowled in this over yet</div>}
            </section>
        </div>
    );
};

export const ViewMatch3 = ({ state }) => {
    const match = state.state || state

    return (
        <div className="sc-page flex-col-rev">
            {match.stats.map((stat,i) => {
                const bat   = stat.bat
                const bowl  = stat.bowl
                const wides = bat.wide || 0
                const noBalls = bat.noBall || 0
                const byes = stat.bye || 0
                const extras = wides + noBalls + byes
                const completedOvers    = Math.floor(stat.totalBalls / 6) || 0
                const ongoingOverBalls  = (stat.totalBalls % 6) || 0
                const overs = `${completedOvers}.${ongoingOverBalls}`
                const batters = bat.batters.filter(Boolean)

                return (
                    <section className={`sc-card inn${i}`} key={stat.bat._id}>
                        <input
                            type="checkbox" name="ViewMatch--toggle-scoreboard"
                            id={"toggle"+ i} className="dis-none"
                            defaultChecked={i === 0 ? true : false }
                        />

                        <label htmlFor={"toggle"+ i} className="sc-head capital">
                            <span className="sc-head-team text-eclipse">
                                <span className="sc-head-label">{`Innings ${match.stats.length - i}`}</span>
                                {bat.name}
                            </span>
                            <span className="sc-head-score">
                                <b>{bat.score || 0}/{bat.wickets || 0}</b>
                                <small>({overs} ov)</small>
                                <IoIosArrowUp   size={20}  className="viewMatch--arrow-up"/>
                                <IoIosArrowDown size={20}  className="viewMatch--arrow-down"/>
                            </span>
                        </label>

                        <section className="sc-body">
                            <div className="sc-table">
                                <BatTemplate />
                                {batters.length > 0
                                    ? batters.map((bats) => (
                                        <React.Fragment key={bats._id + "View2"}>
                                            <Bats bats={bats} />
                                        </React.Fragment>
                                    ))
                                    : <div className="sc-empty">No batters yet</div>}
                            </div>

                            <div className="sc-extras">
                                <div>
                                    <span className="sc-extras-label">Extras</span>
                                    <b>{extras}</b>
                                    <small>{`wd ${wides}, nb ${noBalls}, b ${byes}`}</small>
                                </div>
                                <div className="sc-total">
                                    <span className="sc-extras-label">Total</span>
                                    <b>{bat.score || 0}/{bat.wickets || 0}</b>
                                    <small>({overs} ov)</small>
                                </div>
                            </div>

                            <div className="sc-table">
                                <BowlTemplate />
                                {bowl.bowlers.length > 0
                                    ? bowl.bowlers.map((bowler) => (
                                        <React.Fragment key={bowler._id + "View2Bowlers"}>
                                            <Bowler bowler={bowler} />
                                        </React.Fragment>
                                    ))
                                    : <div className="sc-empty">No bowlers yet</div>}
                            </div>
                        </section>
                    </section>
                );
            })}
        </div>
    );
};
