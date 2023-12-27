import React, { useContext, useEffect, useState } from "react";
import { IoFolder } from "react-icons/io5";
import { FaRegTrashAlt, FaFileAlt} from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { FileContext } from "@/Context/FileContext";

const Item = ({
                item, 
                isEditing,
                name, 
                oldName
            }) => {
    const {template_id, base_path} = usePage().props;
    const {handleDelete, handleOutsideClick} = useContext(FileContext);
    const isFile = item.includes('.');
    const [localName, setLocalName] = useState(name);

    useEffect(() => {
        setLocalName(name);
    }, [name]); 

    const handleBlur = () => {
        handleOutsideClick(oldName, localName);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex">
                <span className="me-3">
                   {isFile ? <FaFileAlt size={25} />  : <IoFolder size={25} /> } 
                </span>
                <p className="text-sm font-bold text-indigo-700">
                    {isEditing ? (
                        <input
                            className="border-2 border-indigo-500 p-0 rounded-md"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            onBlur={() => handleBlur()}
                            autoFocus
                        />
                    ) : (
                        <Link
                            href={route(isFile ? "admin.template.file.show" : "admin.template.files-folders", {
                                id: template_id,
                                base_path: base_path + "/" + item,
                            })}
                        >
                            {item}
                        </Link>
                    )}
                </p>
            </div>
            <div className="text-end">
                    <FaRegTrashAlt
                        size={20}
                        className="text-red-700 cursor-pointer"
                        onClick={() =>
                            handleDelete(
                                item,
                                isFile ?  "admin.template.file.delete" : "admin.template.folder.delete",
                                isFile ? 'file' : 'folder'
                            )
                        }
                    />
            </div>
        </div>
    );
};

export default Item;
