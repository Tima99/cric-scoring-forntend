import React from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import defaultLogo from "../assets/user-circle.jpg";

import styles from "./styles/PlayerRoleOutlet.module.css";
import { GiBilledCap, GiCricketBat } from "react-icons/gi";
import { MdAdminPanelSettings, MdSportsCricket } from "react-icons/md";
import { IoIosTennisball } from "react-icons/io";

export const PlayerRoleOutlet = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const player = state;

    if (!state) {
        // if state is empty
        return navigate(-1);
    }

    return (
        <div className={styles["container"]} onClick={() => navigate(-1)}>
            <div
                className={styles["wraper"]}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles["player-describe"]}>
                    <ul>
                        <li>
                            <img
                                src={player.logo || defaultLogo}
                                alt={player.name}
                            />
                        </li>
                        <li className={styles["player-box"]}>
                            <span className="capital  bold">{player.name}</span>
                            <div className="pd-top-01">
                                <Link
                                    className="font-xxsmall"
                                    state={{
                                        _id: player._id,
                                        playerStat: true,
                                    }}
                                    to="/home"
                                    replace={true}
                                >
                                    View Profile
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr />

                <ul className={styles["roles-container"]}>
                    <input type="radio" name="roles" id="select-role-bat" />
                    <li className="flex-col" style={{ gap: ".2rem" }}>
                        <label htmlFor="select-role-bat">
                            <GiCricketBat size={32} />
                        </label>
                        Bats
                    </li>
                    <input type="radio" name="roles" id="select-role-bowl" />
                    <li className="flex-col" style={{ gap: ".2rem" }}>
                        <label htmlFor="select-role-bowl">
                            <IoIosTennisball size={32} />
                        </label>
                        Bowler
                    </li>
                    <input type="radio" name="roles" id="select-role-all" />
                    <li className="flex-col" style={{ gap: ".2rem" }}>
                        <label htmlFor="select-role-all">
                            <MdSportsCricket size={32} />
                        </label>
                        All Rounder
                    </li>
                    <input type="radio" name="roles" id="select-role-cap" />
                    <li className="flex-col" style={{ gap: ".2rem" }}>
                        <label htmlFor="select-role-cap">
                            <GiBilledCap size={32} />
                        </label>
                        Captain
                    </li>
                    <input type="radio" name="roles" id="select-role-admin" />
                    <li className="flex-col" style={{ gap: ".2rem" }}>
                        <label htmlFor="select-role-admin">
                            <MdAdminPanelSettings size={32} />
                        </label>
                        Admin
                    </li>
                </ul>
            </div>
        </div>
    );
};
