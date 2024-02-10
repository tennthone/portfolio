import { AdminContext, AdminProvider } from "@/Context/AdminContext";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { Breadcrumb, Button, Tabs } from "flowbite-react";
import React from "react";
import { FaUser } from "react-icons/fa6";
import Admins from "./Admins";
import Filter from "./Filter";
import { useContext } from "react";
import { usePage } from "@inertiajs/react";
import { CiTrash } from "react-icons/ci";
import { HiUserCircle } from "react-icons/hi";

const Index = () => {
    const { setOpenCreateModal } = useContext(AdminContext);
    const { admins, trashAdmins, totalValidCount, totalTrashCount } =
    usePage().props;

    return (
        <React.Fragment>
            {/* Header  */}
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb>
                        <Breadcrumb.Item icon={FaUser}>
                            Admin Management
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        size="sm"
                        color="purple"
                        type="button"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Add New Admin
                    </Button>
                </div>
            </div>

            {/* Filters  */}
            <Filter />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Admins" icon={HiUserCircle}>
                    {/* All Admins  */}
                    <Admins data={admins} totalCount={totalValidCount} />
                </Tabs.Item>
                <Tabs.Item title="Trash" icon={CiTrash}>
                    {/* Trash Admins  */}
                    <Admins
                        data={trashAdmins}
                        totalCount={totalTrashCount}
                        isTrash={true}
                    />
                </Tabs.Item>
            </Tabs>
        </React.Fragment>
    );
};

Index.layout = (page) => (
    <AdminProvider>
        <FrontendLayout children={page} />
    </AdminProvider>
);
export default Index;
