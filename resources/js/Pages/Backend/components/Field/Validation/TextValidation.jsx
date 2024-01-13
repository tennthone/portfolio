import { DataContext } from "@/Context/DataContext";
import React from "react";
import { useContext } from "react";
import {Checkbox, TextInput, Select, Label} from 'flowbite-react'
import { useState } from "react";

const TextValidation = () => {
    const {data, setData} = useContext(DataContext)
    const [openLimitCharCount, setOpenLimitCharCount] = useState(
        data.validation?.char_limit?.state
    );

    const hanleLimitCharCount = (e) => {
        const isOpen = e.target.checked;
        setData("validation", {
            ...data.validation,
            char_limit: {
                state: isOpen,
                message: "",
                min: 0,
                max: 0,
            },
        });
        setOpenLimitCharCount(isOpen);
    };

    return (
        <>
            {/* Unique field  */}
            <div className="flex items-start my-3">
                <Checkbox
                    checked={data.validation?.unique?.state}
                    className="me-3"
                    onChange={(e) =>
                        setData("validation", {
                            ...data.validation,
                            unique: {
                                state: e.target.checked,
                            },
                        })
                    }
                />
                <div className="flex flex-col">
                    <p className="font-bold text-md"> Unique Field </p>
                    <p className="text-sm text-gray-500">
                        You won't be able to publish if there is an existing
                        entry with identical content.
                    </p>
                </div>
            </div>
            {/* limit char field  */}
            <div className="flex items-start my-3">
                <Checkbox
                    checked={data.validation?.char_limit?.state}
                    className="me-3"
                    onChange={hanleLimitCharCount}
                />
                <div className="flex flex-col">
                    <p className="font-bold text-md"> Limit Character Count </p>
                    <p className="text-sm text-gray-500">
                        Specify a minimun and/or maximum allowed number of
                        characters
                    </p>
                </div>
            </div>
            {openLimitCharCount && (
                <>
                    <div className="flex items-center">
                        <Select className="me-3">
                            <option value="between"> Between </option>
                            <option value="at-least"> At Least </option>
                            <option value="not-more-than">Not More Than</option>
                        </Select>
                        <TextInput
                            type="number"
                            placeholder="minimum"
                            className="me-3"
                            value={data.validation.char_limit?.min}
                            onChange={(e) =>
                                setData("validation", {
                                    ...data.validation,
                                    char_limit: {
                                        ...data.validation.char_limit,
                                        min: e.target.value,
                                    },
                                })
                            }
                        />
                        <p className="me-3"> and </p>
                        <TextInput
                            type="number"
                            placeholder="maximum"
                            value={data.validation.char_limit?.max}
                            onChange={(e) =>
                                setData("validation", {
                                    ...data.validation,
                                    char_limit: {
                                        ...data.validation.char_limit,
                                        max: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    {/* custom error message  */}
                    <div className="my-3">
                        <Label> Custom Error Message </Label>
                        <TextInput
                            className="my-3"
                            placeholder="Enter Custom error message"
                            helperText="To show custom error message"
                            value={data.validation.char_limit?.message}
                            onChange={(e) =>
                                setData("validation", {
                                    ...data.validation,
                                    char_limit: {
                                        ...data.validation.char_limit,
                                        message: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default TextValidation;
