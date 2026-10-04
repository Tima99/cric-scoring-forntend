import React, { useEffect, useLayoutEffect, useMemo, useState, useContext } from "react";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import req from "../api/request";
import { MatchCard } from "../Components/MatchCard";
import { CgClose } from "react-icons/cg";
import { BiSad } from "react-icons/bi";
import { Loader, Modal } from "../Components";
import { MdPlayCircleFilled, MdVisibility, MdChevronRight } from "react-icons/md";
import { TbCricket } from "react-icons/tb";
import { UserContext } from "../Pages/HomePage";

const MatchCardOptions = ({onClick, optionShow}) => {
    return (
        <Modal onClose={onClick}>
            <button className="modal-close" onClick={onClick} aria-label="Close">
                <CgClose size={18} />
            </button>
            <h2 className="modal-title">Select Option</h2>
            <p className="modal-sub">What would you like to do with this match?</p>

            <div className="modal-options">
                <NavLink className="modal-option" to={"/viewMatch"} state={optionShow}>
                    <span className="modal-option-icon"><MdVisibility /></span>
                    <span className="modal-option-text">
                        <b>View Match</b>
                        <small>Live score, scorecard and squads</small>
                    </span>
                    <MdChevronRight className="modal-option-arrow" />
                </NavLink>
                <NavLink className="modal-option" to={`/scoring`} state={optionShow}>
                    <span className="modal-option-icon scoring"><TbCricket /></span>
                    <span className="modal-option-text">
                        <b>Scoring</b>
                        <small>Continue scoring this match</small>
                    </span>
                    <MdChevronRight className="modal-option-arrow" />
                </NavLink>
            </div>
        </Modal>
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
                if(!authUser || typeof authUser !== "string" && !authUser.email){
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

        // `user` may be the email string (from /auth) or the user object (from login state)
        const userEmail = typeof user === "string" ? user : user?.email;

        return myMatches.map((match) => {
            return userEmail && match.scoringBy === userEmail && !match.winTeam ? (
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
    }, [myMatches, user]);

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
