import React, { useMemo } from "react";
import { BiSad } from "react-icons/bi";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import { Backbutton, SelectTeamCard, TeamCard } from "../Components";

export const TeamMembersOutlet = () => {
    const { state } = useLocation();
    const { label, select, assign, title, ignore, selfBackBtn } = state;
    let context = useOutletContext();
    // console.log(context);

    context = context?.context ? context.context : context;

    const {
        setMyTeam,
        setOpponent,
        setOpening,
        myTeam,
        opponent: opponentTeam,
        isSelection,
        backBtnFun,
        batTeam
    } = context || {};
    let {opening} = context 
    const team = (!label && {}) || (label === "myteam" ? myTeam : opponentTeam || batTeam);
    const {
        players,
        wicketkeeper,
        selectedCaptain,
        captain: defaultCaptain,
    } = team || {};
    opening = !players?.length ? true : opening

    const playersJsxWithLinkRole = useMemo(() => {
        if (isSelection) return;
        const players = state.players || state.team.players;
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
        const selectedSquad = players.filter((player) =>
            Array.isArray(ignore)
                ? ignore.every((ignPly) => ignPly._id !== player._id) &&
                  player.isSelected
                : ignore
                ? ignore !== player._id && player.isSelected
                : player.isSelected
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
            let isSelected = assign
                ? opening && opening[assign]?._id === player._id
                : select === "captain"
                ? selectedCaptain
                    ? selectedCaptain === player._id
                    : defaultCaptain &&
                      defaultCaptain === player._id &&
                      (team.selectedCaptain = defaultCaptain)
                : wicketkeeper && wicketkeeper === player._id;

            select === "captain"
                ? (player.selectedCaptain = isSelected)
                : (player.wicketkeeper = isSelected);

            assign && (player[assign] = isSelected);

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
                        howtoAssign={assign ? ["_id", "name"] : "_id"}
                    />
                </React.Fragment>
            );
        });
    }, [select]);
    
    return (
        <div className="full-display abs top-0 left-0 pd-1 pd-block-1 flex-col gap-1 z99999">
            <section className="nav pd-1 flex gap-1 r-v-center z9999">
                {selfBackBtn && opening && (
                    <div
                        onClick={
                            (typeof backBtnFun === "function" && backBtnFun) ||
                            new Function()
                        }
                    >
                        <Backbutton size={25} replace={true} backTimes={1} />
                    </div>
                )}
                {title && <span className="title z9999">{title}</span>}
            </section>

            {isSelection ? (selectPlayersJsx.length > 0 ? selectPlayersJsx : <div className="flex center">No player selected in squad</div>) 
                : (Array.isArray(playersJsxWithLinkRole) && playersJsxWithLinkRole.length > 0 ? playersJsxWithLinkRole 
                : <div className="flex-col center gap-06">
                    <BiSad size={64} color={'grey'} />
                    <span className="font-xxsmall">No Players in this team</span>
                </div>)}
        </div>
    );
};
