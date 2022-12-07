import React from 'react'
import { DetailMatch } from '../Services'

export const MatchCard = ({
    match
}) => {
    // console.log(match);
    const current = DetailMatch(match)
    
  return (
    <div
        className='match-container pd-block-06 pd-1'
    >
        <div className="font-xsmall grey-light">Individual Match</div>
        <div className="font-xxsmall capital text-eclipse">
            {!match.toss
                ? "Match Not Started"
                : match.venue 
            }
        </div>

        <section className="teams pd-top-03">
            <div className="teamA title-small flex between">
                <span 
                    className={ `match-teamName ${current.isBatTeamA && 'active-team-inn' || ''}`}
                >{match.teamA.name}</span>
                <span>
                <span>
                    {current.teamAScore || 0}
                </span>
                /
                <span>{ current.teamAWickets || 0}</span>
                </span>
            </div>

            <div className="teamB title-small flex between pd-top-03">
                <span className={ `match-teamName ${current.isBatTeamB && 'active-team-inn' || ''}`}>
                    {match.teamB.name}
                </span>
                <span>
                <span>
                    {current.teamBScore || 0}
                </span>
                /
                <span>{ current.teamBWickets || 0}</span>
                </span>
            </div>
        </section>

        <section className="chase-detail font-xxsmall text-eclipse">
            {
                current.isMatchOver 
                ? current.winTeam.name ? `${current.winTeam.name} won the match` : current.winTeam.matchTie
                : current.targetRuns ? current.chaseTarget : `${current.tossWonTeamName} select ${current.tossWonSelect} first`
            }
        </section>
    </div>
  )
}
