import { DataContext } from "@/Context/DataContext";
import { Checkbox, Select, TextInput, Label } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

const MediaValidation = () => {
    const { data, setData} = useContext(DataContext);
    const [openSpecificFileSize, setOpenSpecificFileSize] = 
        useState(data.validation?.file_size?.state);
    const [openSpecificNumAssets, setOpenSpecificNumAssets] = 
        useState(data.validation?.num_of_assets?.state);
    const [openSpecificFileType, setOpenSpecificFileType] = 
        useState(data.validation?.file_type?.state);
    const [openSpecificFileDimensions, setOpenSpecificFileDimensions] =
        useState(data.validation?.file_dimensions?.state);
    const fileType = ["PDF", "Video", "Audio", "Image"];

    const handleFileSize = (e) => {
        const isOpen = e.target.checked;
        setData("validation", {
            ...data.validation,
            file_size: {
                state: isOpen,
                message: "",
                min: 0,
                max: 0,
                type : "kbytes",
                condition : "between",
            },
        });
        setOpenSpecificFileSize(isOpen)
    }

    const handleFileType = (e) => {
        const isOpen = e.target.checked;
        setData("validation", {
            ...data.validation,
            file_type: {
                state: isOpen,
                types : [],
                message: "",
            },
        });
        setOpenSpecificFileType(isOpen)
    }

    const handleFileTypeChange = (type) => {
        setData({
            ...data,
            validation: {
                ...data.validation,
                file_type: {
                    ...data.validation.file_type,
                    types: data.validation.file_type.types.includes(type)
                        ? data.validation.file_type.types.filter(existingType => existingType !== type)
                        : [...data.validation.file_type.types, type]
                }
            }
        });
    };

    const handleFileDimensions = (e) => {
        const isOpen = e.target.checked;
        setData("validation", {
            ...data.validation,
            file_dimensions: {
                state: isOpen,
                message : "",
                width : {
                    state : false,
                    condition : "",
                    pixel : "200"
                },
                height : {
                    state : false,
                    condition : "",
                    pixel : "200"
                },
            },
        });
        setOpenSpecificFileDimensions(
            !openSpecificFileDimensions
        )
    }

    const handleNumAssets = (e) => {
        const isOpen = e.target.checked;
        setData("validation", {
            ...data.validation,
            num_of_assets: {
                state: isOpen,
                message : "",
                min : 0,
                max : 0,
                condition : 'between',
            },
        });
        setOpenSpecificNumAssets(isOpen)
    }


    return (
        <>
            {/* for many files  */}
            {/* for specific number of files  */}
            {data.option && data.option == "many" && (
                <React.Fragment>
                    <div className="flex items-start my-3">
                        <Checkbox
                            checked={data.validation?.num_of_assets?.state}
                            className="me-3"
                            onChange={(e) =>
                                handleNumAssets(e)
                            }
                        />
                        <div className="flex flex-col">
                            <p className="font-bold text-md">
                                Accept only a specific number of assets
                            </p>
                            <p className="text-sm text-gray-500">
                                Specify a minimun and/or maximum allowed number
                                of assets
                            </p>
                        </div>
                    </div>
                    {openSpecificNumAssets && (
                        <>
                            <div className="flex items-center">
                                <Select 
                                    className="me-3"
                                    value={data.validation.num_of_assets?.condition}
                                    onChange={(e) => {
                                        setData("validation", {
                                            ...data.validation,
                                            num_of_assets: {
                                                ...data.validation.num_of_assets,
                                                condition: e.target.value,
                                            },
                                        })
                                    }}
                                >
                                    <option value="between"> Between </option>
                                    <option value="at-least"> At Least </option>
                                    <option value="not-more-than">
                                        Not More Than
                                    </option>
                                </Select>
                                <TextInput
                                    type="number"
                                    placeholder="minimum"
                                    className="me-3"
                                    value={data.validation?.num_of_assets?.min}
                                    onChange={(e) =>
                                            setData("validation", {
                                                ...data.validation,
                                                num_of_assets: {
                                                    ...data.validation.num_of_assets,
                                                    min: e.target.value,
                                                },
                                            })
                                        }
                                />
                                <p className="me-3"> and </p>
                                <TextInput
                                    type="number"
                                    placeholder="maximum"
                                    value={data.validation?.num_of_assets?.max}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            num_of_assets: {
                                                ...data.validation.num_of_assets,
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
                                    value={
                                        data.validation?.num_of_assets?.message
                                    }
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            num_of_assets: {
                                                ...data.validation.num_of_assets,
                                                message: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </>
                    )}
                </React.Fragment>
            )}

            {/* Specific file size  */}
            <React.Fragment>
                <div className="flex items-start my-3">
                    <Checkbox
                        checked={data.validation?.file_size?.state}
                        className="me-3"
                        onChange={(e) =>
                            handleFileSize(e)
                        }
                    />
                    <div className="flex flex-col">
                        <p className="font-bold text-md">
                            Accept Only Specified File Value
                        </p>
                        <p className="text-sm text-gray-500">
                            Specify a minimum/maximum allowed file size.
                        </p>
                    </div>
                </div>
                {openSpecificFileSize && (
                    <div className="ms-5">
                        <div className="flex">
                            <Select 
                                className="me-3 my-3 w-1/5"
                                onChange={(e) =>
                                    setData("validation", {
                                        ...data.validation,
                                        file_size: {
                                            ...data.validation.file_size,
                                            condition: e.target.value,
                                        },
                                    })
                                }
                            >
                                <option value="between"> Between </option>
                                <option value="at-least"> At Least </option>
                                <option value="not-more-than">Not More Than</option>
                            </Select>
                        </div>
                        <div className="flex flex-between my-5 items-center">
                            <div>
                                <TextInput
                                    type="number"
                                    placeholder="minimum"
                                    value={data.validation.file_size?.min}
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_size: {
                                                ...data.validation.file_size,
                                                min: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <span className="me-3"> And </span>
                            </div>
                            <div>
                                <TextInput
                                    type="number"
                                    placeholder="maximum"
                                    value={data.validation.file_size?.max}
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_size: {
                                                ...data.validation.file_size,
                                                max : e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Select
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_size: {
                                                ...data.validation.file_size,
                                                type: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option value="byte"> Bytes </option>
                                    <option value="kb"> KiloBytes </option>
                                    <option value="mb"> MegaBytes </option>
                                </Select>
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
                                    value={data.validation?.file_size?.message}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_size: {
                                                ...data.validation.file_size,
                                                message: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>

            {/* Specific file type  */}
            <React.Fragment>
                <div className="flex items-start my-3">
                    <Checkbox
                        checked={data.validation?.file_type?.state}
                        className="me-3"
                        onChange={(e) =>
                            handleFileType(e)
                        }
                    />
                    <div className="flex flex-col">
                        <p className="font-bold text-md">
                            Accept Only Specified File Type
                        </p>
                        <p className="text-sm text-gray-500">
                            Make this field only accept specified file type
                        </p>
                    </div>
                </div>
                {openSpecificFileType && (
                    <div className="ms-5">
                        <div className="flex items-center">
                            {fileType &&
                                fileType.length > 0 &&
                                fileType.map((item, key) => (
                                    <div key={key}>
                                        <div className="flex items-center my-2 me-2">
                                            <Checkbox
                                                checked={
                                                    data.validation?.file_type?.types.includes(item) ? true : false
                                                }
                                                className="me-3"
                                                onChange={() =>
                                                    handleFileTypeChange(item)
                                                }
                                            />
                                            <p> {item} </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {/* custom error message  */}
                        <div>
                            <div className="my-3">
                                <Label> Custom Error Message </Label>
                                <TextInput
                                    className="my-3"
                                    placeholder="Enter Custom error message"
                                    helperText="To show custom error message"
                                    value={data.validation?.file_type?.message}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_type: {
                                                ...data.validation.file_type,
                                                message: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
                
            </React.Fragment>

            {/* Specific image dimension */}
            <React.Fragment>
                <div className="flex items-start my-3">
                    <Checkbox
                        checked={data.validation?.image_dimensions?.state}
                        className="me-3"
                        onChange={(e) =>
                            handleFileDimensions(e)
                        }
                    />
                    <div className="flex flex-col">
                        <p className="font-bold text-md">
                            Accept Only Specified Image Dimensions
                        </p>
                        <p className="text-sm text-gray-500">
                            Specifiy a minimum and/or maximum allowed image
                            dimensions
                        </p>
                    </div>
                </div>
                {openSpecificFileDimensions && (
                    <div className="ms-5">
                        {/* width  */}
                        <div className="flex items-center">
                            <div className="flex items-start my-3 me-3">
                                <Checkbox
                                    checked={data.validation.file_dimensions?.width?.state}
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                width : {
                                                    ...data.validation.file_dimensions.width, 
                                                    state : e.target.checked
                                                }
                                            },
                                        })
                                    }
                                />
                                <p> Width </p>
                            </div>
                            {/* option  */}
                            <div className="flex items-center">
                                <Select 
                                    className="me-3"
                                    disabled={!data.validation.file_dimensions?.width?.state}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                width : {
                                                    ...data.validation.file_dimensions.width, 
                                                    condition : e.target.value
                                                }
                                            },
                                        })
                                    }
                                >
                                    <option value="between"> Between </option>
                                    <option value="at-least"> At Least </option>
                                    <option value="not-more-than">
                                        Not More Than
                                    </option>
                                </Select>
                                <TextInput
                                    disabled={!data.validation.file_dimensions?.width?.state}
                                    type="number"
                                    placeholder="pixel"
                                    className="me-3"
                                    value={data.validation?.file_dimensions?.width.pixel}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                width : {
                                                    ...data.validation.file_dimensions.width, 
                                                    pixel : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                        {/* height  */}
                        <div className="flex items-center">
                            <div className="flex items-start my-3 me-3">
                                <Checkbox
                                    checked={data.validation.file_dimensions?.height?.state}
                                    className="me-3"
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                height : {
                                                    ...data.validation.file_dimensions.height, 
                                                    state : e.target.checked
                                                }
                                            },
                                        })
                                    }
                                />
                                <p> Height </p>
                            </div>
                            {/* option  */}
                            <div className="flex items-center">
                                <Select 
                                    className="me-3"
                                    disabled={!data.validation?.file_dimensions?.height?.state}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                height : {
                                                    ...data.validation.file_dimensions.height, 
                                                    condition : e.target.value
                                                }
                                            },
                                        })
                                    }
                                >
                                    <option value="between"> Between </option>
                                    <option value="at-least"> At Least </option>
                                    <option value="not-more-than">
                                        Not More Than
                                    </option>
                                </Select>
                                <TextInput
                                    disabled={!data.validation?.file_dimensions?.height?.state}
                                    type="number"
                                    placeholder="pixel"
                                    className="me-3"
                                    value={data.validation?.file_dimensions?.height.pixel}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                height : {
                                                    ...data.validation.file_dimensions.height, 
                                                    pixel : e.target.value
                                                }
                                            },
                                        })
                                    }
                                />
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
                                    value={data.validation?.file_dimensions?.message}
                                    onChange={(e) =>
                                        setData("validation", {
                                            ...data.validation,
                                            file_dimensions: {
                                                ...data.validation.file_dimensions,
                                                message: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        </>
    );
};

export default MediaValidation;
