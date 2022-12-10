import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { SelectTeamCard } from "../Components";
import { FaCopyright } from "react-icons/fa";

export const PlayingSquadOutlet = () => {
    const { state } = useLocation();

    const players = useMemo(() => {
        const players = state.team.players;
        const captain = state.team.captain;
        const wk = state.team.wicketkeeper;

        if (!Array.isArray(players)) return;

        const playingSquad = players.filter((ply) => ply.isSelected);
        const restSquad = players.filter((ply) => !ply.isSelected);

        const playingSquadCards = playingSquad.map((player, i) => {
            return (
                <div
                    className="relative flex r-v-center order-top"
                    key={state.title + player._id+ i}
                >
                    <span className="flex-1">
                        <SelectTeamCard obj={player} />
                    </span>
                    <span className="flex center gap-06 abs right-0 pd-1">
                    {player._id === captain && (
                        <span className="">
                            <FaCopyright color="green" size={20} />
                        </span>
                    )}
                    {player._id === wk && (
                        <span className="">
                            wk
                        </span>
                    )}
                    </span>
                </div>
            );
        });

        const restSquadCards = restSquad.map((player, i) => {
            return <SelectTeamCard obj={player} key={i}/>;
        });

        return [playingSquadCards, restSquadCards];
    }, []);

    return (
        <div className="flex-col pd-1 gap-1 pd-block-1">
            <h2>{state.title}</h2>
            <div className="flex-col gap-1">{players[0]}</div>
            {players[1].length ? (
                <>
                    <h2>Rest</h2>
                    <div className="flex-col gap-1">{players[1]}</div>
                </>
            ): ''}
        </div>
    );
};
