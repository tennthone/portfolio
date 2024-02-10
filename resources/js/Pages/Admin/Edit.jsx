import FrontendLayout from "@/Layouts/FrontendLayout";
import { Link, usePage } from "@inertiajs/react";
import { Breadcrumb } from "flowbite-react";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { Tabs } from "flowbite-react";
import { MdDashboard } from "react-icons/md";
import ChangePassword from "./ChangePassword";
import ProfileDetail from "./ProfileDetail";
import { AdminProvider } from "@/Context/AdminContext";

const Edit = () => {
    const { url } = usePage();
    return (
        <React.Fragment>
            {/* Header  */}
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb>
                        <Breadcrumb.Item icon={FaUser}>
                            <Link href={route("admin.admin-management")}>
                                Admin Management
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span
                                className={`${
                                    url.startsWith(
                                        "/admin/admin-management/edit"
                                    )
                                        ? "text-indigo-700"
                                        : ""
                                }`}
                            >
                                Admin Details
                            </span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="my-3">
                <h1 className="text-3xl font-bold"> Admin Detail </h1>
            </div>

            {/* details data  */}
            <Tabs aria-label="Tabs with icons" style="underline">
                <Tabs.Item active title="Profile" icon={FaUser}>
                    <ProfileDetail />
                </Tabs.Item>
                <Tabs.Item title="Password" icon={MdDashboard}>
                    <ChangePassword />
                </Tabs.Item>
            </Tabs>
        </React.Fragment>
    );
};

Edit.layout = (page) => 
<AdminProvider>
    <FrontendLayout children={page} />
</AdminProvider>;
export default Edit;
