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
import { Backbutton, Loader, Radios, SpellBall } from "../Components";
import { TbCricket } from "react-icons/tb";
import { MdSportsBaseball } from "react-icons/md";
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
        const spellJsxs = arr.map((ballRun, indx) => (
            <SpellBall key={indx} value={ballRun} />
        ));
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
                    onClose={() => setRenderComponent("")}
                />
            );
        }
    }

    const changeStrikeState = {
        titleText: "Change Strike",
        text: "Do you want to change strike.",
        cancelNavigateTo: -1,
        okText: "Yes",
        cancelText: "No",
        okNavigateTo: -1,
        okAction: ["ChangeStrike", "Services"],
    };

    return (
        <div className={styles["scoring-page"]}>
            {
                !isSocketConnected
                ? <div className="full-display abs top-0 z99999" style={{background: "rgba(0,0,0,0.14)", backdropFilter: "blur(1px)"}}>
                    <Loader />
                  </div>
                : ''
            }
            {renderComponent}
            <section className={styles["top-bar"]}>
                <Backbutton
                    size={24}
                    replace={true}
                    backTimes={1}
                    setStateEmpty={renderComponent && setRenderComponent}
                />
                <span className={styles["top-title"]}><TbCricket /> Live Scoring</span>
                <span className={styles["top-spacer"]} />
            </section>

            <section className={styles["scoreboard-container"]}>
                <div className={styles["score-card"]}>
                    <div className={styles["team-name"]}>{current.batTeamName}</div>
                    <div className={styles["score-main"]}>
                        <span className={styles["score-runs"]}>{current.score}</span>
                        <span className={styles["score-slash"]}>/</span>
                        <span className={styles["score-wkts"]}>{current.wicketsDown}</span>
                        <span className={styles["score-overs"]}>({current.overs})</span>
                    </div>

                    <div className={styles["chips"]}>
                        <span className={styles["chip"]}>CRR <b>{current.runRate}</b></span>
                        {current.totalInn > 1 && (
                            <span className={styles["chip"]}>RRR <b>{current.requiredRunRate}</b></span>
                        )}
                    </div>
                    {current.chaseTarget && <div className={styles["target"]}>{current.chaseTarget}</div>}
                </div>

                <div className={styles["batsmen"]}>
                    {[onCreaseBats[0], onCreaseBats[1]].map((bat, i) => (
                        <NavLink
                            key={i}
                            to="/scoring/changeStrike"
                            state={changeStrikeState}
                            className={`${styles["batsman"]} ${bat && strikerBats?._id == bat?._id ? styles["strike"] : ""} tap-hightlight-none`}
                        >
                            {bat ? (
                                <>
                                    <span className={styles["bat-name"]}>
                                        {strikerBats?._id == bat._id && <TbCricket className={styles["strike-icon"]} />}
                                        {bat.name}
                                    </span>
                                    <span className={styles["bat-score"]}>
                                        <b>{bat.runs || 0}</b>
                                        <small>({bat.balls || 0})</small>
                                    </span>
                                </>
                            ) : (
                                <span className={styles["bat-name"]}>—</span>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className={styles["bowler-card"]}>
                    <div className={styles["bowler-line"]}>
                        <span className={styles["bowler-name"]}>
                            <MdSportsBaseball /> {current.strikeBowler.name}
                        </span>
                        <span className={styles["bowler-fig"]}>
                            {current.strikeBowler.wickets || 0}-{current.strikeBowler.runs || 0}
                            <small> ({current.bowlerOversBowl})</small>
                        </span>
                    </div>
                    {spellEle && spellEle.length > 0
                        ? <ul className="spell-balls">{spellEle}</ul>
                        : <div className={styles["spell-hint"]}>New over — waiting for the first ball</div>}
                </div>
            </section>

            <section className={styles["score-keyboard-container"]}>
                <ul className={styles["keyboard-wraper"]}>
                    <li
                        className={`${styles["key"]} ${styles["k-dot"]}`}
                        onClick={() => socket.current.emit("add-unrunning-runs", 0)}
                    >
                        <span>0</span><small>Dot</small>
                    </li>
                    {[1, 2, 3].map((r) => (
                        <li
                            key={r}
                            className={styles["key"]}
                            onClick={() => socket.current.emit("add-runs-ball", { runs: r })}
                        >
                            <span>{r}</span>
                        </li>
                    ))}
                    <li
                        className={`${styles["key"]} ${styles["k-four"]}`}
                        onClick={() => socket.current.emit("add-unrunning-runs", 4)}
                    >
                        <span>4</span><small>Four</small>
                    </li>
                    <li
                        className={`${styles["key"]} ${styles["k-six"]}`}
                        onClick={() => socket.current.emit("add-unrunning-runs", 6)}
                    >
                        <span>6</span><small>Six</small>
                    </li>
                    <li
                        className={`${styles["key"]} ${styles["k-extra"]}`}
                        onClick={() => socket.current.emit("wide")}
                    >
                        <span>Wd</span><small>Wide</small>
                    </li>
                    <li
                        className={`${styles["key"]} ${styles["k-extra"]}`}
                        onClick={() => {
                            const runs = prompt("Enter runs: " , 0)
                            if(runs === null) return
                            socket.current.emit("legBye", runs)
                        }}
                    >
                        <span>Lb</span><small>Leg bye</small>
                    </li>
                    <li
                        className={styles["key"]}
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)

                            if(runs == 0 || runs === null) return
                            socket.current.emit("add-runs-ball", {runs : new Number(runs) })
                        }}
                    >
                        <span>5,7…</span><small>Other</small>
                    </li>
                    {
                        spellEle && spellEle[spellEle.length - 1]?.props.value?.toString().includes("nb")
                        ? <li className={`${styles["key"]} ${styles["k-out"]} ${styles["k-disabled"]}`}><span>Out</span></li>
                        : <li className={`${styles["key"]} ${styles["k-out"]}`} onClick={(e) => { SelectType(e) }}>
                            <span>Out</span>
                        </li>
                    }
                    <li
                        className={`${styles["key"]} ${styles["k-extra"]}`}
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)
                            if(runs === null) return
                            socket.current.emit("noBall", runs)
                        }}
                    >
                        <span>Nb</span><small>No-ball</small>
                    </li>
                    <li
                        className={`${styles["key"]} ${styles["k-extra"]}`}
                        onClick={() => {
                            const runs = prompt("Enter runs: ", 0)
                            
                            if(runs == 0 || runs === null) return
                            socket.current.emit("bye", runs)
                        }}
                    >
                        <span>Bye</span><small>Bye</small>
                    </li>
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
