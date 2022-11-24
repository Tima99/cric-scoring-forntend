import req from "../api/request"

export default async function SearchTeam(e, setResult) {
    let query = e.target.value.trim().toLowerCase()
    // setQuery(query)
    // minimum 3 character require
    if (query.length < 3)
      return
    try {
      const res = await req.get(`/search?query=${query}&searchFor=teams`)
      // console.log({ data: res.data, query })
      setResult(res.data)
    } catch (error) {
      console.log(error);
    }
  }