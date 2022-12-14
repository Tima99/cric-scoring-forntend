import React, { forwardRef } from "react";
import { MdError } from "react-icons/md";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ChangeStrike } from "../Services";

export const Confirm = ({
    titleText = "Confirm",
    text = "You want to do this",
    fn,
}) => {
    const { state } = useLocation();
    const context = useOutletContext()
    const [fileName, folderName] = state?.okAction;
    // console.log(fileName, folderName);

    const okBtn = {
        Action() {
            return new Promise(async (res, rej) => {
                const { [fileName]: fn } = await import( /* @vite-ignore */  "../" + folderName)
                fn(context?.socket);
                res(true)
            });
        },
    };

    if (state) {
        titleText = state.titleText;
        text = state.text;
    }

    const navigate = useNavigate();

    return (
        <div className="abs top-0 left-0 full-display z999 flex center overflow-hidden bg-shadow pd-1">
            <div className="entry-container pd-1 relative flex-col between">
                <span className="flex gap-1 r-v-center pd-1">
                    <MdError color="goldenrod" size={"50px"} />
                    <span className="title">
                        <b>{titleText}</b>
                    </span>
                </span>

                <div className="pd-block-1 pd-1 contain-text">{text}</div>

                <div className="flex between pd-1">
                    <button
                        className="btn-squid btn grey"
                        onClick={(e) =>
                            state && navigate(state?.cancelNavigateTo)
                        }
                    >
                        {state.cancelText || "Cancel"}
                    </button>
                    <button
                        className="btn btn-squid"
                        onClick={(e) =>
                            state &&
                            okBtn.Action()
                            .then(() => 
                                navigate(state?.okNavigateTo)
                            )
                        }
                    >
                        {state.okText || "Ok"}
                    </button>
                </div>
            </div>
        </div>
    );
};
