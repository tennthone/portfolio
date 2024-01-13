import React, { useContext} from "react";
import { Label, FloatingLabel, Radio } from "flowbite-react";
import { DataContext } from "@/Context/DataContext";
import CustomFieldModal from "./CustomFieldModal";

const CreateFieldModal = () => {
    const { openCreateFieldModal, setOpenCreateFieldModal, data, setData} =
        useContext(DataContext);
    return (
        <>
            <CustomFieldModal
                children={
                    <BodyContent 
                        data={data}
                        setData={setData}
                    />
                }
                openModal={openCreateFieldModal}
                setOpenModal={setOpenCreateFieldModal}
                heading="Add A Field"
            />
        </>
    );
};

export default CreateFieldModal;

export const BodyContent = ({ data, setData}) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                {/* field name  */}
                <div className="w-1/2">
                    <div className="mx-2">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <FloatingLabel
                            variant="outlined"
                            label="name"
                            value={data.name}
                            onChange={(event) =>
                                setData("name", event.target.value)
                            }
                            helperText="This is hit text to help user"
                        />
                    </div>
                </div>
                {/* variable  */}
                <div className="w-1/2">
                    <div className="mx-2">
                        <div className="mb-2 block">
                            <Label htmlFor="variable" value="Variable Name" />
                        </div>
                        <FloatingLabel
                            variant="outlined"
                            label="variable"
                            value={data.value}
                            onChange={(event) =>
                                setData("value", event.target.value)
                            }
                            helperText="This is hit text to help user"
                        />
                    </div>
                </div>
            </div>
            
            {/* File  */}
            {data.type == "file" && (
                <>
                    <div className="flex">
                        <div className="w-1/2 flex items-start gap-2 me-3">
                            <Radio
                                id="options"
                                name="options"
                                value="one"
                                defaultChecked
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> One File </Label>
                                <small>
                                    For example, a single photo or one PDF file
                                </small>
                            </div>
                        </div>
                        <div className="w-1/2 flex items-start gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="many"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Many File</Label>
                                <small>
                                    {" "}
                                    For example, several photos, PDF files, etc.{" "}
                                </small>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Boolean  */}
            {data.type == "number" && (
                <>
                    <div className="flex">
                        <div className="w-1/2 flex items-start gap-2 me-3">
                            <Radio
                                id="options"
                                name="options"
                                value="integer"
                                defaultChecked
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Integer </Label>
                                <small> 1,2,3,5,8, 13, .... </small>
                            </div>
                        </div>
                        <div className="w-1/2 flex items-start gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="decimal"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Decimal </Label>
                                <small> 3.1415265398 </small>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Text  */}
            {data.type == "text" && (
                <>
                    <div className="flex">
                        <div className="w-1/2 flex items-start gap-2 me-3">
                            <Radio
                                id="options"
                                name="options"
                                value="integer"
                                defaultChecked
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options">
                                    Short text, eact search
                                </Label>
                                <small>
                                    256 characters max.Use this for titles,
                                    names, tags, URLs, e-mail addresses
                                </small>
                            </div>
                        </div>
                        <div className="w-1/2 flex items-start gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="decimal"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Long Text </Label>
                                <small>
                                    50k characters max.Use this for
                                    descriptions, text paragraphs, articles
                                </small>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Datetime  */}

            {data.type == "datetime" && (
                <>
                    <div className="flex">
                        <div className="w-1/3 flex items-start gap-2 me-3">
                            <Radio
                                id="options"
                                name="options"
                                value="datetime"
                                defaultChecked
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Datetime </Label>
                                <small> 12/04/2023 12:00 PM </small>
                            </div>
                        </div>
                        <div className="w-1/3 flex items-start gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="date"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Date </Label>
                                <small> 12/04/2023</small>
                            </div>
                        </div>
                        <div className="w-1/3 flex items-start gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="time"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="options"> Time </Label>
                                <small> 12:00 PM</small>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
