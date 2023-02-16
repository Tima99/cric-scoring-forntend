import React, { createRef, useEffect, useRef, useState } from "react";
import { ShowMsg, TopNav, Confirm } from "../Components";
import logo from "../assets/user-circle.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const StartMatchPage = () => {
    const [myTeam, setMyTeam] = useState({
        selectedCaptain: null,
        wicketkeeper: null,
    });
    // contain myTeam = {} of my team
    const [opponent, setOpponent] = useState({
        selectedCaptain: null,
        wicketkeeper: null,
    });
    
    const [details, setDetails] = useState();
    const [scorer, setScorer] = useState()
    // match form data in details like overs, toss, venue...

    // contain opponent = {} of opponent team

    // onclick select squad button navigation used
    const navigate = useNavigate();

    const confirmRef = createRef();

    const [msg, setMsg] = useState("");

    function SelectPlayers(e, team, label) {
        e.preventDefault();
        // console.log(team);
        navigate("/startMatch/select", { state: { label } });
    }

    // total player selected
    let myteam11 = null,
        opponent11 = null;
    const squadCount = {
        get myteam11() {
            myteam11 = myTeam.players?.filter((p) => p.isSelected && p).length;
            return myteam11;
        },
        get opponent11() {
            opponent11 = opponent.players?.filter(
                (p) => p.isSelected && p
            ).length;
            return opponent11;
        },
    };

    useEffect(() => {
        const timeoutId = setTimeout(setMsg, 3000, "");
        return () => clearTimeout(timeoutId);
    }, [msg]);

    function StartMatch(e) {
        e.preventDefault();

        try {
            if (!myTeam._id || !opponent._id)
                throw new Error("Please Select both teams for match.");
            if (myTeam._id === opponent._id)
                throw new Error("Both Teams cannot be same.");
            if (!myteam11 || !opponent11)
                throw new Error("Please Select Squad for both teams.");
            if (myteam11 < 2 || opponent11 < 2)
                throw new Error("Players must be greater or equal to 2");

            if (!document.querySelector(".match-details").checkValidity())
                throw new Error("Fill all fields are required.");

            if (myteam11 !== opponent11) {
                const res = confirm(
                    "Both teams have not equal numbers of players. \n Press OK for go with this. \n Press Cancel to select again."
                );
                if (!res) throw new Error("");
            }
            navigate("/startMatch/toss", { replace: true });
        } catch (error) {
            // console.log(error);
            setMsg(error.message);
        }
    }

    return (
        <div className="flex-col full-display">
            <TopNav
                title="Start a Match"
                backConfirm={false}
                menu = {false}
            ></TopNav>
            {/* <Confirm text="You match will be cancel. Are you sure?" ref={confirmRef} /> */}

            <main className="pd-block-06 relative tap-hightlight-none flex-1">
                <ShowMsg
                    text={msg}
                    error={true}
                    style={{ paddingBottom: "1rem" }}
                />

                <section className="select-teams flex evenly" style={{alignItems: "flex-start"}}>
                    <Link
                        className="select-team team1 flex-col center"
                        to="/startMatch/selectMyTeam/my"
                        state={{ title: "Select Team", isSelectionTeam: true }}
                    >
                        <div style={{
                            width: "50px",
                            height: "50px",
                            overflow: "hidden",
                            borderRadius: "100%",
                            marginBottom: ".5rem"
                        }}>
                            <img
                                src={logo}
                                alt="Your Team"
                                width={"100%"}
                                style={{ marginBottom: ".4rem" }}
                            />
                        </div>
                        <span className="bold font-xxsmall">{myTeam.name || "Your Team"}</span>
                        <button
                            className="btn-squid"
                            style={{
                                visibility: myTeam._id ? "visible" : "hidden",
                            }}
                            onClick={(e) => SelectPlayers(e, myTeam, "myteam")}
                        >
                            Select Squad ({squadCount.myteam11 || 0})
                        </button>
                    </Link>
                    <div className="title-small bold pd-block-1" style={{color: "#333"}}>Vs</div>
                    <Link
                        className="select-team team2 flex-col center"
                        to="/startMatch/searchOpponent"
                        state={{
                            placeholder: "Search opponent team",
                            searchFor: "teams",
                            isSelection: true,
                        }}
                    >
                        <div style={{
                            width: "50px",
                            height: "50px",
                            overflow: "hidden",
                            borderRadius: "100%",
                            marginBottom: ".5rem"
                        }}>
                            <img
                                src={logo}
                                alt="Opponent Team"
                                width={"100%"}
                                style={{ marginBottom: ".4rem" }}
                            />
                        </div>
                        <span className="bold font-xxsmall">{opponent.name || "Opponent Team"}</span>
                        <button
                            className="btn-squid"
                            style={{
                                visibility: opponent._id ? "visible" : "hidden",
                            }}
                            onClick={(e) =>
                                SelectPlayers(e, opponent, "opponent")
                            }
                        >
                            Select Squad ({squadCount.opponent11 || 0})
                        </button>
                    </Link>
                </section>

                <form className="match-details">
                    <ul className="pd-1 flex-col gap-1">
                        <li className="flex-col c-v-center gap-06">
                            <label
                                htmlFor="type-overs"
                                className="parent-full-width"
                            >
                                Overs
                            </label>
                            <input
                                type="tel"
                                name="overs"
                                id="type-overs"
                                className="bottom-bar-input"
                                required
                                onChange={(e) =>
                                    setDetails((p) => ({
                                        ...p,
                                        overs: e.target.value,
                                        oversPerBowler:
                                            e.target.value < 10
                                                ? Math.ceil(
                                                      e.target.value /
                                                          (e.target.value / 2)
                                                  )
                                                : Math.ceil(e.target.value / 5),
                                    }))
                                }
                            />
                        </li>
                        <li className="flex-col c-v-center gap-06">
                            <label
                                htmlFor="type-max-overs"
                                className="parent-full-width"
                            >
                                Overs Per Bowler
                            </label>
                            <input
                                type="number"
                                name="oversPerBowler"
                                id="type-max-overs"
                                className="bottom-bar-input"
                                required
                                onChange={(e) =>
                                    setDetails((p) => ({
                                        ...p,
                                        oversPerBowler: e.target.value,
                                    }))
                                }
                                value={details?.oversPerBowler || ""}
                            />
                        </li>

                        <li className="flex-col gap-06 pd-block-06">
                            <div>Ball Type</div>

                            <div className="flex around">
                                <span>
                                    <input
                                        type="radio"
                                        name="ball-type"
                                        id="ball-type-tennis"
                                        data="Tennis"
                                        required
                                        onChange={(e) =>
                                            setDetails((p) => ({
                                                ...p,
                                                ballType:
                                                    e.target.getAttribute(
                                                        "data"
                                                    ),
                                            }))
                                        }
                                    />
                                    &nbsp;
                                    <label htmlFor="ball-type-tennis">
                                        Tennis
                                    </label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        name="ball-type"
                                        id="ball-type-leather"
                                        data="Leather"
                                        required
                                        onChange={(e) =>
                                            setDetails((p) => ({
                                                ...p,
                                                ballType:
                                                    e.target.getAttribute(
                                                        "data"
                                                    ),
                                            }))
                                        }
                                    />
                                    &nbsp;
                                    <label htmlFor="ball-type-leather">
                                        Leather
                                    </label>
                                </span>
                            </div>
                        </li>

                        <li className="flex-col c-v-center gap-06">
                            <label
                                htmlFor="enter-venue"
                                className="parent-full-width"
                            >
                                Ground Name
                            </label>
                            <input
                                className="bottom-bar-input"
                                type="text"
                                name="venue"
                                id="enter-venue"
                                onChange={(e) =>
                                    setDetails(
                                        (p) =>
                                            1 && { ...p, venue: e.target.value }
                                    )
                                }
                                required
                            />
                        </li>

                        <li className="flex between parent-full-width">
                            <Link
                                className="select-team team2"
                                to="/startMatch/searchOpponent"
                                state={{
                                    placeholder: "Search player",
                                    searchFor: "players",
                                    isSelection: true,
                                }}
                            >
                                <span>{scorer?.name ? "Change" : "Add"} Scorer</span>
                            </Link>
                            <span className="capital">{scorer?.name || ''}</span>
                        </li>
                    </ul>
                    <div className="flex around parent-full-width">
                        <button className="btn-squid btn margin-left-auto" onClick={StartMatch}>
                            Start Match
                        </button>
                    </div>
                </form>

                {/* <div className="abs top-0 left-0 parent-full-width bg-body"> */}
                <Outlet
                    context={{
                        setMyTeam,
                        setOpponent,
                        myTeam,
                        opponent,
                        setScorer,
                        scorer,
                        details,
                        isSelection: true,
                    }}
                />
                {/* </div> */}
            </main>
        </div>
    );
};
