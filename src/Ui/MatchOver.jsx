import React from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";

export const MatchOver = () => {
    const { current, socket } = useOutletContext();

    return (
        <div className="abs top-0 left-0 full-display z9999 flex center overflow-hidden bg-shadow">
            <div className="entry-container gap-1 flex-col center">
                <div className="title ">Match Over</div>
                <div className="bold">Congratulations</div>
                <h2 className="team-won green bold ">{current.winTeam.name || current.winTeam.matchTie}</h2>
                <span>{current.winTeam.matchTie ? '' : 'won the match'}</span>

                <Link to={'/home/teams/matches'} replace={true}>
                    <button
                        className="btn-link"
                        style={{ textDecoration: "underline" }}
                    >
                        Go to Matches
                    </button>
                </Link>
                {/* <button onClick={() => socket.current.emit("win")}>Win</button> */}
            </div>
        </div>
    );
};
