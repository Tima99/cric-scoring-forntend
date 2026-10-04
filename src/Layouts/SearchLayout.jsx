import React from "react";
import styles from "./styles/NavLayout.module.css";
import brandLogo from "../assets/fox-sports-logo.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { TbGridDots, TbCricket } from "react-icons/tb";
import { MdArrowBackIos } from "react-icons/md";

export const SearchLayout = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className={styles["search-nav"]}>
                <button
                    className={styles["search-nav-back"]}
                    onClick={() => { navigate(-1) }}
                    aria-label="Go back"
                >
                    <MdArrowBackIos size={20} />
                </button>

                <Link to={"/"} className={styles["search-nav-logo"]}>
                    <img src={brandLogo} alt="Logo" />
                </Link>

                <span className={styles["search-nav-spacer"]} />
            </div>
            <div className="relative flex-col">
                <Outlet />
            </div>
        </div>
    );
};
