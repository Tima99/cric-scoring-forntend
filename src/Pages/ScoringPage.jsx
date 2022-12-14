import React, {
    useLayoutEffect,
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import {
    useLocation,
    useNavigate,
    useParams,
    Outlet,
    Link,
    NavLink,
} from "react-router-dom";
import req from "../api/request";
import { Backbutton, Loader, Radios } from "../Components";
import styles from "./ScoringPage.module.css";
import { DetailMatch } from "../Services";
import {io} from "socket.io-client"

const ENDPOINT = import.meta.env.VITE_API_SOCKET_END_POINT;

export const ScoringPage = () => {
    const { state }                                 = useLocation();
    const matchId                                   = useLocation().search?.split("=")[1] || state?._id;
    const navigate                                  = useNavigate();
    const [matchDetails, setMatchDetails]           = useState(state);
    const [renderComponent, setRenderComponent]     = useState("");
    const [isOverCompleted, setIsOverCompleted]     = useState(false);
    const [nextBowler, setNextBowler]               = useState(false);
    const [nextInning, setNextInning]               = useState(false);
    const [spellEle, setSpellEle]                   = useState()
    const socket                                    = useRef();
    const [isSocketConnected, setIsSocketConnected] = useState(false)

    useLayoutEffect(() => {
        (async () => {
            
            if (matchId) {
                try {
                    const res = await req.get(`/scoring/getMatch/${matchId}`);
                    setMatchDetails(res.data);
                } catch (error) {
                    console.log(error.response.data);
                }
            }
        })();
    }, []);

    useEffect(() => {
        socket.current = io(ENDPOINT, {
            autoConnect: false,
            forceNew: true,
            query: {
                id: matchId
            }
        });

        socket.current && socket.current.open()

        socket.current.once("connect", ()=>{
            if(socket.current.connected){
                socket.current.emit("register", matchId)
                return setIsSocketConnected(true)
            }
            setIsSocketConnected(false)
        })
        socket.current.io.once("error", (error)=>{
            alert("Connection not established or disconnect !!");
            socket.current.disconnect()
        })
        
        socket.current.on("updated-document", (data) => {
            setMatchDetails(data);
        });

        socket.current.once("updated_error", (error) => {
            console.log(error);
            alert("Something went wrong")
            navigate(-1, {replace: true})
        })

        return () => {
            socket.current && socket.current.removeListener("updated-document")
            socket.current && socket.current.close()
        };
    }, [])

    const current = matchDetails && matchDetails._id && DetailMatch(matchDetails);

    useEffect(() => {
        
        if (!isOverCompleted) return;
        if(current.isMatchOver || current.isNextInningStart) return
        // const func = () => socket.current.emit("next-bowler", nextBowler)
        navigate("/scoring/selectNextPlayer", {
            state: {
                label: "myteam",
                assign: `nextBowler`,
                select: "nextBowler",
                title: "Next Bowler",
                state,
                ignore: current.strikeBowler?._id,
                selfBackBtn: true,
            },
        });
    }, [isOverCompleted]);

    useEffect(() => {
        if (!current) return;
        // console.log(isNextInning);
        if( !current.isMatchOver && current.isNextInningStart){
            navigate("/scoring/nextInningConfirm");
        }
        if(current.isMatchOver){
            navigate("/scoring/matchOver", {
                state: current
            })
        }
        const arr = [...current.overSpell]
        // console.log(arr, current.overSpell);
        const spellJsxs = arr.map((ballRun, indx) => {
            if(ballRun?.toString().includes("lb") || ballRun?.toString().includes("bye") || ballRun?.toString().includes("nb+"))
                ballRun = <span style={{fontSize: '.7rem'}}>{ballRun}</span>
            return (
                <li key={indx}>{ballRun}</li>
            )
        });
        if (current.bowlerOversBowlCompleted) {
            setIsOverCompleted(true);
        } else {
            setIsOverCompleted(false);
        }
        
        setSpellEle(spellJsxs)

    }, [matchDetails])

    if (!matchDetails && !current) return <div>Loading...</div>;
    // return <div>Loaded</div>
    // console.log(current.fieldTeam);

    const onCreaseBats = current?.batters.filter(
        (bats) => bats && bats.strike !== "undefined" && !bats.out
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

    const action = ({ outType, many, wideShow, noBallShow, outBatsman }) => {
        setRenderComponent("");
        navigate("/scoring/selectFielders", {
            state: { outType, many, wideShow, noBallShow, outBatsman },
        });
    };

    function SelectType(e) {
        const label = e.target.innerText.toLowerCase();
        // if( arr.includes("nb") ) return

        if (label === "out") {
            const titles = [
                // [typeOfOut, selectOutPlayerTemplatedNeeded than null, how many template(fielders) shown, wideShow, noBallShow]
                // if not needed (selectOutPlayerTemplatedNeeded) gives info of out player
                ["Bowled", strikerBats],
                ["Caught behind", strikerBats , 1],
                ["Stump", strikerBats, 1],
                ["run out", null, 2, 1, 1],
                ["LBW", strikerBats],
                ["Caught out", strikerBats, 1],
                ["hit wicket", strikerBats],
                ["mankanding", strikerBats],
            ];

            setRenderComponent(
                <Radios
                    titles={titles}
                    pageTitle="Out Type"
                    btnClick={action}
                />
            );
        }
    }

    return (
        <div className="full-display relative flex-col">
            {
                !isSocketConnected
                ? <div className="full-display abs top-0 z99999" style={{background: "rgba(0,0,0,0.14)", backdropFilter: "blur(1px)"}}>
                    <Loader />
                  </div>
                : ''
            }
            {renderComponent}
            <section className="nav pd-1 pd-block-06 abs top-0 left-0 z9999">
                <Backbutton
                    size={25}
                    replace={true}
                    backTimes={1}
                    setStateEmpty={renderComponent && setRenderComponent}
                />
            </section>

            <section
                className={`${styles["scoreboard-container"]} flex-col center relative`}
            >
                <div className="score flex center gap-1 parent-full-width pd-1">
                    <span className="title bold text-eclipse">{current.batTeamName}</span> <span className="title bold">:</span>
                    <div className="title-small">
                        <span>{current.score}</span>/
                        <span>{current.wicketsDown}</span>
                        &nbsp;&nbsp;
                        <span>{`(${current.overs})`}</span>
                    </div>
                </div>

                <div
                    className={`${styles["run-rate"]} parent-full-width pd-block-06 flex around`}
                >
                    {current.totalInn > 1 && <div>RRR: {current.requiredRunRate}</div>}
                    <div>CRR: {current.runRate}</div>
                </div>
                <b>{current.chaseTarget}</b>

                <div className={`${styles["bottom-score-contain"]} capital`}>
                    <div
                        className={`${styles["batsman-score"]} flex parent-full-width`}
                    >
                        <NavLink
                            to="/scoring/changeStrike"
                            state={{
                                titleText: "Change Strike",
                                text: "Do you want to change strike.",
                                cancelNavigateTo: -1,
                                okText: "Yes",
                                cancelText: "No",
                                okNavigateTo: -1,
                                okAction: ["ChangeStrike", "Services"],
                            }}
                            style={{ color: "white" }}
                            className={
                                strikerBats?._id == onCreaseBats[0]?._id
                                    ? `${styles["strike"]} tap-hightlight-none`
                                    : "tap-hightlight-none"
                            }
                        >
                            <span className="bats-name">
                                <span>
                                    {strikerBats?._id == onCreaseBats[0]?._id &&
                                        "*"}
                                </span>
                                {onCreaseBats[0]?.name || "undefined"} &nbsp;
                            </span>
                            <span>
                                {onCreaseBats[0]?.runs || 0}(
                                {onCreaseBats[0]?.balls || 0})
                            </span>
                        </NavLink>
                        <NavLink
                            to="/scoring/changeStrike"
                            state={{
                                titleText: "Change Strike",
                                text: "Do you want to change strike.",
                                cancelNavigateTo: -1,
                                okText: "Yes",
                                cancelText: "No",
                                okNavigateTo: -1,
                                okAction: ["ChangeStrike", "Services"],
                            }}
                            style={{ color: "white" }}
                            className={
                                strikerBats?._id == onCreaseBats[1]?._id
                                    ? `${styles["strike"]} tap-hightlight-none`
                                    : "tap-hightlight-none"
                            }
                        >
                            {onCreaseBats[1] && (
                                <>
                                    <span>
                                        {" "}
                                        <span>
                                            {strikerBats._id ==
                                                onCreaseBats[1]?._id && "*"}
                                        </span>{" "}
                                        {onCreaseBats[1]?.name || "not define"}
                                        &nbsp;{" "}
                                    </span>
                                    <span>
                                        {onCreaseBats[1]?.runs || "0"}(
                                        {onCreaseBats[1]?.balls || 0})
                                    </span>
                                </>
                            )}{" "}
                        </NavLink>
                    </div>

                    <div className={`${styles["spell-runs"]} relative`}>
                        <div className="strike-bowler capital font-xxsmall abs top-0 right-0 translate-right-1 pd-top-03">
                            <span>{current.strikeBowler.name}</span>&nbsp;
                            <span>{current.strikeBowler.wickets || 0}</span>-
                            <span>{current.strikeBowler.runs || 0}</span> &nbsp;
                            <span>{`(${current.bowlerOversBowl})`}</span>
                        </div>
                        <ul>{spellEle}</ul>
                    </div>
                </div>
            </section>

            <section className={styles["score-keyboard-container"]}>
                <ul className={styles["keyboard-wraper"]}>
                    <li
                        className="flex-col"
                        onClick={() =>
                            socket.current.emit("add-unrunning-runs", 0)
                        }
                    >
                        <span>0</span>
                        <div className="caption">Dot</div>
                    </li>
                    <li
                        onClick={() =>
                            socket.current.emit("add-runs-ball", { runs: 1 })
                        }
                    >
                        1
                    </li>
                    <li
                        onClick={() =>
                            socket.current.emit("add-runs-ball", { runs: 2 })
                        }
                    >
                        2
                    </li>
                    <li
                        onClick={() =>
                            socket.current.emit("add-runs-ball", { runs: 3 })
                        }
                    >
                        3
                    </li>
                    <li
                        className="flex-col"
                        onClick={() =>
                            socket.current.emit("add-unrunning-runs", 4)
                        }
                    >
                        <span className="blue">4</span>
                        <div className="caption">Four</div>
                    </li>
                    <li
                        className="flex-col"
                        onClick={() =>
                            socket.current.emit("add-unrunning-runs", 6)
                        }
                    >
                        <span className="green">6</span>
                        <div className="caption">Six</div>
                    </li>
                    <li className="flex-col" onClick={() => socket.current.emit("wide")}>
                        <span>Wd</span>
                        <span className="caption">Wide</span>
                    </li>

                    <li onClick={() => {
                        const runs = prompt("Enter runs: " , 0)
                        if(runs === null) return
                        socket.current.emit("legBye", runs)
                    }}>Lb</li>
                    <li
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)

                            if(runs == 0 || runs === null) return
                            socket.current.emit("add-runs-ball", {runs : new Number(runs) })
                        }}
                    >5,7...</li>
                    {
                        spellEle && spellEle[spellEle.length - 1]?.props.children.toString().includes("nb")
                        ? <li>Out</li>
                        : <li className="red" onClick={  (e) => {
                            SelectType(e)    
                        } }>
                            Out
                        </li>
                    }
                    <li
                        className="flex-col"
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)
                            if(runs === null) return
                            socket.current.emit("noBall", runs)
                        }}
                    >
                        <span>Nb</span>
                        <span className="caption">No-ball</span>
                    </li>
                    <li
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)
                            
                            if(runs == 0 || runs === null) return
                            socket.current.emit("bye", runs)
                        }}
                    >Bye</li>
                </ul>
            </section>

            <Outlet
                context={{
                    onCreaseBats,
                    batTeam: current.batTeam,
                    fieldTeam: current.fieldTeam,
                    myTeam: current.fieldTeam,
                    isSelection: true,
                    setOpening: setNextBowler,
                    opening: nextBowler,
                    backBtnFun: () =>
                        socket.current.emit("next-bowler", {
                            nextBowler: nextBowler.nextBowler,
                            currentBowler: current.strikeBowler,
                        }),
                    socket: socket,
                    strikeBowler: current.strikeBowler,
                    battersPlayers: current.batTeamPlayers,
                    current,
                    setNextInning
                }}
            />
        </div>
    );
};
