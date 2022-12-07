import React from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { DetailMatch } from "../Services";
import defaultLogo from "../assets/user-circle.jpg";
import { BiRightArrow } from "react-icons/bi";



export const ViewMatchPage = () => {
    let match = useOutletContext();
    match = !match ? useLocation() : match;

    const current = DetailMatch(match);
    
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
