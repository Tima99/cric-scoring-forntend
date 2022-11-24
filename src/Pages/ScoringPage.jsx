import React from "react";
import { Backbutton } from "../Components";
import styles from "./ScoringPage.module.css";

export const ScoringPage = () => {
    return (
        <div className="full-display relative flex-col">
            <section className="nav pd-1 pd-block-06 abs top-0 left-0">
                <Backbutton size={25} replace={true} backTimes={2} />
            </section>

            <section className={styles["scoreboard-container"]}>
                <div className="score flex around">
                    <span>Team super</span>
                    <div>
                        <span>100</span>/<span>0</span>
                    </div>
                </div>
            </section>

            <section className={styles["score-keyboard-container"]}>
                <ul className={styles["keyboard-wraper"]}>
                    <li>0</li>
                    <li>1</li>
                    <li>2</li>
                    <li>4</li>
                    <li>6</li>
                    <li>Out</li>
                    <li>Lb</li>
                    <li>Wide</li>
                    <li>Extra</li>
                    <li>Nb</li>
                </ul>
            </section>
        </div>
    );
};
