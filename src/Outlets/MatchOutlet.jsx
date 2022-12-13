import React, { useEffect, useLayoutEffect, useMemo, useState, useContext } from "react";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import req from "../api/request";
import { MatchCard } from "../Components/MatchCard";
import { CgClose } from "react-icons/cg";
import { BiSad } from "react-icons/bi";
import { Loader } from "../Components";
import { MdPlayCircleFilled } from "react-icons/md";
import { UserContext } from "../Pages/HomePage";

const MatchCardOptions = ({onClick, optionShow}) => {
    return (
        <div className="abs top-0 left-0 full-display bg-shadow pd-1 overflow-hidden pos-fixed flex center z99999">
            <div className="relative entry-container flex-col c-v-center pd-1 gap-1">
                <div
                    className="abs top-0 right-0 pd-1 pd-block-1"
                    onClick={onClick}
                >
                    <CgClose size={20} color="gray" />
                </div>
                <h2 className="pd-1">Select Option</h2>
                <label htmlFor="view-match" className="title pd-1">
                    <input
                        type="radio"
                        name="select-option"
                        id="view-match"
                    />
                    <NavLink
                        style={{ color: "inherit" }}
                        to={"/viewMatch"}
                        state={optionShow}
                        className="pd-1"
                    >
                        View Match
                    </NavLink>
                </label>
                <label htmlFor="scoring" className="title pd-1">
                    <input type="radio" name="select-option" id="scoring" />
                    <NavLink
                        style={{ color: "inherit" }}
                        to={`/scoring`}
                        state={optionShow}
                        className="pd-1"
                    >
                        Scoring
                    </NavLink>
                </label>
            </div>
        </div>
    );
};

export const MatchOutlet = () => {
    const {authUser} = useContext(UserContext)
    const { setActiveTab } = useOutletContext();
    const [myMatches, setMyMatches] = useState(null);
    // console.log(myMatches);
    const [optionShow, setOptionShow] = useState(false);
    const [user, setUser] = useState(authUser);
    // user has email

    useEffect(() => {
        setActiveTab(3);
    }, []);

    useLayoutEffect(() => {
        (async () => {
            try {
                const res = await req.get("/myMatches");
                if(!authUser){
                    const res2 = await req.get("/auth");
                    setUser(res2.data);
                }
                setMyMatches(res.data);
            } catch (error) {
                // console.log(error);
                setMyMatches([])
            }
        })();
    }, []);

    const MyMatches = useMemo(() => {
        if (!Array.isArray(myMatches)) return null;

        return myMatches.map((match) => {
            return match.scoringBy === user && match.winTeam === null ? (
                <div
                    onClick={() => {
                        const $match = match;
                        setOptionShow($match);
                    }}
                    key={match._id}
                >
                    <MatchCard match={match} />
                </div>
            ) : (
                <NavLink
                    key={match._id}
                    style={{ color: "inherit" }}
                    to={"/viewMatch"}
                    state={match}
                >
                    <MatchCard match={match} />
                </NavLink>
            );
        });
    }, [myMatches]);

    return (
        <div className="flex-col pd-1 pd-block-1">
            {optionShow && (
                <MatchCardOptions onClick={() => setOptionShow(false)} optionShow = {optionShow}/>
            )}
            <Link to={"/startMatch"} className="bold flex r-v-center gap-06"> <MdPlayCircleFilled  /> Start a Match</Link>

            <main className="flex-col-rev gap-1 pd-block-1">
                {
                    MyMatches === null
                    ? <Loader style={{
                        paddingTop: "1.4rem",
                        alignItems: "flex-start",
                        marginTop: "3rem"
                      }}/>
                    :(
                        MyMatches.length
                        ?   MyMatches
                        :   <div className="flex-col center gap-06">
                                <BiSad size={64} color={'grey'} />
                                <span className="title-small font-xxsmall">No Matches Found</span>
                            </div>
                    ) 
                }
            </main>
        </div>
    );
};
