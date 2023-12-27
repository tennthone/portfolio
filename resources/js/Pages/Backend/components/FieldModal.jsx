import { Modal } from "flowbite-react";
import React, { useContext } from "react";
import { CiText } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { MdOutlinePermMedia } from "react-icons/md";
import { VscSymbolBoolean, VscSymbolField} from "react-icons/vsc";
import { IoIosColorPalette } from "react-icons/io";
import { DataContext } from "@/Context/DataContext";

const FieldModal = () => {
    const { openFieldModal, setOpenFieldModal, handleFieldSelect} =
        useContext(DataContext);
        const fieldData = [
            {
            "id": 1,
            "name": "Text",
            "type": "text",
            "helper_text": "Titles, names and paragraph",
            "icon": <IoText size={20}/>
            },
            {
            "id": 2,
            "name": "Rich Text",
            "type": "textarea",
            "helper_text": "Text formating with references and media",
            "icon": <CiText size={20}/>
            },
            {
            "id": 3,
            "name": "Number",
            "type": "number",
            "helper_text": "ID, order number, rating, quantity",
            "icon": <GoNumber size={20}/>
            },
            {
            "id": 4,
            "name": "Date Time",
            "type": "datetime",
            "helper_text": "Event dates",
            "icon": <FaCalendarAlt size={20}/>
            },
            {
            "id": 5,
            "name": "Media",
            "type": "file",
            "helper_text": "Images, videos, PDFs and other files",
            "icon": <MdOutlinePermMedia size={20}/>
            },
            {
            "id": 6,
            "name": "Boolean",
            "type": "boolean",
            "helper_text": "Yes or No, 1 or 0, true or false",
            "icon": <VscSymbolBoolean size={20}/>
            },
            {
            "id": 7,
            "name": "Color",
            "type": "color",
            "helper_text": "Background color, color and pallet color",
            "icon": <IoIosColorPalette size={20} />
            }
        ];
      
    return (
        <div>
            <Modal
                size="3xl"
                show={openFieldModal}
                onClose={() => setOpenFieldModal(false)}
            >
                <Modal.Header>  
                    <div className="flex items-center">
                        {/* icon  */}
                        <VscSymbolField size={30} className="me-3"/>
                        <div className="">
                            <p className="text-lg font-bold">
                                Choose a field
                            </p>
                            <p className="text-sm"> Supporting text </p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="flex justify-between flex-wrap">
                            {
                                fieldData.map(item => (
                                    <FieldData handleFieldSelect={handleFieldSelect} item={item} key={item.id}/>
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

export const FieldData = ({item, handleFieldSelect}) => {
    return (
        <>
            <div className="w-1/3">
                <div 
                    className="p-3 border-2 border-slate-150 text-slate-700 rounded-md my-3 mx-2 cursor-pointer hover:border-indigo-700"
                    onClick={() => handleFieldSelect(item)}
                >
                    <div className="flex flex-col items-start justify-between">
                        <div className="p-1 border-0 rounded-md bg-slate-100 border-slate-50 text-indigo-600">
                            {item.icon}
                        </div>
                        <div className="my-2">
                            <p className="font-bold text-base"> {item.name } </p>
                            <p className="text-xs"> {item.helper_text} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
