import req from "../api/request"

export const getTeamMatches = async (matchesIdArr) => {
    try {
        // matches has array of matches id (string)
        const res = await req.post("/getMatches", matchesIdArr)
        return res.data
    } catch (error) {
        return Promise.reject(error)
    }
}