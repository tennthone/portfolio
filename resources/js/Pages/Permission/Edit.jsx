import { PermissionContext } from "@/Context/PermissionContext";
import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { useContext } from "react";
import { Modal, Button, ToggleSwitch } from "flowbite-react";
import { usePage } from "@inertiajs/react";

const Edit = () => {
    const { openEditModal, setOpenEditModal, updatePermission} = useContext(PermissionContext);
    const { editData } = usePage().props;
    const data = Object.values(editData)
    return (
        <div>
            <Modal
                dismissible
                show={openEditModal}
                size="4xl"
                onClose={() => setOpenEditModal(false)}
            >
                <Modal.Header> Edit Permission </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-between flex-wrap">
                            {data.length > 0 &&
                                Object.entries(editData.all_permissions).map(
                                    ([key, item], index) => (
                                        <>
                                            <div
                                                className="w-1/4 my-3"
                                                key={key}
                                            >
                                                <ToggleSwitch
                                                    checked={
                                                        editData.user_permissions.includes(
                                                            item.name
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                    label={item.name}
                                                    onChange={() => updatePermission(editData.role.id, item.id)}
                                                />
                                            </div>
                                        </>
                                    )
                                )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

Edit.layout = (page) => <FrontendLayout children={page} />;
export default Edit;
