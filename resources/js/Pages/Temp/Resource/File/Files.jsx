import React, { useContext } from "react";
import Item from "./Item";
import { FileContext } from "@/Context/FileContext";

const Files = ({item}) => {
    const {
        handleEditFile,
        handleOutsideClick,
        fileNames,
        isEditingFile,
    } = useContext(FileContext)
    return (
        <div
            className="p-2 bg-slate-200 rounded-md my-3"
            onDoubleClick={() => handleEditFile(item)}
        >
            <Item
                handleOutsideClick={handleOutsideClick}
                isEditing={isEditingFile[item] || false}
                item={item}
                name={fileNames[item] || ""}
                oldName={item}
            />
        </div>
    );
};

export default Files;
