import React from "react";
import { Alert, Label, Radio, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import { useState } from "react";
import { useEffect } from "react";

const Default = () => {
    const { data, setData } = useContext(DataContext);
    const [alertText, setAlertText] = useState("");
    const [showDefault, setShowDefault] = useState(true);

    useEffect(() => {
        if (data.type == "file") {
            setShowDefault(false);
            setAlertText(
                "You can only set default value for text, boolean, date, time and number fields "
            );
        } else if (data.validation?.unique?.state == true) {
            setShowDefault(false);
            setAlertText("You cannot set a default value for unique field.");
        } else {
            setShowDefault(true);
            setAlertText(`These setting allows you to set a default value
            for this field, which will be automatically
            inserted to new content entries. It can help
            editors avoid content entry altogether, or just
            give them a helpful prompt for how to structure
            their content.`);
        }
    }, [data.type, data.validation?.unique]);

    return (
        <div className="my-5">
            <p className="font-bold text-2xl my-2"> Default Value </p>
            {showDefault ? (
                <>
                    <Alert color="purple" icon={HiInformationCircle}>
                        <span className="font-medium">{alertText}</span>
                    </Alert>
                    {/* Alert message  */}
                    {data.type !== "boolean" && (
                        <React.Fragment>
                            {/* Default text for text,date, time and number fields */}
                            <TextInput
                                value={data.default_value}
                                onChange={(e) =>
                                    setData("default_value", e.target.value)
                                }
                                placeholder="Default value"
                                className="my-3"
                            />
                        </React.Fragment>
                    )}

                    {/* Default text for boolean  */}
                    {data.type == "boolean" && (
                        <div className="flex mt-3">
                            <div className="flex me-2">
                                <Radio
                                    defaultChecked={data.default_value == "true" ? true : false}
                                    value="true"
                                    className="me-2"
                                    name="boolean_default"
                                    onChange={e => setData('default_value', e.target.value)}
                                />
                                <Label> {data.apperance?.bool.trueLable ?? "Yes"} </Label>
                            </div>
                            <div className="flex me-2">
                                <Radio
                                    defaultChecked={data.default_value == "false" ? true : false}
                                    value="false"
                                    className="me-2"
                                    name="boolean_default"
                                    onChange={e => setData('default_value', e.target.value)}
                                />
                                <Label> {data.apperance?.bool.falseLable ?? "NO"} </Label>
                            </div>
                            <div className="flex">
                                <Radio
                                    defaultChecked={data.default_value == "none" ? true : false}
                                    value="none"
                                    className="me-2"
                                    name="boolean_default"
                                    onChange={e => setData('default_value', e.target.value)}
                                />
                                <Label> Not Set </Label>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <Alert color="purple" icon={HiInformationCircle}>
                        <span className="font-medium"> {alertText} </span>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default Default;
