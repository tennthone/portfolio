import React from "react";
import MyModal from "../components/MyModal";
import { useContext } from "react";
import { GeneralSettingContext } from "@/Context/GeneralSettingContext";
import { Label, TextInput } from "flowbite-react";
import CustomFileInput from "../components/FileInput/CustomFileInput";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

const Edit = () => {
    const {
        openEditModal,
        setOpenEditModal,
        setErrors,
        data,
        setData,
        errors,
    } = useContext(GeneralSettingContext);
    const { gs_detail } = usePage().props;
    return (
        <div>
            <MyModal
                openModal={openEditModal}
                setOpenModal={setOpenEditModal}
                children={
                    <BodyContent
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                }
                heading="Create Entity"
                buttonName="Save"
                processingLabel="Saving"
                routeName={"admin.general-setting.update"}
                param={gs_detail.id}
                setErrors={setErrors}
                data={data}
            />
        </div>
    );
};

const BodyContent = ({ data, setData, errors }) => {
    const [previewImage, setPreviewImage] = useState("");
    const originalImage = data.type == 'file' && data.value;
    return (
        <React.Fragment>
            {/* Name  */}
            <div className="my-3">
                <Label> Name </Label>
                <TextInput
                    value={data.name}
                    placeholder="Enter Name"
                    helperText="It is used to remember to call"
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors && errors.name && (
                    <p className="text-red-700 text-sm"> {errors.name} </p>
                )}
            </div>
            {/* Value  */}
            <div className="my-3">
                <Label> Value </Label>
                {data.type == "file" ? (
                    <React.Fragment>
                        <div className="flex">
                            <img
                                src={originalImage}
                                alt="value image"
                                width={50}
                                height={50}
                                className="w-1/5 me-3"
                            />
                            <CustomFileInput
                                name="value"
                                setData={setData}
                                previewImage={previewImage}
                                setPreviewImage={setPreviewImage}
                                className="w-4/5"
                            />
                        </div>
                    </React.Fragment>
                ) : (
                    <TextInput
                        type={data.type}
                        value={data.value}
                        placeholder="Enter Value"
                        helperText="It is the value actually used in context"
                        onChange={(e) => setData("value", e.target.value)}
                    />
                )}
                {errors && errors.value && (
                    <p className="text-red-700 text-sm"> {errors.value} </p>
                )}
            </div>
            {/* Type  */}
            <div className="my-3">
                <Label> Type </Label>
                <TextInput
                    value={data.type}
                    placeholder="Enter Type"
                    onChange={(e) => setData("type", e.target.value)}
                />
                {errors && errors.type && (
                    <p className="text-red-700 text-sm"> {errors.type} </p>
                )}
            </div>
            {/* Category  */}
            <div className="my-3">
                <Label> Category </Label>
                <TextInput
                    readOnly
                    value={data.category}
                    placeholder="Enter Category"
                    onChange={(e) => setData("category", e.target.value)}
                />
                {errors && errors.category && (
                    <p className="text-red-700 text-sm"> {errors.category} </p>
                )}
            </div>
        </React.Fragment>
    );
};

export default Edit;
