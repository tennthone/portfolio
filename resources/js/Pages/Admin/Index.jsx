import { AdminContext, AdminProvider } from "@/Context/AdminContext";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { Breadcrumb, Button } from "flowbite-react";
import React from "react";
import { FaUser } from "react-icons/fa6";
import Admins from "./Admins";
import Filter from "./Filter";
import { useContext } from "react";
import CustomPagination from "../components/Pagination/Pagination";
import { usePage } from "@inertiajs/react";

const Index = () => {
    const {setOpenCreateModal} = useContext(AdminContext);
    const {totalCount} = usePage().props;

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
                        onClick={() =>setOpenCreateModal(true) }
                    >
                        Add New Admin
                    </Button>
                </div>
            </div>
            
            {/* Filters  */}
            <Filter />

            {/* All Admins  */}
            <Admins />
            {totalCount > 6 && 
            <CustomPagination 
                route={route("admin.admin-management")}
            />}
        </React.Fragment>
    );
};

Index.layout = (page) => (
    <AdminProvider>
        <FrontendLayout children={page} />
    </AdminProvider>
);
export default Index;
