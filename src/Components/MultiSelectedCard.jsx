import React, { useState } from "react";
import { TeamCard } from "./TeamCard";
import styles from "./styles/TeamCard.module.css";
import { MdDone } from "react-icons/md";

export const MultiSelectedCard = ({ obj, setSelected }) => {
    const [isSelected, setIsSelected] = useState(obj.isSelected || false);

    return (
        <div>
            <input
                type="checkbox"
                name="select-multiple"
                id={obj._id}
                onChange={(e) => {
                    setIsSelected((prev) => !prev);

                    setSelected((prev) => {
                        const numIdx = prev.players.findIndex( (player) => player._id === obj._id);

                        numIdx > -1 && (prev.players[numIdx].isSelected = e.target.checked)

                        return prev;
                    });
                }}
                checked={isSelected ? true : false}
            />
            <label htmlFor={obj._id} className="relative flex-col c-v-center">
                <TeamCard obj={obj} disableLink={true} />
                <div
                    className={`${styles["selected-icon-tick"]} abs right-0 translate-right-1`}
                >
                    <MdDone size={35} color={"green"} />
                </div>
            </label>
        </div>
    );
};
