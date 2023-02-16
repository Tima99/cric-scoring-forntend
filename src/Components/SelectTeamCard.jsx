import React, { useState } from "react";
import { TeamCard } from "./TeamCard";
import styles from "./styles/TeamCard.module.css";
import { MdDone } from "react-icons/md";

export const SelectTeamCard = ({ obj, setSelected, assign, howtoAssign }) => {
    return (
        <div>
            <input
                type="radio"
                name="select-team"
                id={obj._id + assign}
                onChange={() => {
                    if (!setSelected) return;
                    assign
                        ? setSelected((prev) => {
                              return {
                                  ...prev,
                                  [assign]: Array.isArray(howtoAssign)
                                      ? { _id: obj._id, name: obj.name }
                                      : obj._id,
                              };
                          })
                        : setSelected((prev) => {
                              return { ...prev, ...obj };
                          });
                }}
                defaultChecked={setSelected && obj[assign]}
            />
            <label
                htmlFor={obj._id + assign}
                className="relative flex r-v-center"
            >
                <TeamCard obj={obj} disableLink={true} />
                {setSelected && (
                    <div
                        className={`${styles["selected-icon-tick"]} abs right-0 translate-right-1`}
                    >
                        <MdDone size={35} color={"green"} />
                    </div>
                )}
            </label>
        </div>
    );
};
