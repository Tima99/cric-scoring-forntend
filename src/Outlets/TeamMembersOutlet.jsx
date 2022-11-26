import React, { useMemo } from "react";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import { SelectTeamCard, TeamCard } from "../Components";

export const TeamMembersOutlet = () => {
    const { state } = useLocation();
    const { label, select, assign , title, ignore} = state;
    const { context } = useOutletContext();

    const {
        setMyTeam,
        setOpponent,
        setOpening,
        opening,
        myTeam,
        opponent: opponentTeam,
        isSelection,
    } = context || {};
        // console.log({context});

    const team = (!label && {}) || (label === "myteam" ? myTeam : opponentTeam);

    const {
        players,
        wicketkeeper,
        selectedCaptain,
        captain: defaultCaptain,
    } = team || {};

    // console.log(players);

    const playersJsxWithLinkRole = useMemo(() => {
        const players = state.players;
        return (
            Array.isArray(players) &&
            players.map((player, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <Link to={"/teamPreview/playerRole"} state={player}>
                            <TeamCard obj={player} />
                        </Link>
                    </React.Fragment>
                );
            })
        );
    }, []);

    const selectPlayersJsx = useMemo(() => {
        if (!Array.isArray(players)) return;
        const selectedSquad = players.filter(
            (player) => ignore ? (ignore !== player._id) && player.isSelected : player.isSelected
        );
        // if captain or wicketkeeper not in squad remove captain if already has
        const isCaptainNotinSquad = selectedSquad.every(
            (ply) => !(ply._id === selectedCaptain)
        );
        isCaptainNotinSquad && (team.selectedCaptain = null);

        const isWkNotinSquad = selectedSquad.every(
            (ply) => !(ply._id === wicketkeeper)
        );
        isWkNotinSquad && (team.wicketkeeper = null);

        return selectedSquad.map((player, idx) => {
            // checking player already selected or not
            // if selectedCaptain is null than team captain is select default (if true)
            let isSelected =
                assign ? (opening && opening[assign]?._id === player._id) :
                (select === "captain"
                    ? selectedCaptain
                        ? selectedCaptain === player._id
                        : defaultCaptain &&
                          defaultCaptain === player._id &&
                          (team.selectedCaptain = defaultCaptain)
                    : wicketkeeper && wicketkeeper === player._id);

            select === "captain"
                ? (player.selectedCaptain = isSelected)
                : (player.wicketkeeper = isSelected);

            assign && (player[assign] = isSelected)

            return (
                <React.Fragment key={idx + select}>
                    <SelectTeamCard
                        obj={player}
                        setSelected={
                            (assign && setOpening) ||
                            (label === "opponent" ? setOpponent : setMyTeam)
                        }
                        assign={
                            assign ||
                            (select === "captain"
                                ? "selectedCaptain"
                                : "wicketkeeper")
                        }
                        howtoAssign = {assign ? ['_id', 'name'] : '_id'}
                    />
                </React.Fragment>
            );
        });
    }, [select]);

    return (
        <div className="full-display abs top-0 left-0 pd-1 pd-block-1 flex-col gap-1">
            {title && <span className="title z9999">{title}</span>}
            {isSelection ? selectPlayersJsx : playersJsxWithLinkRole}
        </div>
    );
};
