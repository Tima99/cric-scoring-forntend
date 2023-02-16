export function DetailMatch(match){
    
    const current = {
        totalInn : match.stats.length,
        matchOvers: match.overs,
        get getTime(){
            const date = new Date(match.createdAt)
            return date.toLocaleTimeString()
        },
        get getDate(){
            const date = new Date(match.createdAt)
            return date.toDateString()
        },
        get inn() { return match.stats[0] },

        get bat() {
            return this.inn.bat;
        },
        get batTeam() {
            const team =
                (match.teamA._id === this.bat._id &&
                    match.teamA) ||
                (match.teamB._id === this.bat._id && match.teamB);
            return team;
        },
        get batTeamPlayers() {
            const players = this.batTeam.players.filter( ply => ply.isSelected)
            return players;
        },
        get bowlTeam() {
            const team =
                (match.teamA._id === this.bowl._id &&
                    match.teamA) ||
                (match.teamB._id === this.bowl._id && match.teamB);
            return team;
        },
        get batTeamId(){
            return this.batTeam._id
        },
        get batTeamName(){
            return this.batTeam.name
        },
        get isBatTeamA(){
            return this.batTeamId === match.teamA._id
        },
        get isBatTeamB(){
            return this.batTeamId === match.teamB._id
        },
        get tossWonTeam(){
            const team = (match.toss.won == match.teamA._id && match.teamA) || (match.toss.won == match.teamB._id && match.teamB)
            return team
        },
        get tossLossTeam(){
            const lossTeam = (match.teamA._id !== this.tossWonTeam._id && match.teamA) || (match.teamB._id !== this.tossWonTeam._id && match.teamB)
            return lossTeam
        },
        get tossWonTeamName(){
            return this.tossWonTeam.name
        },
        tossWonSelect: match.toss.select,

        get bowl() {
            return this.inn.bowl;
        },
        get bowlTeam() {
            const team =
                (match.teamA._id === this.bowl._id &&
                    match.teamA) ||
                (match.teamB._id === this.bowl._id && match.teamB);
            return team;
        },
        get fieldTeam() {
            const team =
                (match.teamA._id === this.bowl._id &&
                    match.teamA) ||
                (match.teamB._id === this.bowl._id &&
                    match.teamB);
            return team;
        },
        get batters() {
            const batters = this.bat.batters.filter(batter => batter)
            return batters;
        },
        get bowlers() {
            return this.bowl.bowlers;
        },
        get strikeBowler(){
            return this.bowlers.filter( bowler => bowler.strike)[0] || {}
        },
        get bowlerOversBowl(){
            const totalBallsBowl    = this.strikeBowler.ballsBowl || 0
            const completedOvers    = Math.floor(totalBallsBowl / 6)
            const ongoingOverBalls  = totalBallsBowl % 6
            return `${completedOvers}.${ongoingOverBalls}`
        },
        get bowlerOversBowlCompleted(){
            if( !this.strikeBowler.ballsBowl ) return false 
            const totalBallsBowl    = this.strikeBowler.ballsBowl || 0
            const ongoingOverBalls  = totalBallsBowl % 6
            return ongoingOverBalls <= 0
        },
        get overSpell(){
            const ongoingOverBalls = this.strikeBowler.ballsBowl % 6
            const spells = this.strikeBowler.spell && (ongoingOverBalls > 0 && this.strikeBowler.spell.splice(-ongoingOverBalls))
            
            return spells || [] 
        },
        get score(){
            return this.inn.bat.score
        },
        get inn1Score() {
            return match.stats[this.totalInn - 1].bat.score;
        },
        get inn2Score() {
            if(this.totalInn < 2) return null
            return match.stats[this.totalInn - 2].bat.score;
        },
        get inn1Wickets() {
            return match.stats[this.totalInn - 1].bat.wickets;
        },
        get inn2Wickets() {
            if(this.totalInn < 2) return null
            return match.stats[this.totalInn - 2].bat.wickets;
        },
        get teamAScore(){
            const teamA = match.stats.filter( item => item.bat._id === match.teamA._id )[0]
            return teamA?.bat?.score
        },
        get teamBScore(){
            const teamB = match.stats.filter( item => item.bat._id === match.teamB._id )[0]
            return teamB?.bat?.score
        },
        get teamAWickets(){
            const teamA = match.stats.filter( item => item.bat._id === match.teamA._id )[0]
            return teamA?.bat?.wickets
        },
        get teamBWickets(){
            const teamB = match.stats.filter( item => item.bat._id === match.teamB._id )[0]
            return teamB?.bat?.wickets
        },
        get wicketsDown(){
            return this.bat.batters.filter((bats) => bats && bats.out).length
        },
        get overs(){
            const totalBallsBowl    = this.inn.totalBalls
            const completedOvers    = Math.floor(totalBallsBowl / 6)
            const ongoingOverBalls  = totalBallsBowl % 6
            const overs = `${completedOvers || 0}.${ongoingOverBalls || 0}`
            return overs
        },
        get teamAInn(){
            const teamA = match.stats.filter(stat => stat.bat._id === match.teamA._id)
            if( !teamA.length) return null
            return teamA
        },
        get teamBInn(){
            const teamB = match.stats.filter(stat => stat.bat._id === match.teamB._id)
            if( !teamB.length) return null
            return teamB
        },
        get teamAOvers(){
            const teamAInn = this.teamAInn
            if(teamAInn === null ) return '0.0'
            const totalBallsBowl    = teamAInn[0].totalBalls
            const completedOvers    = Math.floor(totalBallsBowl / 6)
            const ongoingOverBalls  = totalBallsBowl % 6
            const overs = `${completedOvers || 0}.${ongoingOverBalls || 0}`
            return overs
        },
        get teamBOvers(){
            const teamBInn = this.teamBInn
            if(teamBInn === null ) return '0.0'
            const totalBallsBowl    = teamBInn[0].totalBalls
            const completedOvers    = Math.floor(totalBallsBowl / 6)
            const ongoingOverBalls  = totalBallsBowl % 6
            const overs = `${completedOvers || 0}.${ongoingOverBalls || 0}`
            return overs
        },
        get isNextInningStart(){
            const totalBatsman = this.batters.length
            const outBatsman = this.batters.filter(
                (ply) => ply?.outType
            )
            return outBatsman.length == totalBatsman - 1 || this.inn.totalBalls >= (match.overs * 6)   
        },
        get isMatchOver(){
            // first of all thier is two innings
            const is2InnOk = typeof match.winTeam == "string" ? match.winTeam.includes("null") ? null : match.winTeam  : match.winTeam
            return is2InnOk
        },
        get targetRuns(){
            if(this.totalInn < 2) return null
            const runsToChase = match.stats[1].bat.score
            return runsToChase + 1
        },
        get chaseTarget(){
            const runsToChase = this.targetRuns
            if(runsToChase === null) return ''
            const chase = `Needs ${ runsToChase - this.score } runs in ${(match.overs * 6) - (this.totalInn > 1 ? this.inn.totalBalls : 0) } balls`

            return chase
        },
        get oversBowl(){
            let overs = Math.floor(this.inn.totalBalls / 6)
            return overs 
        },
        get runRate(){
            if(this.inn.totalBalls < 6) return this.inn.bat.score.toFixed(1)

            let rr = (this.score / (this.inn.totalBalls || 1))
            if(!isNaN(rr)){
                rr = (rr * 6)
                rr = rr.toFixed(1)
            }else rr= '0.0'
            return rr
        },
        get requiredRunRate(){
            const runsToChase = this.targetRuns
            if(runsToChase === null) return ''
            let rr = (runsToChase / match.overs)

            if(!isNaN(rr)){
                rr = rr.toFixed(1)
            }else rr= '0.0'
            return rr
        },
        get winTeam(){
            const matchOver = this.isMatchOver
            // matchOver has id of win team if match over
            // matchOver has false means match tie
            if(matchOver === null) return {}

            let result
            if( typeof matchOver === "string" && matchOver.includes("false")) 
                result = {matchTie: "Match Tie"}
            else
                result = (matchOver === match.teamA._id && match.teamA) || (matchOver === match.teamB._id && match.teamB)
            return result
        }

    }

    return current
}