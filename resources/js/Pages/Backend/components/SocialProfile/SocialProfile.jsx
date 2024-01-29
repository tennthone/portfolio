import { AdminContext } from "@/Context/AdminContext";
import { data } from "autoprefixer";
import { Label, TextInput } from "flowbite-react";
import React from "react";
import { useContext } from "react";

const SocialProfile = ({ labelName, value, placeholder}) => {
    const {data, setData} = useContext(AdminContext)
    const handleChange = (e) => {
        setData({
            ...data,
            social: {
                ...data.social,
                [labelName.toLowerCase()]: e.target.value,
            },
        });
    };

    return (
        <div className="flex my-3">
            <div className="w-1/5">
                <Label> {labelName} </Label>
            </div>
            <div className="w-2/5">
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </div>
    );
};

export default SocialProfile;
