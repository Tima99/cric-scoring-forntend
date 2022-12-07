import React, { useMemo, useState } from "react";

const RadioButton = ({ title, outBatsman, many, wideShow=false, noBallShow=false, setData }) => {
    return (
        <div style={{ color: "black" }} className="grid-media-layout">
            <input type="radio" name="radio-out" id={title} onChange={e => setData({outType: title,many, wideShow, noBallShow, outBatsman})}/>
            <label
                htmlFor={title}
                style={{ textTransform: "capitalize" }}
                className="title"
            >
                {title}
            </label>
        </div>
    );
};

export const Radios = ({ titles, pageTitle, btnClick }) => {
    const [data, setData] = useState()

    const radios = useMemo(()=>{
        return titles.map((title) => {
            const isArray = Array.isArray(title);
            const outBatsman = isArray && title[1]
            const many = isArray && title[2] || 0
            const wideShow = isArray && title[3]
            const noBallShow = isArray && title[4]
            
            title = isArray ? title[0] : title;

            return (
                <React.Fragment key={title}>
                    <RadioButton title={title} outBatsman={outBatsman} many={many} wideShow={wideShow} noBallShow={noBallShow} setData={setData} />
                </React.Fragment>
            );
        });
    }, [])

    return (
        <div className="abs top-0 left-0 flex-col gap-1 pd-1 c-v-center z999 bg-body full-display">
            <h2 style={{ color: "var(--primary-dark)" }}>{pageTitle}</h2>
            <div>{radios}</div>
            <div className="flex parent-full-width"
            onClick={e => btnClick(data)}
            >
                <button className="btn-squid btn margin-left-auto">Next</button>
            </div>
        </div>
    );
};
