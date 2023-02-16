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
            <div
                className={`${styles["nav-layout-container"]}`}
            >
                <div className="pd-1"
                    onClick={() => { navigate(-1) }}
                >
                    <MdArrowBackIos size={24}/>
                </div>

                <Link to={"/"} className={styles["mobile-logo"]}>
                    <img src={brandLogo} alt="Logo" />
                </Link>
            </div>
            <div className="relative flex-col">
                <Outlet />
            </div>
        </div>
    );
};
