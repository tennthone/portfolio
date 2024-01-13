import { DataContext } from "@/Context/DataContext";
import { usePage } from "@inertiajs/react";
import { Label, Modal, TextInput, Button } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { VscSymbolField } from "react-icons/vsc";
import Validation from "./Validation/Validation";
import Default from "./Default/Default";
import Apperance from "./Apperance/Apperance";
import { useState } from "react";

const EditFieldModal = () => {
    const { openEditFieldModal, setOpenEditFieldModal, data, setData, update } =
        useContext(DataContext);
    const { field } = usePage().props;

    return (
        <>
            <form onSubmit={() => alert("hello")}>
                <Modal
                    size="5xl"
                    show={openEditFieldModal}
                    onClose={() => setOpenEditFieldModal(false)}
                >
                    <Modal.Header>
                        <div className="flex">
                            {/* icon  */}
                            <VscSymbolField size={30} className="me-3" />
                            <div className="">
                                <p className="text-lg font-bold">{data.name}</p>
                                <p className="text-sm"> {data.type} </p>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* filed name  */}
                        <div className="my-3">
                            <Label> Enter Name </Label>
                            <TextInput
                                placeholder="Name"
                                helperText="This is a hint text"
                                className="my-3"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                value={data.name}
                            />
                        </div>
                        {/* filed value  */}
                        <div className="my-3">
                            <Label> Enter Variable Name </Label>
                            <TextInput
                                placeholder="Variable Name"
                                helperText="This is a hint text"
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                className="my-3"
                                value={field.value}
                                readOnly
                            />
                        </div>

                        {/* Validation  */}
                        <Validation />
                        <Default />
                        <Apperance />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="sm"
                                color="purple"
                                onClick={update}
                            >
                                Confirm
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
};

export default EditFieldModal;
