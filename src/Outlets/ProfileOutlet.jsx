import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdAddLocation, MdSportsCricket } from "react-icons/md";
import { TbGenderFemale } from "react-icons/tb";

import logo from "../assets/user-circle.jpg";

import styles from "./styles/ProfileOutlet.module.css";
import { useSubmitForm } from "../Hooks";
import { LabelInput, ShowMsg, Button, Tab } from "../Components";
import req, { CreatePlayer, EditPlayer } from "../api/request";
import { useMemo } from "react";

import { BiEdit, BiSad } from "react-icons/bi";
import { BiError } from "react-icons/bi";
import { useEffect } from "react";

const Profile = ({ message, setInputData, inputData }) => {
    return (
        <>
            <ShowMsg
                text={message}
                error={message[0] === "$" ? false : true}
                style={{ gridColumn: "1/3" }}
            />
            {/* <div className={"add-logo"}>
                <input
                    type="file"
                    name="profile"
                    id="profile-logo"
                    accept="image/*"
                />
                <label htmlFor="profile-logo">
                    <img src={logo} alt="" />
                </label>
            </div> */}

            <LabelInput
                label={<FaUser className="icon" size={20} />}
                placeholder="name"
                name={"name"}
                id="type-name"
                required
                onChange={setInputData}
                value={inputData?.name || ""}
            />
            <LabelInput
                label={<MdAddLocation size={26} className="icon" />}
                placeholder="location"
                name="location"
                id="type-location"
                required
                onChange={setInputData}
                value={inputData?.location || ""}
            />

            <div className={styles["wraper"]}>
                <label htmlFor="select-role">
                    <MdSportsCricket className="icon" size={28} />
                </label>
                <select
                    name="role"
                    id="select-role"
                    className="select-input"
                    onChange={(e) =>
                        setInputData((p) => {
                            return {
                                ...p,
                                [e.target.name]: e.target.value,
                            };
                        })
                    }
                    value={inputData.role || "All Rounder"}
                >
                    <option value="All Rounder">All Rounder</option>
                    <option value="Right Hand Bats">Right Hand Bats</option>
                    <option value="Left Hand Bats">Left Hand Bats</option>
                    <option value="Fast Bowler">Fast Bowler</option>
                    <option value="Medium Bowler">Medium Bowler</option>
                    <option value="Leg Spinner">Leg Spinner</option>
                    <option value="Off Spinner">Off Spinner</option>
                </select>
            </div>

            <div className={styles["wraper"]}>
                <label htmlFor="select-gender">
                    {" "}
                    <TbGenderFemale size={27} className="icon" />{" "}
                </label>
                <select
                    name="gender"
                    id="select-gender"
                    className="select-input"
                    onChange={(e) =>
                        setInputData((p) => {
                            return {
                                ...p,
                                [e.target.name]: e.target.value,
                            };
                        })
                    }
                    value={inputData.gender}
                >
                    <option value="Not to say">Not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
        </>
    );
};

export const ProfileOutlet = () => {
    const [isFormSubmit, SubmitForm, message, setMessage, response] = useSubmitForm(CreatePlayer);
    const { state } = useLocation();
    const { _id, playerStat } = state || {};
    const [
        isFormSubmit_edit,
        SubmitEditForm,
        edit_message,
        setMessageEdit,
        editResponse,
    ] = useSubmitForm(EditPlayer);
    const [inputData, setInputData] = useState({
        role: "all rounder",
        gender: "not to say",
    });
    const formRef = useRef();
    const { setActiveTab } = useOutletContext();
    const [player, setPlayer] = useState(false);
    // player true means need to take player data
    // else player has document means already player found

    useLayoutEffect(() => {
        (async () => {
            setActiveTab(1);
            try {
                if (_id && playerStat) {
                    const res = await req.get(`/player/${_id}`);
                    setPlayer(res.data);
                    return;
                }
                const res = await req.get("/authPlayer");
                // console.log(res.data);
                setPlayer(res.data);
            } catch (error) {
                // console.log(error);
                if(typeof error?.response?.data === "string")
                    setPlayer(error.response.data)
                else
                    setPlayer(true);
            }
        })();
    }, []);

    useEffect(() => {
        if (!editResponse) return;
        const res = editResponse.data;
        setInputData((prev) => {
            return {
                _id: res._id,
                player: { ...res },
                name: res.name,
                location: res.location,
                role: res.role,
                gender: res.gender,
            };
        });
    }, [editResponse]);

    useEffect(() => {
        if (!response) return;
        setPlayer(response.data);
    }, [response]);

    let battingTabs = ["innings", "runs", "sixes", "fours"];
    battingTabs = player?.stats && [
        ...new Set([...battingTabs, ...Object.keys(player.stats.batting)]),
    ];
    let bowlingTabs = ["innings", "runs", "wickets", "sixes", "fours"];
    bowlingTabs = player?.stats && [
        ...new Set([...bowlingTabs, ...Object.keys(player.stats.bowling)]),
    ];

    const battingStats = useMemo(() => {
        if (!player || !player.stats) return;

        let statsJsx =
            Array.isArray(battingTabs) &&
            battingTabs.map((tab) => {
                const stat = player.stats.batting[tab] || 0;
                const value = typeof stat === "object" ? stat : stat;

                if (typeof value === "number")
                    return (
                        <Tab
                            title={tab}
                            text={value}
                            key={tab}
                            order={
                                tab.includes("inning") && { row: 1, column: 2 }
                            }
                        />
                    );
                else
                    return (
                        <Tab
                            title={tab}
                            text={value.total || value.score}
                            key={tab}
                        />
                    );
            });
        const bats = player.stats.batting;
        const outInn = bats.innings - bats.notOut;

        statsJsx.push(
            <Tab
                title={"Matches"}
                text={player.stats.matches}
                key={"Matches"}
                order={{ row: 1 }}
            />
        );
        statsJsx.push(
            <Tab
                title={"SR"}
                text={
                    bats.runs
                        ? ((bats.runs / bats.balls.total) * 100).toFixed(1)
                        : "0.0"
                }
                key={"strike-rate"}
            />
        );
        statsJsx.push(
            <Tab
                title={"Avg."}
                text={
                    bats.runs
                        ? (bats.runs / (outInn ? outInn : 1)).toFixed(1)
                        : "0.0"
                }
                key={"average"}
            />
        );

        return statsJsx;
    }, [player]);

    const bowlingStats = useMemo(() => {
        if (!player || !player.stats) return;
        let statsJsx =
            Array.isArray(bowlingTabs) &&
            bowlingTabs.map((tab) => {
                const stat = player.stats.bowling[tab];
                const value = typeof stat === "object" ? stat : stat;

                if (typeof value === "number")
                    return (
                        <Tab
                            title={tab}
                            text={value}
                            key={tab}
                            order={
                                tab.includes("inning") && { row: 1, column: 2 }
                            }
                        />
                    );
                return <Tab title={tab} text={value.total} key={tab} />;
            });
        const bowl = player.stats.bowling;

        statsJsx.push(
            <Tab
                title={"Matches"}
                text={player.stats.matches}
                key={"Matches"}
                order={{ row: 1 }}
            />
        );
        statsJsx.push(
            <Tab
                title={"Dots"}
                text={bowl.balls.dots}
                key={"Dots"}
                order={{ row: 1, column: 3 }}
            />
        );
        statsJsx.push(
            <Tab
                title={"SR"}
                text={(bowl.balls.total / (bowl.wickets || 1)).toFixed(1)}
                key={"strike-rate"}
            />
        );
        statsJsx.push(
            <Tab
                title={"Avg."}
                text={(bowl.runs / (bowl.wickets || 1)).toFixed(1)}
                key={"average"}
            />
        );

        return statsJsx;
    }, [player]);

    if (!player)
        return <div className="flex center pd-block-1">Loading...</div>;

    if (player === true)
        return (
            <>
                {inputData?._id && (
                    <div
                        onClick={() => {
                            setPlayer(
                                inputData.player ? inputData.player : inputData
                            );
                        }}
                        className="pd-1 pd-block-06"
                        style={{ color: "blue" }}
                    >
                        Go to My Stats
                    </div>
                )}
                <h1 className="title pd-1">Profile</h1>
                <form className={styles["profile-container"]} ref={formRef}>
                    {
                        <Profile
                            message={message || edit_message}
                            setInputData={setInputData}
                            inputData={inputData}
                        />
                    }
                    <div className={styles["submit-btn"]}>
                        {inputData && inputData._id ? (
                            <Button
                                text={"Edit"}
                                isFormSubmit={isFormSubmit_edit}
                                onClick={(e) =>
                                    SubmitEditForm(
                                        e,
                                        {
                                            name: inputData.name,
                                            location: inputData.location,
                                            role: inputData.role,
                                            gender: inputData.gender,
                                        },
                                        formRef.current
                                    )
                                }
                            />
                        ) : (
                            <Button
                                text={"Submit"}
                                isFormSubmit={isFormSubmit}
                                onClick={(e) =>
                                    SubmitForm(e, inputData, formRef.current)
                                }
                            />
                        )}
                    </div>
                </form>
            </>
        );

    if(typeof player === "string"){
        return <div className="flex-col center gap-06 pd-block-1">
        <BiError size={64} style={{color: "rgba(255,0,0,.65)"}} />
        <span className="title-small font-xxsmall bold red">{player}</span>
    </div>
    }

    return (
        <main>
            <div className="pd-block-1 flex between r-v-center">
                <span className="title flex-1 flex-col">
                    Player :
                    <ul
                        className="title-small text-eclipse flex-1 flex-col pd-1"
                        style={{
                            maxWidth: "95%",
                            listStyle: "none",
                        }}
                    >
                        <li>{player?.name}</li>
                        <li className="font-xsmall">{player?.role}</li>
                    </ul>
                </span>

                {  !state || state.email ? (
                    <span
                        className="pd-1"
                        onClick={() => {
                            if (typeof player !== "object") return;
                            setInputData({
                                player: { ...player },
                                _id: player._id,
                                name: player.name,
                                location: player.location,
                                role: player.role,
                                gender: player.gender,
                            });
                            setPlayer(true);
                        }}
                    >
                        {" "}
                        <BiEdit
                            size={20}
                            className="icon"
                            color={"#333"}
                        />{" "}
                    </span>
                ) : (
                    ""
                )}
            </div>
            <h1 className="title">Batting</h1>
            <div className="tab-container pd-block-1">
                {battingStats?.length ? (
                    battingStats
                ) : (
                    <div style={{ gridColumn: "1 / 3" }}>
                        No Batting Stats Found!
                    </div>
                )}
            </div>
            <h1 className="title">Bowling</h1>
            <div className="tab-container pd-block-1">
                {bowlingStats?.length ? (
                    bowlingStats
                ) : (
                    <div style={{ gridColumn: "1 / 3" }}>
                        No Bowling Stats Found!
                    </div>
                )}
            </div>
        </main>
    );
};
