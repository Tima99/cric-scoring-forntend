import React, { useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";
import req from "../api/request";
import { ShowMsg, TeamCard, SelectTeamCard, Loader } from "../Components";
import SearchPlayer from "../Services/SearchPlayer";
import SearchTeam from "../Services/SearchTeam";
import { BiSad } from "react-icons/bi";
import { useEffect } from "react";
import { useRef } from "react";

export const SearchOutlet = () => {
    const { teamId } = useParams();
    const [result, setResult] = useState([]);
    const [query, setQuery]   = useState("");
    const [msg, setMsg] = useState("");
    const navigate      = useNavigate();

    // search opponenet start match passed from "StartMatchPage.jsx"
    const { state } = useLocation();
    const { placeholder, searchFor, isSelection, addBtn } = state || {};
    const context = useOutletContext();
    const { setOpponent, setScorer } = context || {};
    const resultContainer = useRef()
    const [isSearching, setIsSearching] = useState(false)
    // console.log(isSelection, setOpponent);

    useEffect(() => {
        let timeoutId = setTimeout(setMsg, 2000, "");
        return () => clearTimeout(timeoutId);
    }, [msg]);

    async function addPlayer(e, playerId) {
        try {
            // console.log(playerId);
            // {teamId, playerId, role}
            const res = await req.post("/addPlayer", { teamId, playerId });
            setMsg(`$${"Player Added!"}`);
            navigate(-2, { state: res.data });
        } catch (error) {
            // console.log(error);
            setMsg(error.response.data);
        }
    }
    const resultsEle = useMemo(() => {
        if (Array.isArray(result)) {
            return result.map((r) => {
                return (
                    <div key={r._id} className="relative flex center">
                        <TeamCard obj={r} />
                        {addBtn && (
                            <div className="abs right-0 pd-1">
                                <button
                                    className="btn-link"
                                    onClick={(e) => addPlayer(e, r.email)}
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                );
            });
        }
        let arr = Object.keys(result);

        return arr.map( (key, i) => 
                <div className="flex-col gap-06" key={i}>
                    <div className="title-small">{key}</div>
                    { result[key].length ? result[key].map( r => 
                        <div key={r._id} className="relative flex center"
                            onClick={
                                (e) => {
                                    if(key === "players")
                                        navigate('/home', {state: {_id: r._id, playerStat: true}})
                                    else if(key === "teams")
                                        navigate(`/team/${r._id}`)
                                }
                            }
                        >
                            <TeamCard obj={r} />
                        </div>
                       ): <div className="flex center">{`No ${key} found!`}</div>
                    }
                </div>    
            )

    }, [result]);

    const selectedEle = useMemo(() => {
        return (
            Array.isArray(result) &&
            result.map((r) => {
                return (
                    <SelectTeamCard
                        obj={r}
                        setSelected={
                            searchFor == "teams" ? setOpponent : setScorer
                        }
                        key={r._id}
                    />
                );
            })
        );
    }, [result]);

    // search all
    async function Search(setResult) {
        let $query = query.trim().toLowerCase();
        if ($query.length < 2) return setIsSearching(false);
            
        try {
            const res = await req.get(`/search?query=${$query}`);
            // console.log({ data: res.data, $query })
            setResult(res.data);
            setIsSearching(false)
        } catch (error) {
            console.log(error);
            setIsSearching(false)
        }
    }

    return (
        <div className="abs full-display top-0 left-0 bg-body margin-auto">
            <div className="margin-auto">
                <div className="search-container relative flex between parent-full-width">
                    <input
                        type="text"
                        name="search"
                        id="type-search"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (searchFor === "players") SearchPlayer(e, setResult, null, setIsSearching);
                            else if (searchFor === "teams")
                                SearchTeam(e, setResult, null, setIsSearching);
                        }}
                    />
                    <div
                        className="bg-white pd-1 flex center border-bottom"
                        onClick={(e) => {
                            if(isSearching) return
                            setResult([])
                            setIsSearching(true)
                            if (searchFor === "players") SearchPlayer(e, setResult, query, setIsSearching);
                            else if (searchFor === "teams")
                                SearchTeam(e, setResult, query, setIsSearching);
                            else
                                Search(setResult);
                        }}
                    >
                        <BsSearch size={17} color="var(--primary-dark)" />
                    </div>
                </div>

                <div className="pd-1 flex-col gap-1 pd-block-06"
                    ref={resultContainer}
                >
                    <ShowMsg
                        text={msg}
                        error={msg?.[0] === "$" ? false : true}
                        style={{ paddingTop: 0 }}
                    />
                    {Array.isArray(result) && result.length === 0 ? (
                        <div
                            className="flex-col center"
                            style={{ textTransform: "capitalize" }}
                        >
                            {
                                isSearching ?
                                <Loader style={{
                                    paddingTop: "1.4rem",
                                    alignItems: "flex-start",
                                    marginTop: "3rem"
                                }}/>
                                :
                                <>
                                    <BiSad size={80} color="gray" />
                                    {`No ${searchFor || "Result"} found`}
                                </>
                            }
                            
                        </div>
                    ) : isSelection ? (
                        selectedEle
                    ) : (
                        resultsEle
                    )}
                </div>
            </div>
        </div>
    );
};
