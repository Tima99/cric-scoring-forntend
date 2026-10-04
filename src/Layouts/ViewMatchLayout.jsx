import React, { useRef, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MdInfoOutline, MdSensors, MdListAlt } from "react-icons/md";
import { TopNav } from "../Components";
import { ViewMatch2, ViewMatch3 } from "../Ui";

const TABS = [
    { label: "Info", icon: <MdInfoOutline /> },
    { label: "Live", icon: <MdSensors /> },
    { label: "Scorecard", icon: <MdListAlt /> },
];

export const ViewMatchLayout = () => {
    const { state } = useLocation();
    const scrollRef = useRef();
    const [active, setActive] = useState(0);

    // tab click -> slide to that panel
    const goTo = (i) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
        setActive(i);
    };

    // swipe -> keep the active tab in sync
    const onScroll = useCallback((e) => {
        const el = e.currentTarget;
        const i = Math.round(el.scrollLeft / (el.clientWidth || 1));
        setActive((prev) => (prev === i ? prev : i));
    }, []);

    return (
        <div className="relative flex-col full-display view-match-page">
            <TopNav title="Match" menu={false} replace={true} />

            <nav className="match-tabs" role="tablist">
                {TABS.map((t, i) => (
                    <button
                        key={t.label}
                        role="tab"
                        aria-selected={active === i}
                        className={`match-tab ${active === i ? "active" : ""}`}
                        onClick={() => goTo(i)}
                    >
                        {t.icon}
                        <span>{t.label}</span>
                    </button>
                ))}
                <span
                    className="match-tab-indicator"
                    style={{ transform: `translateX(${active * 100}%)`, width: `${100 / TABS.length}%` }}
                />
            </nav>

            <section className="scroll-container" ref={scrollRef} onScroll={onScroll}>
                <div className="scroll-content-container">
                    <Outlet context={state} />
                </div>
                <div className="scroll-content-container">
                    <ViewMatch2 state={state} />
                </div>
                <div className="scroll-content-container">
                    <ViewMatch3 state={state} />
                </div>
            </section>
        </div>
    );
};
