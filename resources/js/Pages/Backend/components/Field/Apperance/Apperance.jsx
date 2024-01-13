import { DataContext } from "@/Context/DataContext";
import React from "react";
import { useContext } from "react";
import BooleanApperance from "./BooleanApperance";
import HelperText from "./HelperText";

const Apperance = () => {
    const { data } = useContext(DataContext);
    return (
        <React.Fragment>
            <HelperText />
            {data.type == "boolean" && <BooleanApperance />}
        </React.Fragment>
    );
};

export default Apperance;
