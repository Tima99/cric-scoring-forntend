import React, { useState } from "react";
import { TeamCard } from "./TeamCard";
import styles from "./styles/TeamCard.module.css";
import { MdDone } from "react-icons/md";

export const SelectTeamCard = ({ obj, setSelected, assign }) => {
    return (
        <div>
            <input
                type="radio"
                name="select-team"
                id={obj._id}
                onChange={() => {
                    assign
                        ? setSelected((prev) => {
                              return { ...prev, [assign]: obj._id };
                          })
                        : setSelected((prev) => {
                              return { ...prev, ...obj };
                          });
                }}
                defaultChecked={obj[assign]}
            />
            <label htmlFor={obj._id} className="relative flex r-v-center">
                <TeamCard obj={obj} disableLink={true} />
                <div
                    className={`${styles["selected-icon-tick"]} abs right-0 translate-right-1 dis-none`}
                >
                    <MdDone size={35} color={"green"} />
                </div>
            </label>
        </div>
    );
};
