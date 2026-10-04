import React, { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { Modal } from "./Modal";

// One selectable option card (radio input stays hidden for accessibility)
const RadioButton = ({ title, outBatsman, many, wideShow = false, noBallShow = false, selected, setData }) => {
    return (
        <label className={`radio-card ${selected ? "selected" : ""}`}>
            <input
                type="radio"
                name="radio-out"
                checked={selected}
                onChange={() => setData({ outType: title, many, wideShow, noBallShow, outBatsman })}
            />
            <span className="radio-card-text">{title}</span>
        </label>
    );
};

export const Radios = ({ titles, pageTitle, btnClick, onClose }) => {
    const [data, setData] = useState();

    const options = useMemo(() => {
        return titles.map((title) => {
            const isArray = Array.isArray(title);
            return {
                title: isArray ? title[0] : title,
                outBatsman: isArray && title[1],
                many: (isArray && title[2]) || 0,
                wideShow: isArray && title[3],
                noBallShow: isArray && title[4],
            };
        });
    }, [titles]);

    return (
        <Modal onClose={onClose}>
            {onClose && (
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <MdClose size={18} />
                </button>
            )}
            <h2 className="modal-title">{pageTitle}</h2>
            <p className="modal-sub">Choose one option to continue</p>

            <div className="radio-grid">
                {options.map((o) => (
                    <RadioButton
                        key={o.title}
                        {...o}
                        selected={data?.outType === o.title}
                        setData={setData}
                    />
                ))}
            </div>

            <div className="modal-actions" style={{ marginTop: "1rem" }}>
                <button disabled={!data} className={!data ? "disable" : ""} onClick={() => data && btnClick(data)}>
                    Next
                </button>
            </div>
        </Modal>
    );
};
