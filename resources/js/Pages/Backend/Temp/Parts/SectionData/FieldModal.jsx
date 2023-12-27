import { SectionDataContext } from "@/Context/SectionDataContext";
import { Modal } from "flowbite-react";
import React, { useContext } from "react";
import { CiText } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { MdOutlinePermMedia } from "react-icons/md";
import { VscSymbolBoolean } from "react-icons/vsc";
import { IoIosColorPalette } from "react-icons/io";

const FieldModal = () => {
    const { openFieldModal, setOpenFieldModal } =
        useContext(SectionDataContext);
        const fieldData = [
            {
            "id": 1,
            "name": "Rich Text",
            "type": "textarea",
            "options": [],
            "icon": <CiText size={30}/>
            },
            {
            "id": 2,
            "name": "Text",
            "type": "text",
            "options": [],
            "icon": <IoText size={30}/>
            },
            {
            "id": 3,
            "name": "Number",
            "type": "number",
            "options": [],
            "icon": <GoNumber size={30}/>
            },
            {
            "id": 4,
            "name": "Date Time",
            "type": "datetime",
            "options": [],
            "icon": <FaCalendarAlt size={30}/>
            },
            {
            "id": 5,
            "name": "Media",
            "type": "file",
            "icon": <MdOutlinePermMedia size={30}/>
            },
            {
            "id": 6,
            "name": "Boolean",
            "type": "boolean",
            "options": [],
            "icon": <VscSymbolBoolean size={30}/>
            },
            {
            "id": 7,
            "name": "Color",
            "type": "color",
            "options": [],
            "icon": <IoIosColorPalette size={30} />
            }
        ];
      
    return (
        <div>
            <Modal
                size="3xl"
                show={openFieldModal}
                onClose={() => setOpenFieldModal(false)}
            >
                <Modal.Header> Add Field </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-between flex-wrap">
                            {
                                fieldData.map(item => (
                                    <FieldData  item={item}/>
                                ))
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FieldModal;

export const FieldData = ({item}) => {
    const {handleFieldSelect} = useContext(SectionDataContext);
    return (
        <>
            <div className="w-1/3">
                <div 
                    className="p-3 border-2 border-amber-600 text-yellow-700 rounded-md my-3 mx-2 shadow-md shadow-amber-600 cursor-pointer hover:shadow-amber-300"
                    onClick={() => handleFieldSelect(item)}
                >
                    <div className="flex items-center justify-between">
                        {item.icon}
                        <div>
                            <p className="font-bold text-2xl"> {item.name } </p>
                            <p> {item.type} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
