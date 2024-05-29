import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import ProfileImage from "../../Assets/Default/default-profile.png";
import { usePage } from "@inertiajs/react";
import { MyTab, MyTabItem } from "../components/Tab/MyTab";
import { FaUser } from "react-icons/fa6";

const Index = () => {
    const {auth} = usePage().props;
    return (
        <div>
            {/* banner image  */}
            <div>
                <div className="relative h-[200px] bg-indigo-700">
                    {/* cover image will be placed */}
                    <div className="absolute left-5 bottom-[-80px]">
                        <div className="flex">
                            <div className="flex justify-center items-center">
                                <img
                                    src={ProfileImage}
                                    alt="Profile Image"
                                    width={100}
                                    height={100}
                                    className="me-3"
                                />
                                <div className="flex flex-col">
                                    <p className="text-2xl font-bold text-slate-600"> {auth.admin.name} </p>
                                    <p className="text-sm text-slate-400"> {auth.admin.email} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[100px]">
                  <MyTab>
                    <MyTabItem title="Profile Detail" icon={<FaUser />}> this is profile detail </MyTabItem>
                    <MyTabItem title="Password"> this is password  </MyTabItem>
                  </MyTab>
                </div>
            </div>
        </div>
    );
};

Index.layout = (page) => <FrontendLayout children={page} />;
export default Index;
