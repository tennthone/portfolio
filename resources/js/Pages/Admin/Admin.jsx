import { AdminContext } from "@/Context/AdminContext";
import { Link, router } from "@inertiajs/react";
import { Badge, Table, ToggleSwitch, Tooltip } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import DeleteButton from "../components/DeleteButton";
import { MdOutlineRestore } from "react-icons/md";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import { useEffect } from "react";

const Admin = ({ item, id, isTrash }) => {
    const { handleSoftDelete, handleSwitchChange, colHeaders, handleDelete, handleRestore, isSuccess} =
        useContext(AdminContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false) 
    const isSelectedValue = (field) => {
        const item = colHeaders.filter((item) => item.field == field);
        return item[0].selected;
    };

    useEffect(() => {
        setOpenDeleteModal(false);
    }, [isSuccess])

    return (
        <React.Fragment>
            {/* render delete modal for permenant delete */}
            <DeleteModal 
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                handleDelete={handleDelete}
                param={id}
            />
            <Table.Row>
                {isSelectedValue("id") == true && (
                    <Table.Cell> {id + 1} </Table.Cell>
                )}
                {isSelectedValue("profile_image") && (
                    <Table.Cell>
                        <img
                            src={item.profile_image}
                            alt=""
                            width={50}
                            height={50}
                        />
                    </Table.Cell>
                )}
                {isSelectedValue("name") == true && (
                    <Table.Cell> {item.name} </Table.Cell>
                )}
                {isSelectedValue("email") == true && (
                    <Table.Cell> {item.email} </Table.Cell>
                )}
                {isSelectedValue("address") == true && (
                    <Table.Cell> {item.address ?? "-"} </Table.Cell>
                )}
                {isSelectedValue("phone") == true && (
                    <Table.Cell> {item.phone ?? "-"} </Table.Cell>
                )}
                {isSelectedValue("gender") == true && (
                    <Table.Cell> {item.gender ?? "-"} </Table.Cell>
                )}
                {isSelectedValue("roles") == true && (
                    <Table.Cell>
                        <div className="flex flex-col">
                            {item.roles.map((role, key) => (
                                <AdminRole role={role} key={key} />
                            ))}
                        </div>
                    </Table.Cell>
                )}
                {isSelectedValue("isActive") == true && (
                    <Table.Cell>
                        <ToggleSwitch
                            checked={item.isActive == 1 ? true : false}
                            onChange={(state) =>
                                handleSwitchChange(state, item.id)
                            }
                        />
                    </Table.Cell>
                )}
                {isSelectedValue("created_at") == true && (
                    <Table.Cell> {item.created_at} </Table.Cell>
                )}
                <Table.Cell>
                    <div className="flex items-center">
                        <div className="me-3">
                            <Tooltip content="Edit Admin">
                                <Link
                                    href={route(
                                        "admin.admin-management.edit",
                                        item.id
                                    )}
                                >
                                    <FaRegEdit
                                        size={25}
                                        className="text-green-500 cursor-pointer"
                                    />
                                </Link>
                            </Tooltip>
                        </div>
                        <div className="me-3">
                            {!isTrash ?
                                <DeleteButton
                                    param={item.id}
                                    handleDelete={handleSoftDelete}
                                /> : 
                                <DeleteButton
                                    param={item.id}
                                    handleDelete={() => setOpenDeleteModal(true)}
                                />
                            }
                        </div>
                        <div>
                            {isTrash && (
                                    <Tooltip content="Restore Admin">
                                        <MdOutlineRestore
                                            size={25}
                                            className="text-yellow-500 cursor-pointer"
                                            onClick={() => handleRestore(id)}
                                        />
                                    </Tooltip>
                                )}
                        </div>
                    </div>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
};

export default Admin;

export const AdminRole = ({ role }) => {
    let badgeColor = "info";
    switch (role) {
        case "superadmin":
            badgeColor = "failure";
            break;
        case "editor":
            badgeColor = "success";
        default:
            break;
    }
    return (
        <span className="mt-2">
            <Badge color={badgeColor}> {role} </Badge>
        </span>
    );
};
