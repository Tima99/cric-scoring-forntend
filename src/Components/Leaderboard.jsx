import React from "react";
import { useState, useContext, useLayoutEffect, useMemo } from "react";
import { MatchesContext } from "../Pages/TeamPage";
import { getTeamMatches } from "../Services";
import defaultLogo from "../assets/user-circle.jpg";
import { Loader } from "./Loader";

export function Leaderboard({ teamId }) {
    const { matches, setMatches, matchesIdArr } = useContext(MatchesContext);
    const [batting, setBatting] = useState(null);
    const [bowling, setBowling] = useState(null);
    const [filterSelect, setFilterSelect] = useState("runs");
    const [filterSelectBowl, setFilterSelectBowl] = useState("wickets");
    const [selectTab, setSelectTab] = useState(0) //0 : batting , 1: bowling

    useLayoutEffect(() => {
        if (!matches)
            getTeamMatches(matchesIdArr)
                .then((matches) => {
                    setMatches(matches);
                })
                .catch((err) => {
                    console.log(err);
                    setMatches([]);
                });
    }, []);

    useMemo(() => {
        if (!matches) return null; // return null object incase build leaderboard not build sucess
        const bowling = [];
        const batting = [];

        matches.forEach((match) => {
            const players = match.stats
                .map(({ bat, bowl }) => {
                    if (bat._id === teamId) return bat.batters;
                    else if (bowl._id === teamId) return [bowl.bowlers]; // we make array to identify bowler
                    return undefined;
                })
                .flat();

            // if array true than bowler else batsman
            const bowlers = players
                .filter((player) => Array.isArray(player))
                .flat();
            players.forEach((bat) => {
                if (!bat || Array.isArray(bat)) return;

                const idx = batting.findIndex((i) => i?._id == bat._id);
                const strikeRate = (balls, runs) =>
                    balls ?? 0 ? ((runs / balls) * 100).toFixed(1) : "0.0";

                if (idx < 0) {
                    const batFormat = {
                        fours: 0,
                        sixes: 0,
                        runs: 0,
                        balls: 0,
                    };
                    return batting.push({
                        ...batFormat,
                        ...bat,
                        sr: strikeRate(bat.balls, bat.runs),
                        notOut: bat.strike ? 1 : 0,
                    });
                }

                batting[idx].runs += bat.runs || 0;
                batting[idx].sixes += bat.sixes || 0;
                batting[idx].fours += bat.fours || 0;
                batting[idx].balls += bat.balls || 0;
                batting[idx].sr = strikeRate(
                    batting[idx].balls,
                    batting[idx].runs
                );
                batting.notOut += bat.strike ? 1 : 0;
            });

            bowlers.forEach((bowler) => {
                if (!bowler) return;

                const idx = bowling.findIndex(
                    (bowl) => bowl._id === bowler._id
                );
                if (idx === -1) {
                    let bowlTemp = { ballsBowl: 0, runs: 0, wickets: 0 };
                    return bowling.push({
                        ...bowlTemp,
                        ...bowler,
                        sr: bowler.wickets
                            ? (bowler.ballsBowl / bowler.wickets).toFixed(1)
                            : "0.0",
                        avg: bowler.wickets
                            ? ((bowler.runs || 0) / bowler.wickets).toFixed(1)
                            : "0.0",
                        eco:
                            bowler.ballsBowl > 6
                                ? (
                                      (bowler.runs / bowler.ballsBowl) *
                                      6
                                  ).toFixed(1)
                                : bowler.runs?.toFixed(1) || "0.0",
                    });
                }

                bowling[idx].runs += bowler.runs || 0;
                bowling[idx].wickets += bowler.wickets || 0;
                bowling[idx].ballsBowl += bowler.ballsBowl || 0;
                bowling[idx].sr = bowler.wickets
                    ? (bowler.ballsBowl / bowler.wickets).toFixed(1)
                    : "0.0";
                bowling[idx].avg = bowler.wickets
                    ? ((bowler.runs || 0) / bowler.wickets).toFixed(1)
                    : "0.0";
                bowling[idx].eco =
                    bowler.ballsBowl > 6
                        ? ((bowler.runs / bowler.ballsBowl) * 6).toFixed(1)
                        : bowler.runs?.toFixed(1) || "0.0";
            });
        });

        setBatting(batting);
        setBowling(bowling);
    }, [matches]);

    const battingLead = useMemo(() => {
        if(!batting) return ""
        return batting.map((bats, i) => {
            const num = Math.floor(bats[filterSelect]);
            return (
                <div
                    className="media-object-list"
                    key={i + "battingLeaderboard"}
                    style={{ order: num  }}
                >
                    <div className={"logo-container"}>
                        <img src={defaultLogo} alt={bats.name} />
                    </div>
                    <div className="flex-1">
                        <span className="capital">{bats.name}</span>
                        <ul className="list-style-none font-xxsmall flex gap-06 grey-light parent-full-width">
                            <li
                                className={
                                    filterSelect === "runs" ? "selected" : ""
                                }
                            >
                                Runs: {bats.runs}
                            </li>
                            {filterSelect !== "notOut" &&
                                filterSelect !== "sr" && (
                                    <>
                                        <li
                                            className={
                                                filterSelect === "sixes"
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            6's: {bats.sixes}
                                        </li>
                                        <li
                                            className={
                                                filterSelect === "fours"
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            4's: {bats.fours}
                                        </li>
                                    </>
                                )}
                            <li
                                className={
                                    filterSelect === "notOut"
                                        ? "selected"
                                        : "dis-none"
                                }
                            >
                                Not out: {bats.notOut}
                            </li>
                            <li
                                className={
                                    filterSelect === "sr"
                                        ? "selected"
                                        : "dis-none"
                                }
                            >
                                SR: {bats.sr}
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });
    }, [filterSelect, batting]);

    const bowlingLead = useMemo(() => {
        if(!batting) return ""
        return bowling.map((bowl, i) => {
            const num = Math.floor(bowl[filterSelectBowl]);
            return (
                <div
                    key={i + "bowlingLeaderboard"}
                    className="media-object-list"
                    style={{order: num}}
                >
                    <div className={"logo-container"}>
                        <img src={defaultLogo} alt={bowl.name} />
                    </div>

                    <div className="flex-1" >
                        <span className="capital">{bowl.name}</span>
                        <ul className="list-style-none font-xxsmall flex gap-06 grey-light parent-full-width">
                            <li
                                className={
                                    filterSelectBowl === "runs"
                                        ? "selected"
                                        : "dis-none"
                                }
                            >
                                Runs: {bowl.runs}
                            </li>
                            <li
                                className={
                                    filterSelectBowl === "wickets"
                                        ? "selected"
                                        : ""
                                }
                            >
                                W's: {bowl.wickets}
                            </li>

                            {(filterSelectBowl !== "eco" && filterSelectBowl!=="runs") && (
                                <>
                                    <li
                                        className={
                                            filterSelectBowl === "sr"
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        SR: {bowl.sr}
                                    </li>
                                    <li
                                        className={
                                            filterSelectBowl === "avg"
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        Avg: {bowl.avg}
                                    </li>
                                </>
                            )}
                            <li
                                className={
                                    filterSelectBowl === "eco"
                                        ? "selected"
                                        : "dis-none"
                                }
                            >
                                Eco: {bowl.eco}
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });
        
    }, [bowling, filterSelectBowl]);

    const filterHandler = (e) => {
        setFilterSelect(e.target.value);
    };

    const filterHandlerBowl = (e) => {
        setFilterSelectBowl(e.target.value);
    };
    
    return (
        <>
            <div className="btn-groups">
                <input type="radio" name="toggle-leaderboard" id="toggle-leaderboard" className="dis-none" checked={selectTab===0}
                    onChange={() => setSelectTab(0)}
                />
                <label htmlFor="toggle-leaderboard" className="btn-group">Batting</label>
                
                <input type="radio" name="toggle-leaderboard" id="toggle-bowl-leaderboard" className="dis-none" checked={selectTab===1}
                    onChange={() => setSelectTab(1)}
                />
                <label htmlFor="toggle-bowl-leaderboard" className="btn-group">Bowling</label>
            </div>
            <div className="leaderboard">
                <div className={selectTab === 0 ? '' : "dis-none"}>
                    <select
                        name="filter"
                        id="lFilter-batting"
                        value={filterSelect}
                        onChange={filterHandler}
                        className="leaderboard-filter"
                    >
                        <option value="runs"> Most Runs</option>
                        <option value="sixes">Most Sixes</option>
                        <option value="fours">Most Fours</option>
                        <option value="notOut">Most Not out</option>
                        <option value="sr">Highest Strike Rate</option>
                    </select>
                    <div className="leaderboard-batting flex-col-rev center j-flex-end relative" style={{minHeight: "50vh"}}>
                        {batting === null ?  
                            <Loader
                                style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                    position: "absolute",
                                    top: "1rem"
                                }}
                            />
                            : (batting.length ? battingLead : 'No records found.')}
                    </div>
                </div>

                <div className={selectTab === 1 ? '' : "dis-none"}>
                    <select
                        name="filter-bowling"
                        id="leaderboard-filter-bowling"
                        value={filterSelectBowl}
                        onChange={filterHandlerBowl}
                        className="leaderboard-filter"
                    >
                        <option value="wickets">Most Wickets</option>
                        <option value="sr">Best Strike Rate</option>
                        <option value="avg">Best Average </option>
                        <option value="eco">Best Economy </option>
                        <option value="runs">Most Runs</option>
                    </select>

                    <div
                        className={
                            filterSelectBowl === "wickets" ||
                            filterSelectBowl === "runs"
                            ? "leaderboard-bowling flex-col-rev j-flex-end relative"
                            : "leaderboard-bowling flex-col relative"
                        }
                        style={{minHeight: "50vh"}}
                    >
                        { bowling === null ?  
                            <Loader
                                style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                    position: "absolute",
                                    top:'1rem'
                                }}
                            />
                            : (bowling.length ? bowlingLead : <div className="flex center">No records found.</div>)}
                    </div>
                </div>
            </div>
        </>
    );
}
