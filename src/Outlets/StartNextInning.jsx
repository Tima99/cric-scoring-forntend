import React from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";

export const StartNextInning = () => {
    const { current } = useOutletContext();
    // console.log(current.tossWonTeam, current.tossLossTeam, current.fieldTeam);
    const navigate = useNavigate();

    return (
        <div className="abs top-0 left-0 full-display bg-none flex center bg-shadow pd-1">
            <div className="entry-container pd-1 flex-col center gap-1">
                <span className="title-small">
                   <b>Start Next Inning</b>
                </span>
                <div className="current-end-inning-detail flex center gap-1">
                    <h2 className="text-eclipse" style={{maxWidth: "60%"}}>{current.batTeamName}</h2>
                    <span className="flex center">
                        <h3>{current.score}</h3>/<h3>{current.wicketsDown}</h3>{" "}
                        &nbsp;
                        <h4>{`(${current.overs})`}</h4>
                    </span>
                </div>

                <div className="flex-col center gap-06">
                    <span
                        className="bold text-eclipse"
                    >
                        Target
                    </span>
                    <span>
                        Needs {current.score + 1} runs in {current.matchOvers * 6} balls
                    </span>
                    <b>RR : {( (current.score + 1) / current.matchOvers).toFixed(1)}</b>
                </div>

                <button
                    className="btn-squid btn"
                    onClick={() =>
                        navigate("/scoring/selectOpen", {
                            state: {
                                toss: {
                                    won: current.fieldTeam._id,
                                    select: "bat",
                                },
                                homeRouteName: "scoring",
                                btnText: "Next Inning",
                            },
                            replace: true
                        })
                    }
                >
                    Start
                </button>
            </div>
        </div>
    );
};
// socket.current.emit("next-inning-start")
