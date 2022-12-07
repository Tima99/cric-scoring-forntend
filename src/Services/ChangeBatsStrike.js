const ChangeBatsStrike = async function (socket){
        socket.current.emit("change-strike")
}

export default ChangeBatsStrike;