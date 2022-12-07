class Scoring_Update{

    constructor(){
        this.socket = null
    }
    
    setSocket(socket) {
        this.socket = socket    
    }
    
    dot(){
        console.log(this.socket);
        this.socket.emit("add-dot-ball")
    }
}

export const ScoringUpdate = new Scoring_Update()