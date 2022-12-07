import React from "react";
import { Outlet, useLocation , Navigate} from "react-router-dom";
import { TopNav } from "../Components";

export const ViewMatchLayout = () => {
    const { state } = useLocation();

    return (
        <div className="relative flex-col full-display">
            <TopNav title="Match" />
            <section className="scroll-container">
                <div className="scroll-content-container">
                    <Outlet context={state} />
                </div>
                <div className="scroll-content-container">
                    {/* <Outlet context={state} /> */}
                    {/* <Navigate to={'/viewMatch/summary'} state={state}/> */}
                    Two For 2
                </div>
                <div className="scroll-content-container">
                  3
                </div>
            </section>
        </div>
    );
};
