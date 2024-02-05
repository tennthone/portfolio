import React from "react";
import GeneralValidation from "./GeneralValidation";
import MediaValidation from "./MediaValidation";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import TextValidation from "./TextValidation";
import DateTimeValidation from "./DateTimeValidation";

const Validation = () => {
    const {data} = useContext(DataContext);

    let textValidation = false;
    if(data.type == "text" || data.type == "textarea") {
        textValidation = true;
    }
    return (
          <div>
          <p className="font-bold text-2xl my-2"> Validation </p>
          {/* General Validation  */}
          <GeneralValidation />
          {textValidation  && <TextValidation />}
          {/* Media Validation  */}
          {data.type == "file" &&  <MediaValidation /> }
          {data.type == "datetime" && <DateTimeValidation />}
          </div>
      );
};

export default Validation;
