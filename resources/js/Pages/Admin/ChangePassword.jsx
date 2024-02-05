import { AdminContext } from "@/Context/AdminContext";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useContext } from "react";

const ChangePassword = () => {
    const {data, setData, errors, updatePassword} = useContext(AdminContext);
    return (
        <React.Fragment>
            <form onSubmit={updatePassword}>
                <div className="my-3">
                    {/* header  */}
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xl font-bold"> Change Password </p>
                            <p>
                                Please enter your current password to change your
                                password
                            </p>
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
                        </div>
                    </div>
                    {/* current password  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Current Password </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    type="password"
                                    value={data.current_password}
                                    placeholder="Your Current Password"
                                    onChange={(e) =>
                                        setData("current_password", e.target.value)
                                    }
                                />
                                {errors && errors.current_password && (
                                    <span className="text-red-700 text-sm mt-2">
                                        {errors.current_password}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* new password  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> New Password </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    type="password"
                                    value={data.new_password}
                                    placeholder="New Password"
                                    helperText="Password must have between 8 and 16 characters"
                                    onChange={(e) =>
                                        setData("new_password", e.target.value)
                                    }
                                />
                                {errors && errors.new_password && (
                                    <span className="text-red-700 text-sm mt-2">
                                        {errors.new_password}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* confirm password  */}
                    <div className="mt-5 border-t-2">
                        <div className="flex pt-8">
                            <div className="w-1/5">
                                <Label> Confirm Password </Label>
                            </div>
                            <div className="w-2/5">
                                <TextInput
                                    type="password"
                                    value={data.confirm_password}
                                    placeholder="Confirm Password"
                                    helperText="Password must have between 8 and 16 characters"
                                    onChange={(e) =>
                                        setData("confirm_password", e.target.value)
                                    }
                                />
                                {errors && errors.confirm_password && (
                                    <span className="text-red-700 text-sm mt-2">
                                        {errors.confirm_password}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default ChangePassword;
