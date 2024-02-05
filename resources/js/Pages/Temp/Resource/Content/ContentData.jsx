import React from "react";
import Items from "./Items";
import { usePage } from "@inertiajs/react";

const ContentData = () => {
    return (
        <>
            {/* Items  */}
            <div className="my-3">
                <Items />
            </div>
        </>
    );
};

export default ContentData;
