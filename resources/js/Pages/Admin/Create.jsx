import React from "react";
import MyModal from "../components/MyModal";
import { useContext } from "react";
import { AdminContext } from "@/Context/AdminContext";
import { Label, Select, TextInput, Textarea } from "flowbite-react";
import CustomFileInput from "../components/FileInput/CustomFileInput";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Create = () => {
    const {
        openCreateModal,
        setOpenCreateModal,
        data,
        setData,
        errors,
        setErrors,
        reset,
    } = useContext(AdminContext);

    return (
        <React.Fragment>
            <MyModal
                openModal={openCreateModal}
                setOpenModal={setOpenCreateModal}
                data={data}
                children={
                    <BodyContent
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                }
                heading="Add a new admin"
                buttonName="confirm"
                processingLabel="Saving"
                setErrors={setErrors}
                routeName="admin.admin-management.store"
                reset={reset}
            />
        </React.Fragment>
    );
};

export default Create;

const BodyContent = ({ setData, data, errors }) => {
    const { roles } = usePage().props;
    const { handleRoleChange } = useContext(AdminContext);
    const [previewImage, setPreviewImage] = useState(null);

    return (
        <React.Fragment>
            {/* name  */}
            <div className="flex justify-between my-3">
                <div className="w-1/3">
                    <Label> Name * </Label>
                </div>
                <div className="w-2/3">
                    <TextInput
                        placeholder="Your Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors && errors.name && (
                        <span className="text-red-700 text-sm">
                            {" "}
                            {errors.name}{" "}
                        </span>
                    )}
                </div>
            </div>

            {/* email  */}
            <div className="flex justify-between my-3">
                <div className="w-1/3">
                    <Label> Email * </Label>
                </div>
                <div className="w-2/3">
                    <TextInput
                        type="email"
                        placeholder="email@gmail.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors && errors.email && (
                        <span className="text-red-700 text-sm">
                            {" "}
                            {errors.email}{" "}
                        </span>
                    )}
                </div>
            </div>

            {/* phone  */}
            <div className="flex justify-between my-3">
                <div className="w-1/3">
                    <Label> Phone </Label>
                </div>
                <div className="w-2/3">
                    <TextInput
                        placeholder="09873883838"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                </div>
            </div>

            {/* file input  */}
            <div className="my-3 flex justify-between">
                <div className="w-1/3">
                    <Label> Profile Image </Label>
                </div>
                <div className="w-2/3">
                    <div className="flex items-center">
                        <div className="me-2">
                            {previewImage ? (
                                <div>
                                    <img 
                                        src={previewImage} 
                                        alt="preview profile image" 
                                        width={70}
                                        height={70}
                                    />
                                </div>
                            ) : (
                                <React.Fragment>
                                    {data.profile_image ? (
                                        <img
                                            src={data.profile_image}
                                            width={50}
                                            height={50}
                                            alt="profile image"
                                        />
                                    ) : (
                                        <img
                                            src="https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg"
                                            width={50}
                                            height={50}
                                            alt="profile image placeholder"
                                        />
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                        <CustomFileInput
                            setData={setData}
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            name='profile_image'
                        />
                    </div>
                </div>
            </div>

            {/* Roles  */}
            <div className="my-3 flex justify-between">
                <div className="w-1/3">
                    <Label> Role * </Label>
                </div>
                <div className="w-2/3">
                    <Select multiple onChange={handleRoleChange}>
                        <option value=""> Select Role </option>
                        {roles.length > 0 &&
                            roles.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                    </Select>
                    {errors && errors.roles && (
                        <span className="text-red-700 text-sm">
                            {" "}
                            {errors.roles}{" "}
                        </span>
                    )}
                </div>
            </div>

            {/* Description  */}
            <div className="my-3 flex justify-between">
                <div className="w-1/3">
                    <Label> Description </Label>
                </div>
                <div className="w-2/3">
                    <Textarea
                        value={data.description}
                        placeholder="Write a sentence about a user"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
