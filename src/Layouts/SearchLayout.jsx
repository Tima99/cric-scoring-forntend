import React from "react";
import { Outlet } from "react-router-dom";

// Search page body. The header comes from the shared layout (PublicLayout), so none is drawn here.
export const SearchLayout = () => {
    return (
        <div className="relative flex-col search-page">
            <Outlet />
        </div>
    );
};
