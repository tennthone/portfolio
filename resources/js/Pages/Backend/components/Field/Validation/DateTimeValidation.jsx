import { DataContext } from "@/Context/DataContext";
import { Datepicker, Checkbox, TextInput, Label} from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

const DateTimeValidation = () => {
    const [openDateTimeValidation, setOpenDateTimeValidation] = useState(false);
    const {data, setData} = useContext(DataContext);
    console.log(data)

    const handleDateTime = (e) => {
        const isOpen = e.target.checked;
        setData('validation',{
            ...data.validation, 
                date_range : {
                    state : isOpen,
                    message : "",
                    earlier : {
                        state : false,
                        time : "",
                        date : "",
                    },
                    later : {
                        state : false,
                        time : "",
                        date : "",
                    },
                }
        })
        setOpenDateTimeValidation(!openDateTimeValidation)
    }

    console.log(data.validation?.date_range)

    return (
        <>
            <div className="flex items-start my-3">
                <Checkbox
                    checked={data.validation?.date_range?.state}
                    className="me-3"
                    onChange={(e) =>
                        handleDateTime(e)
                    }
                />
                <div className="flex flex-col">
                    <p className="font-bold text-md">
                        Accept Only Specified DateRange
                    </p>
                    <p className="text-sm text-gray-500">
                        Specify an early and/or latest allowed date for this
                        field
                    </p>
                </div>
            </div>
            {/* option  */}
            {openDateTimeValidation && (
                <div className="ms-5">
                    {/* laterthan  */}
                    <div className="flex items-center">
                        <div className="flex items-start my-3 me-3">
                            <Checkbox
                                className="me-3"
                                onChange={(e) =>
                                    setData("validation", {
                                        ...data.validation,
                                        date_range: {
                                            ...data.validation.date_range,
                                            later : {
                                                ...data.validation.date_range.later, 
                                                state : e.target.checked
                                            }
                                        },
                                    })
                                }
                            />
                            <p> Later Than  </p>
                        </div>
                        {/* option  */}
                        <div className="flex items-center">
                            {
                                data.option !== "time" &&
                                <Datepicker 
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            date_range: {
                                                ...data.validation.date_range,
                                                later : {
                                                    ...data.validation.date_range.later, 
                                                    date : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
                            }
                            {
                                data.option !== "date" &&
                                <TextInput
                                    type="time"
                                    placeholder="Time"
                                    className="me-3"
                                    value={data.validation?.num_of_files?.min}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            date_range: {
                                                ...data.validation.date_range,
                                                later : {
                                                    ...data.validation.date_range.later, 
                                                    time : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
                            }
                        </div>
                    </div>
                    {/* earlier than  */}
                    <div className="flex items-center">
                        <div className="flex items-start my-3 me-3">
                            <Checkbox
                                checked={data.validation.date_range?.earlier?.state}
                                className="me-3"
                                onChange={(e) =>
                                    setData("validation", {
                                        ...data.validation,
                                        date_range: {
                                            ...data.validation.date_range,
                                            earlier : {
                                                ...data.validation.date_range.later, 
                                                state : e.target.checked
                                            }
                                        },
                                    })
                                }
                            />
                            <p> Earlier Than </p>
                        </div>
                        {/* option  */}
                        <div className="flex items-center">
                            {
                                data.option !== "time" &&
                                <Datepicker 
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            date_range: {
                                                ...data.validation.date_range,
                                                later : {
                                                    ...data.validation.date_range.later, 
                                                    date : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
                            }
                            {
                                data.option !== "date" &&
                                <TextInput
                                    type="time"
                                    placeholder="Time"
                                    className="me-3"
                                    value={data.validation?.num_of_files?.min}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            date_range: {
                                                ...data.validation.date_range,
                                                later : {
                                                    ...data.validation.date_range.later, 
                                                    time : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
                            }
                        </div>
                    </div>
                    {/* custom error message  */}
                    <div>
                        <div className="my-3">
                            <Label> Custom Error Message </Label>
                            <TextInput
                                className="my-3"
                                placeholder="Enter Custom error message"
                                helperText="To show custom error message"
                                value={data.validation?.num_of_files?.message}
                                onChange={(e) =>
                                    setData("validation", {
                                        ...data.validation,
                                        date_range: {
                                            ...data.validation.date_range,
                                            message : e.target.value
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DateTimeValidation;
