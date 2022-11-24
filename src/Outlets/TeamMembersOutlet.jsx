import React, { useMemo } from "react";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import { SelectTeamCard, TeamCard } from "../Components";

export const TeamMembersOutlet = () => {
    const { state } = useLocation();
    const { label, select } = state;

    const { context } = useOutletContext();
    const {
        setMyTeam,
        setOpponent,
        myTeam,
        opponent: opponentTeam,
        isSelection,
    } = context;

    const team = label === "myteam" ? myTeam : opponentTeam;

    const {
        players,
        wicketkeeper,
        selectedCaptain,
        captain: defaultCaptain,
    } = team;

    const playersJsxWithLinkRole = useMemo(() => {
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
        const selectedSquad = players.filter(
            (player) => player.isSelected && player
        );
        // if captain or wicketkeeper not in squad remove captain if already has
        const isCaptainNotinSquad = selectedSquad.every(
            (ply) => !(ply._id===selectedCaptain)
        );
        isCaptainNotinSquad && (team.selectedCaptain = null);

        const isWkNotinSquad = selectedSquad.every(
            (ply) => !(ply._id===wicketkeeper)
        );
        isWkNotinSquad && (team.wicketkeeper = null);

        

        return (
            Array.isArray(players) &&
            selectedSquad.map((player, idx) => {
                // checking player already selected or not
                // if selectedCaptain is null than team captain is select default (if true)
                let isSelected =
                    select === "captain"
                        ? selectedCaptain
                            ? selectedCaptain === player._id
                            : defaultCaptain && defaultCaptain === player._id && (team.selectedCaptain = defaultCaptain)
                        : wicketkeeper && wicketkeeper === player._id;

                select === "captain"
                    ? (player.selectedCaptain = isSelected)
                    : (player.wicketkeeper = isSelected);

                return (
                    <React.Fragment key={idx + select}>
                        <SelectTeamCard
                            obj={player}
                            setSelected={
                                label === "opponent" ? setOpponent : setMyTeam
                            }
                            assign={
                                select === "captain"
                                    ? "selectedCaptain"
                                    : "wicketkeeper"
                            }
                        />
                    </React.Fragment>
                );
            })
        );
    }, [select]);

    return <>{isSelection ? selectPlayersJsx : playersJsxWithLinkRole}</>;
};
