import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSad } from "react-icons/bi";
import { MdSensors, MdEmojiEvents, MdApps } from "react-icons/md";
import req from "../api/request";
import { Loader } from "../Components";
import { MatchCard } from "../Components/MatchCard";

// Public page: anyone (logged in or not) can browse matches and open their scorecard.
const FILTERS = [
    { key: "", label: "All", icon: <MdApps /> },
    { key: "live", label: "Live", icon: <MdSensors /> },
    { key: "completed", label: "Completed", icon: <MdEmojiEvents /> },
];

export const PublicMatchesPage = () => {
    const [status, setStatus] = useState("");
    const [matches, setMatches] = useState(null); // null = loading first page
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    // Only the most recent request may update the list. Without this, tapping "Live" while
    // the earlier "All" request is still loading lets the slower response overwrite the Live list.
    const latest = useRef({ id: 0, controller: null });

    const load = useCallback(async (nextPage, nextStatus, append) => {
        latest.current.controller?.abort();
        const controller = new AbortController();
        const id = ++latest.current.id;
        latest.current.controller = controller;
        const isStale = () => id !== latest.current.id;

        try {
            setError("");
            const res = await req.get(
                `/matches?page=${nextPage}&limit=10${nextStatus ? `&status=${nextStatus}` : ""}`,
                { signal: controller.signal }
            );
            if (isStale()) return;
            const data = res.data;
            setMatches((prev) => (append && prev ? [...prev, ...data.matches] : data.matches));
            setPage(data.page);
            setHasMore(data.hasMore);
        } catch (e) {
            if (isStale() || e?.code === "ERR_CANCELED") return;
            setError(typeof e?.response?.data === "string" ? e.response.data : "Could not load matches.");
            setMatches((prev) => prev || []);
        } finally {
            if (!isStale()) setLoadingMore(false);
        }
    }, []);

    // reload the list whenever the filter changes
    useEffect(() => {
        setMatches(null);
        setHasMore(false);
        setPage(1);
        load(1, status, false);
        return () => latest.current.controller?.abort();
    }, [status]);

    return (
        <div className="public-matches full-display relative">

            <div className="filter-chips">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        className={`filter-chip ${status === f.key ? "active" : ""}`}
                        onClick={() => setStatus(f.key)}
                    >
                        {f.icon}
                        {f.label}
                    </button>
                ))}
            </div>

            <main className="public-matches-list stagger">
                {matches === null ? (
                    <div className="public-matches-loading"><Loader style={{ position: "relative", height: "6rem" }} /></div>
                ) : matches.length === 0 ? (
                    <div className="flex-col center gap-06 pd-block-1">
                        <BiSad size={64} color="grey" />
                        <span className="title-small font-xxsmall">{error || "No matches found"}</span>
                    </div>
                ) : (
                    matches.map((match) => (
                        <NavLink key={match._id} style={{ color: "inherit" }} to="/viewMatch" state={match}>
                            <MatchCard match={match} />
                        </NavLink>
                    ))
                )}

                {hasMore && matches && (
                    <button
                        className="load-more"
                        disabled={loadingMore}
                        onClick={() => { setLoadingMore(true); load(page + 1, status, true); }}
                    >
                        {loadingMore ? "Loading..." : "Load more"}
                    </button>
                )}
            </main>
        </div>
    );
};
