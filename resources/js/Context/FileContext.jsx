import { router, usePage } from "@inertiajs/react";
import { createContext } from "react";
import { useState, useEffect} from "react";
import toast from "react-hot-toast";

export const FileContext = createContext(null)

export const FileProvider = ({children}) => {
    const {base_path} = usePage().props;
    const [fileNames, setFileNames] = useState({});
    const [folderNames, setFolderNames] = useState({});
    const [isEditingFile, setIsEditingFile] = useState({})
    const [isEditingFolder, setIsEditingFolder] = useState({})
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [filePath, setFilePath] = useState("")
    const [deleteRoute, setDeleteRoute] = useState("")
    const [title, setTitle] = useState("")

    const handleAdd = (contentType, routeName) => {
        router.post(route(routeName), {base_path : base_path}, {
            onSuccess : () => {
                toast.success(contentType + "created successfully")
            },
            onError : (err) =>  {
                console.log(err)
            }
        })
    }

    const handleDelete = (item, route, title) => {
        const file_path = base_path + '/' + item;
        setFilePath(file_path)
        setTitle(title)
        setDeleteRoute(route)
        setOpenDeleteModal(true)
    }

    const handleRename = (old_name, new_name, routeName) => {
        if(new_name !== old_name) {
            router.post(route(routeName), {
                path : base_path + '/' + old_name,
                destination : base_path + '/' + new_name
            }, {
                onSuccess : () => {
                    toast.success("Rename successfully");
                },
                onError : (err) => {
                    console.log(err)
                }
            })
        }
        setFolderNames({})
        setFileNames({});
        setIsEditingFolder((prev) => ({ ...prev, [old_name]: false }));
        setIsEditingFile((prev) => ({ ...prev, [old_name]: false }));
    }

    const handleEditFile = (item) => {
        setFileNames((prev) => ({...prev, [item] : item}))
        setIsEditingFile((prev) => ({ ...prev, [item]: true }));
    }

    const handleEditFolder = (item) => {
        setFolderNames((prev) => ({ ...prev, [item]: item }));
        setIsEditingFolder((prev) => ({ ...prev, [item]: true }));
    }

    const handleOutsideClick = (oldName, newName) => {
        // handle rename file 
        if(isEditingFile[oldName]) {
            handleRename(oldName, newName, 'admin.template.file.rename')
        }

        // handle rename folder 
        if(isEditingFolder[oldName]) {
            handleRename(oldName, newName,'admin.template.folder.rename' )
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <FileContext.Provider value={{
            handleAdd,
            handleDelete,
            handleRename,
            handleEditFile,
            handleEditFolder,
            handleOutsideClick,
            setOpenDeleteModal,
            isEditingFile,
            isEditingFolder,
            filePath,
            deleteRoute,
            title,
            openDeleteModal,
            folderNames,
            fileNames,
        }}>
                {children}
        </FileContext.Provider>
    )
}