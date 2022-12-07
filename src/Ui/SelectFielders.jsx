import React, { useLayoutEffect, useMemo, useState } from "react";
import {
    useLocation,
    Link,
    useOutletContext,
    Outlet,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { Backbutton } from "../Components";
import { BiUserPlus, BiUserCheck } from "react-icons/bi";
import { TbCricket } from "react-icons/tb";

const SelectFielder = ({ num = 1, _state, fielder }) => {
    return (
        <Link
            className="card-img-large"
            to={"/scoring/selectFielders/fielders"}
            state={{
                label: "myteam",
                assign: `fielder${num}`,
                select: "fielder",
                title: "Select Fielder",
                state: _state,
                // ignore: opening?.striker?._id
            }}
        >
            {fielder?.[`fielder${num}`] ? (
                <BiUserCheck size={"20vmin"} color="#29cf29" />
            ) : (
                <BiUserPlus size={"20vmin"} color="#333" />
            )}
            <span
                className="title-small"
                style={{
                    color: "#333",
                    fontWeight: fielder?.[`fielder${num}`] && "bold",
                }}
            >
                {fielder && fielder?.[`fielder${num}`]
                    ? fielder[`fielder${num}`].name
                    : `Fielder ${num}`}
            </span>
        </Link>
    );
};

const SelectBatsman = ({ name, id, setOutBatsman }) => {
    return (
        <>
            <input
                type="radio"
                name="select-out-batsman"
                id={id}
                className="dis-none"
                onChange={(e) =>
                    e.target.checked && setOutBatsman({ _id: id, name: name })
                }
            />
            <label className="card-img-large" htmlFor={id}>
                <TbCricket size={"20vmin"} color="#333" />
                <span className="title-small" style={{ color: "#333" }}>
                    {name}
                </span>
            </label>
        </>
    );
};

const ExtraData = ({ wide, noBall, setScore, score, runs }) => {
    return (
        <div className="flex pd-1 gap-1 flex-wrap">
            <input
                type="checkbox"
                name="checkbox-score"
                id="wide"
                className="dis-none"
                onChange={(e) =>
                    setScore(
                        (p) =>
                            1 && {
                                ...p,
                                [e.target.getAttribute("id")]: e.target.checked,
                            }
                    )
                }
                defaultChecked={score.wide}
            />
            <label
                htmlFor="wide"
                className="tab-btn border-none dis-none"
                style={{ display: wide && "block" }}
            >
                Wide
            </label>
            {/* <input
                type="checkbox"
                name="checkbox-score"
                id="noBall"
                className="dis-none"
                defaultChecked={score.noBall}
                onChange={(e) =>
                    setScore(
                        (p) =>
                            1 && {
                                ...p,
                                [e.target.getAttribute("id")]: e.target.checked,
                            }
                    )
                }
            />
            <label
                htmlFor="noBall"
                className="tab-btn border-none dis-none"
                style={{ display: noBall && "block" }}
            >
                No-ball
            </label> */}
            <div className={runs ? "parent-full-width" : "dis-none"}>
                <div className="flex evenly">
                    <label htmlFor="runs-score">Runs</label>
                    <input
                        type="number"
                        name="runs"
                        id="runs-score"
                        className="bottom-bar-input"
                        onChange={(e) =>
                            setScore((p) => 1 && { ...p, runs: e.target.value })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export const SelectFielders = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { outType } = state;
    // const [fieldersTemplate, setFieldersTemplate] = useState(null);
    const [batsman, setBatsman] = useState(null);

    const context = useOutletContext();
    const {
        onCreaseBats,
        fieldTeam,
        batTeam,
        socket,
        strikeBowler,
        battersPlayers,
        current,
        setNextInning
    } = context;
    const battersIgnore = current.batters.filter(
        (ply) => onCreaseBats._id != ply._id || ply.outType
    );
    // console.log(battersIgnore, battersPlayers);

    const [outBatsman, setOutBatsman] = useState(state.outBatsman);
    
    const [fielder, setFielder] = useState();
    // fielder is an object contains {fielder1:{}, fielder2: {}, nextBatsman: {}}
    const [score, setScore] = useState({
        wide: false,
        noBall: false,
        runs: "",
    });

    useLayoutEffect(() => {
        if(state.outBatsman) return
        // batsman on crease templates
        const bats = onCreaseBats.map((bats) => {
            return (
                <SelectBatsman
                    name={bats.name}
                    key={bats._id}
                    id={bats._id}
                    setOutBatsman={setOutBatsman}
                />
            );
        });
        setBatsman(bats);
    }, []);

    const fieldersTemplate = useMemo(() => {
        const fieldersRequire = state.many;
        let field = [];
        for (let index = 0; index < fieldersRequire; index++) {
            field = [
                ...field,
                <SelectFielder
                    num={index + 1}
                    key={"filderselction" + index}
                    _state={state}
                    fielder={fielder}
                />,
            ];
        }
        return field;
    }, [state]);

    return (
        <div className="abs top-0 left-0 bg-body full-display">
            <section className="nav pd-block-06 z9999 flex r-v-center gap-1 pd-block-1 bg-primary pd-1 relative">
                <Backbutton size={25} replace={true} backTimes={1} />
                <span
                    style={{ textTransform: "capitalize" }}
                    className={"title"}
                >
                    {outType || "Out"}
                </span>
            </section>

            <section className="flex-1 relative tap-hightlight-none">
                {batsman && <span className="title pd-top-1 block pd-1">
                    Select <b className="red">Out</b> Batsman
                </span>}
                <section className="pd-block-06 pd-1 flex between margin-left-auto">
                    {batsman}
                </section>

                {state.many ? (
                    <div className="title pd-top-1 pd-1">Select Fielders</div>
                ) : undefined}
                <section className="pd-block-06 pd-1 flex between margin-left-auto">
                    {fieldersTemplate}
                </section>

                <section className="next-batsman-out pd-1 flex-col gap-06 pd-block-1">
                    {battersIgnore.length !== battersPlayers.length && <div className="title">Next Batsman</div>}
                    <div className="flex r-v-center between">
                        {battersIgnore.length !== battersPlayers.length && (
                            <div
                                className="card-img-large"
                                onClick={() => {
                                    navigate(
                                        "/scoring/selectFielders/fielders",
                                        {
                                            state: {
                                                label: "batteam",
                                                assign: `nextBatsman`,
                                                select: "nextBatsman",
                                                title: "Next Batsman",
                                                state,
                                                ignore: [...battersIgnore],
                                            },
                                        }
                                    );
                                }}
                            >
                                <TbCricket size={"20vmin"} color="#333" />
                                <span
                                    className="title-small "
                                    style={{
                                        color: "#333",
                                        background:
                                            fielder?.nextBatsman?.name &&
                                            "#1dc91d",
                                    }}
                                >
                                    {fielder?.nextBatsman?.name ||
                                        "Select Batsman"}
                                </span>
                            </div>
                        )}
                        <div
                            className="flex pd-1 pd-block-1 btn-out"
                            onClick={(e) => {
                                if (!outBatsman) return "";
                                if (state.many > 0 && !fielder) return "";
                                if ( battersIgnore.length !== battersPlayers.length && !fielder?.nextBatsman) return "";
                                const data = {
                                    outBatsman: {_id: outBatsman._id, name: outBatsman.name},
                                    fielders: [
                                        fielder?.fielder1,
                                        fielder?.fielder2,
                                    ],
                                    nextBatsman: fielder?.nextBatsman || null,
                                    bowler: {_id: strikeBowler._id, name: strikeBowler.name},
                                    score,
                                    outType,
                                };
                                // console.log(data);
                                socket.current.emit("batsman-out", data)

                                if(battersIgnore.length == battersPlayers.length){
                                    setNextInning(true)
                                }
                                
                                navigate(-1, { replace: true });
                            }}
                        >
                            <button
                                className="btn-squid btn margin-left-auto"
                                data="out"
                            >
                                Out
                            </button>
                        </div>
                    </div>
                </section>

                <ExtraData
                    wide={state.wideShow}
                    noBall={state.noBallShow}
                    setScore={setScore}
                    score={score}
                    runs={state.many ? true : false}
                />

                <Outlet
                    context={{
                        context: {
                            myTeam: fieldTeam,
                            opponent: batTeam,
                            isSelection: true,
                            setOpening: setFielder,
                            opening: fielder,
                        },
                    }}
                />
            </section>
        </div>
    );
};
