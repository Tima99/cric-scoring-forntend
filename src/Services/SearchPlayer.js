import req from "../api/request"

export default async function SearchPlayer(e, setResult, _query, setIsSearching) {
    let query = _query || e.target.value.trim().toLowerCase()
    // setQuery(query)
    // minimum 3 character require
    if (query.length < 2)
      return
    try {
      const res = await req.get(`/search?query=${query}&searchFor=players`)
      // console.log({ data: res.data, query })
      setResult(res.data)
      setIsSearching(false)
    } catch (error) {
      console.log(error);
      setIsSearching(false)
    }
  }