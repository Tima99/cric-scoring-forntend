import React, { useState } from "react";
import {
    useLocation,
    useOutletContext,
    Outlet,
    NavLink,
} from "react-router-dom";

export const NavHorizontal = () => {
    const { state } = useLocation();
    const { label } = state;
    // console.log(state);

    const context = useOutletContext();
    // context : { setOpponent, setMyTeam }


    const [activeTab, setActiveTab] = useState(0)
    const inputChecked = (e) => {
        const count = e.target.getAttribute('for').slice(-1)
        setActiveTab(count)
    };

    return (
        <div className="abs top-0 left-0 parent-size bg-body pd-block-1">
            <ul className="flex evenly">
                <input
                    type="radio"
                    name="tab-btn"
                    id="tab-btn0"
                    style={{ display: "none" }}
                    checked={activeTab==0}
                    readOnly
                />
                <li className="tab-btn">
                    <NavLink
                        to={"/startMatch/select"}
                        state={{ label }}
                        replace={true}
                        onClick={inputChecked}
                    >
                        <label htmlFor="tab-btn0">Players</label>
                    </NavLink>
                </li>
                <input
                    type="radio"
                    name="tab-btn"
                    id="tab-btn1"
                    style={{ display: "none" }}
                    checked={activeTab==1}
                    readOnly
                />
                <li className="tab-btn">
                    <NavLink
                        to={"/startMatch/select/captain"}
                        state={{ label, select: "captain" }}
                        replace={true}
                        onClick={inputChecked}
                    >
                        <label htmlFor="tab-btn1">Captain</label>
                    </NavLink>
                </li>
                <input
                    type="radio"
                    name="tab-btn"
                    id="tab-btn2"
                    style={{ display: "none" }}
                    readOnly
                    checked={activeTab==2}
                />
                <li className="tab-btn">
                    <NavLink
                        to={"/startMatch/select/wicketkeeper"}
                        state={{ label, select: "wicketkeeper" }}
                        replace={true}
                        onClick={inputChecked}
                    >
                        <label htmlFor="tab-btn2">WicketKeeper</label>
                    </NavLink>
                </li>
            </ul>

            <div className="relative pd-1 pd-block-1 flex-col gap-06">
                <Outlet context={{ context }} />
            </div>
        </div>
    );
};
