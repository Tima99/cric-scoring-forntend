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
                <div 
                    className={
                        current.teamAInn ? "flex-col" : "flex-col-rev"
                    }
                >
                {
                    current.teamAInn !== null ?
                    <div className={`teamA title-small flex between ${current.winTeam._id !== match.teamA._id && "opacity-08" || ''}`}>
                        <span
                            className={`match-teamName text-eclipse flex-1 
                            ${( current.winTeam._id || current.isBatTeamA && "active-team-inn") || ""}
                            ${(current.winTeam._id === match.teamA._id && "green bold") || "" }`}
                        >
                            {match.teamA.name}
                        </span>
                        <span>
                            <span>{current.teamAScore || 0}</span>/
                            <span>{current.teamAWickets || 0}</span>&nbsp;
                            <span className='font-xsmall'>({current.teamAOvers})</span>
                        </span>
                    </div>
                    : 
                    <div className='flex title-small pd-top-03 between'>
                        <span>
                            {match.teamA.name}
                        </span>
                        <span style={{color: "grey", fontSize: ".9rem", fontWeight: "bold", opacity: ".7"}}>
                            Yet To Bat
                        </span>
                    </div>
                }

                {
                    current.teamBInn !== null ?
                    <div className={`teamB title-small flex between pd-top-03 ${current.winTeam._id !== match.teamB._id && "opacity-08" || ''}`  }>
                        <span
                            className={`match-teamName text-eclipse flex-1 
                            ${(current.winTeam._id || current.isBatTeamB && "active-team-inn") || ""}
                            ${(current.winTeam._id === match.teamB._id && "green bold") || "" }
                            `}
                        >
                            {match.teamB.name}
                        </span>
                        <span>
                            <span>{current.teamBScore || 0}</span>/
                            <span>{current.teamBWickets || 0}</span>&nbsp;
                            <span className='font-xsmall'>({current.teamBOvers})</span>
                        </span>
                    </div> 
                    : 
                    <div className='flex title-small pd-top-03 between'>
                        <span>
                            {match.teamB.name}
                        </span>
                        <span style={{color: "grey", fontSize: ".9rem", fontWeight: "bold", opacity: ".7"}}>
                            Yet To Bat
                        </span>
                    </div>
                }
                </div>
        </section>

        <section className="chase-detail font-xxsmall text-eclipse">
            {
                current.isMatchOver 
                ? <span className="bold" style={{color: "#333"}}>
                    {
                        current.winTeam.name ? `${current.winTeam.name} won the match` : current.winTeam.matchTie
                    }
                </span>
                : current.targetRuns ? current.chaseTarget : `${current.tossWonTeamName} select ${current.tossWonSelect} first`
            }
        </section>
    </div>
  )
}
