import React, { forwardRef } from "react";
import { MdError } from "react-icons/md";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ChangeStrike } from "../Services";
import { Modal } from "./Modal";

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

    const cancel = () => state && navigate(state?.cancelNavigateTo)

    return (
        <Modal onClose={cancel}>
            <div className="modal-head">
                <MdError color="#e0a526" size={44} />
                <h2 className="modal-title">{titleText}</h2>
            </div>

            <div className="modal-body contain-text">{text}</div>

            <div className="modal-actions">
                <button className="modal-btn-secondary" onClick={cancel}>
                    {state?.cancelText || "Cancel"}
                </button>
                <button
                    onClick={(e) =>
                        state &&
                        okBtn.Action()
                        .then(() => 
                            navigate(state?.okNavigateTo)
                        )
                    }
                >
                    {state?.okText || "Ok"}
                </button>
            </div>
        </Modal>
    );
};
