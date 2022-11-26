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
            navigate("/startMatch/toss", { replace: true });
            if (!myTeam._id || !opponent._id)
                throw new Error("Please Select both team for match.");
            if (myTeam._id === opponent._id)
                throw new Error("Both Teams cannot be same.");
            if (!myteam11 || !opponent11)
                throw new Error("Please Select Squad for both teams.");
            if (!document.querySelector(".match-details").checkValidity())
                throw new Error("Fill all fields are required.");

            if (myteam11 !== opponent11) {
                const res = confirm(
                    "Both teams have not equal numbers of players. \n Press OK for go with this. \n Press Cancel to select again."
                );
                if (!res) throw new Error("");
            }
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
                // confirmRef={confirmRef}
            ></TopNav>
            {/* <Confirm text="You match will be cancel. Are you sure?" ref={confirmRef} /> */}

            <main className="pd-block-06 relative tap-hightlight-none flex-1">
                <ShowMsg
                    text={msg}
                    error={true}
                    style={{ paddingBottom: "1rem" }}
                />

                <section className="select-teams flex around">
                    <Link
                        className="select-team team1 flex-col center"
                        to="/startMatch/selectMyTeam/my"
                        state={{ title: "Select Team", isSelectionTeam: true }}
                    >
                        <img
                            src={logo}
                            alt="Your Team"
                            width={"50px"}
                            style={{ marginBottom: ".4rem" }}
                        />
                        <span>{myTeam.name || "Your Team"}</span>
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
                    <Link
                        className="select-team team2 flex-col center"
                        to="/startMatch/searchOpponent"
                        state={{
                            placeholder: "Search opponent team",
                            searchFor: "teams",
                            isSelection: true,
                        }}
                    >
                        <img
                            src={logo}
                            alt="Opponent Team"
                            width={"50px"}
                            style={{ marginBottom: ".4rem" }}
                        />
                        <span>{opponent.name || "Opponent Team"}</span>
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
                                type="number"
                                name="overs"
                                id="type-overs"
                                className="bottom-bar-input"
                                required
                                onChange={(e) =>
                                    setDetails((p) => ({
                                        ...p,
                                        overs: e.target.value,
                                    }))
                                }
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
                    </ul>
                    <div className="flex around parent-full-width">
                        <button className="btn-squid btn grey">
                            Schedule Match
                        </button>
                        <button className="btn-squid btn" onClick={StartMatch}>
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
                        details,
                        isSelection: true,
                    }}
                />
                {/* </div> */}
            </main>
        </div>
    );
};
