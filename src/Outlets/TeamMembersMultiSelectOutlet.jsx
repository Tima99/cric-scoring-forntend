import React, { useMemo } from 'react'
import { useLocation, Link, useOutletContext } from 'react-router-dom'
import { MultiSelectedCard, NavHorizontal, TeamCard } from '../Components'

export const TeamMembersMultiSelectOutlet = () => {
    const { state } = useLocation()
    const { label } = state

    const {context} = useOutletContext()
    const { setMyTeam, setOpponent, myTeam, opponent: opponentTeam } = context

    const { players } = label === "myteam" ? myTeam : opponentTeam

    const selectPlayersJsx = useMemo(() => {
        return Array.isArray(players) && players.map((player, idx) => {
            return (
                <React.Fragment key={idx}>
                    <MultiSelectedCard obj={player} setSelected={label === "opponent" ? setOpponent : setMyTeam} />
                </React.Fragment>
            )
        })
    }, [players])

    return (
        <>
            {selectPlayersJsx}
        </>
    )
}
