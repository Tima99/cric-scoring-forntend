import React, { forwardRef } from "react";
import { MdError } from "react-icons/md";

export const Confirm =  ({ titleText="Confirm" , text="You want to do this"}) => {
    return (
        <div className="abs top-0 left-0 full-display z999 flex center overflow-hidden bg-none dis-none">
            <div className="entry-container pd-1 relative flex-col between">
                <span className="flex gap-1 r-v-center">
                    <MdError color="goldenrod" size={"50px"} />
                    <span className="title"><b>{titleText}</b></span>
                </span>                

                <div className="pd-block-1 contain-text">
                    {text}
                </div>

                <div className="flex between pd-1">
                    <button className="btn-squid btn grey">Cancel</button>
                    <button className="btn btn-squid">Ok</button>
                </div>
            </div>
        </div>
    );
}
