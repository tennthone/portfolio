import { AdminContext } from "@/Context/AdminContext";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import React from "react";
import { useRef, useState, useContext } from "react";
import CustomFileInput from "../components/FileInput/CustomFileInput";
import { usePage } from "@inertiajs/react";
import useSocialProfiles from "@/Hooks/useSocialProfiles";
import profiles from "../../Data/social.json";
import SocialProfile from "../components/SocialProfile/SocialProfile";

const genders = [
    {
        id : 0,
        name : 'female'
    },
    {
        id : 1,
        name : 'male'
    },
    {
        id : 2,
        name : 'others'
    },
];

const ProfileDetail = () => {
    const { data, setData, update, errors, handleRoleChange } =
        useContext(AdminContext);
    const [editModeOff, setEditModeOff] = useState(true);
    const inputRef = useRef(null);
    const { roles } = usePage().props;
    const [previewImage, setPreviewImage] = useState("");
    const currentImage = data.profile_image;
    const { socialProfiles, addSocialProfile } = useSocialProfiles(data.social);

    // auto focus when edit mode on
    const handleEditModeOn = () => {
        setEditModeOff((prevEditMode) => {
            if (prevEditMode) {
                inputRef.current.focus();
            }
            return !prevEditMode;
        });
    };

    const checkProfileExist = (id) => {
        const isExist = socialProfiles.some((item) => item.id == id);
        return isExist;
    };

    return (
        <React.Fragment>
            <form onSubmit={update}>
                <div className="my-3">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xl font-bold"> Admin Profile </p>
                            <p> You can do blah blah here </p>
                        </div>
                        <div className="flex items-center">
                            <Button
                                type="submit"
                                size="sm"
                                color="purple"
                                className="me-3"
                            >
                                Update
                            </Button>
                            <Button
                                onClick={handleEditModeOn}
                                type="button"
                                size="sm"
                                color="purple"
                            >
                                {editModeOff ? "Edit" : "Cancel"}
                            </Button>
                        </div>
                    </div>

                    {/* name  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Name </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    ref={inputRef}
                                    value={data.name}
                                    placeholder="Your Name"
                                    readOnly={editModeOff}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors && errors.name && (
                                    <span className="text-red-700 text-sm mt-2">
                                        {" "}
                                        {errors.name}{" "}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* email  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Email Address </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    value={data.email}
                                    placeholder="example@gmail.com"
                                    readOnly={editModeOff}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors && errors.email && (
                                    <span className="text-red-700 text-sm mt-2">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* phone  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Phone Number </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    value={data.phone}
                                    placeholder="09838383838"
                                    readOnly={editModeOff}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* address  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Address </Label>
                            </div>
                            <div className="w-2/5">
                                <Textarea
                                    value={data.address}
                                    placeholder="Your Address"
                                    readOnly={editModeOff}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* profile image  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5 flex flex-col">
                                <Label> Admin Photo </Label>
                                <span className="text-xs">
                                    This will be displayed on your profile
                                </span>
                            </div>
                            <div className="w-2/5 flex items-center">
                                {previewImage ? (
                                    <div className="me-3">
                                        <img
                                            src={previewImage}
                                            alt="preview profile image"
                                            className="me-2"
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
                                <CustomFileInput
                                    setData={setData}
                                    previewImage={previewImage}
                                    setPreviewImage={setPreviewImage}
                                    name='profile_image'
                                />
                            </div>
                        </div>
                    </div>

                    {/* roles */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5 flex flex-col">
                                <Label> Roles </Label>
                            </div>
                            <div className="w-2/5 flex items-center">
                                <Select
                                    multiple
                                    className="w-full"
                                    onChange={(e) => handleRoleChange(e)}
                                >
                                    <option value=""> Choose Admin </option>
                                    {roles &&
                                        roles.map((item) => (
                                            <option
                                                value={item.name}
                                                selected={
                                                    data.roles?.includes(
                                                        item.name
                                                    )
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {" "}
                                                {item.name}{" "}
                                            </option>
                                        ))}
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* gender */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5 flex flex-col">
                                <Label> Gender </Label>
                            </div>
                            <div className="w-2/5 flex items-center">
                                <Select
                                    className="w-full"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                >
                                    <option value=""> Select Gender </option>
                                    {genders.map((item) => (
                                        <option
                                            value={item.id}
                                            selected={
                                                data.gender == item.id
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {item.name.charAt(0).toUpperCase() + item.name.slice(1,item.length)}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* bio */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5 flex flex-col">
                                <Label> Bio </Label>
                                <span className="text-xs">
                                    Write a short description
                                </span>
                            </div>
                            <div className="w-2/5 flex items-center">
                                <Textarea
                                    value={data.description}
                                    placeholder="Add your bio here"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* social profile */}
                    <div className="my-5 border-t-2 mb-5">
                        <div className="flex pt-8">
                            <div className="w-1/5 flex flex-col">
                                <Label> Social Profile </Label>
                                <span className="text-xs">
                                    Click the icon to add the social profile you
                                    want
                                </span>
                            </div>
                            <div className="w-2/5 flex">
                                {profiles.length > 0 &&
                                    profiles.map((item) => (
                                        <span
                                            key={item.id}
                                            className={`me-4 hover:border-4 border-indigo-700 rounded-full ${
                                                checkProfileExist(item.id)
                                                    ? "border-4 border-green-500 rounded-full"
                                                    : ""
                                            }`}
                                        >
                                            <img
                                                src={item.link}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                onClick={() =>
                                                    addSocialProfile(item)
                                                }
                                                className="cursor-pointer"
                                            />
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* social media fields  */}
                    <div className="mt-5">
                        {socialProfiles.length > 0 &&
                            socialProfiles.map((item) => (
                                <SocialProfile
                                    labelName={item.name}
                                    value={item.value}
                                    placeholder={`Enter ${item.name} link`}
                                    setData={setData}
                                />
                            ))}
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default ProfileDetail;
