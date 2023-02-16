import React from "react";
import { Outlet, useLocation , Navigate} from "react-router-dom";
import { TopNav } from "../Components";
import { ViewMatch2, ViewMatch3 } from "../Ui";

export const ViewMatchLayout = () => {
    const { state } = useLocation();
    return (
        <div className="relative flex-col full-display">
            <TopNav title="Match" menu={false} replace={true} />
            <section className="scroll-container">
                <div className="scroll-content-container">
                    <Outlet context={state} />
                </div>
                <div className="scroll-content-container">
                    <ViewMatch2 state={state} />
                </div>
                <div className="scroll-content-container">
                    <ViewMatch3 state={state} />
                </div>
            </section>
        </div>
    );
};
