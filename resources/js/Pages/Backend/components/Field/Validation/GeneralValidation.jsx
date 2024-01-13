import { DataContext } from "@/Context/DataContext";
import React from "react";
import { useContext } from "react";
import { Checkbox} from "flowbite-react";

const GeneralValidation = () => {
    const { data, setData } = useContext(DataContext);
    
    return (
        <div>
            {/* Required field  */}
            <div className="flex items-start my-3">
                <Checkbox
                    checked={data.validation?.required?.state}
                    className="me-3"
                    onChange={(e) =>
                        setData("validation", {
                            ...data.validation,
                            required: {
                                state: e.target.checked,
                            },
                        })
                    }
                />
                <div className="flex flex-col">
                    <p className="font-bold text-md"> Required Field </p>
                    <p className="text-sm text-gray-500">
                        You won't be able to publish if this component is empty.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeneralValidation;
