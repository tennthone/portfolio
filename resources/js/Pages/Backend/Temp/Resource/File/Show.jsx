import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState, useEffect} from 'react'
import { Link, router } from '@inertiajs/react';
import { FaFilePen, FaFolderPlus, FaFolder} from "react-icons/fa6";
import { Breadcrumb} from 'flowbite-react';
import Delete from './Delete';
import { getTrimPath } from '@/Helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import Item from './Item';

const Show = ({contents, template_id,  base_path}) => {
    const [filePath, setFilePath] = useState("")
    const [deleteRoute, setDeleteRoute] = useState("")
    const [title, setTitle] = useState("")
    const [isEditingFile, setIsEditingFile] = useState(false)
    const [isEditingFolder, setIsEditingFolder] = useState(false)
    const [fileName, setFileName] = useState("");
    const [folderName, setFolderName] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const breadcrumb = getTrimPath(base_path);

    const addFolder = () => {
        handleAdd("Folder", 'admin.template.folder.store')
    }

    const addFile = () => {
        handleAdd("File", 'admin.template.file.store')
    }

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

    const handleEditFile = (item) => {
        setFileName(item)
        setIsEditingFile(true)
    }

    const handleEditFolder = (item) => {
        setFolderName(item)
        setIsEditingFolder(true)
    }

    const handleOutsideClick = (name) => {
        // handle rename file 
        if(isEditingFile) {
            handleRename(name, fileName, 'admin.template.file.rename')
        }

        // handle rename folder 
        if(isEditingFolder) {
            handleRename(name, folderName,'admin.template.folder.rename' )
        }
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
            setIsEditingFile(false)
            setIsEditingFolder(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <div>
                <Breadcrumb aria-label="Default breadcrumb example">
                    {
                        Object.entries(breadcrumb).map(([key, value], index) => (
                            <Breadcrumb.Item href={route('admin.template.files-folders', {id : template_id, base_path : value})} icon={FaFolder} key={index}>
                                {key}
                            </Breadcrumb.Item>
                        ))
                    }
                </Breadcrumb>
                </div>
                <div className="flex justify-between items-center">
                    <button 
                        type="button"
                        className="bg-indigo-700 text-white p-2 text-sm rounded-md me-2" onClick={() => addFile()}>
                        <span> <FaFilePen size={20} className='me-2 inline' /></span> 
                        <span>  Add File </span>
                    </button>
                    <button 
                        type="button"
                        className="bg-indigo-700 text-white p-2 text-sm rounded-md" onClick={() => addFolder()}>
                        <span> <FaFolderPlus size={20} className='me-2 inline' /></span> 
                        <span>  Add Folder </span>
                    </button>
                </div>
            </div>
        </div>
        {/* folders  */}
        {
            contents.folders.length > 0 || contents.files.length > 0 ?
            <>
                {
                    contents.folders.map((item, key) => (
                        <div 
                            className='p-2 bg-slate-200 rounded-md my-3' 
                            key={key}
                            onDoubleClick={() => handleEditFolder(item)}
                        >
                           <Item 
                                handleDelete={handleDelete}
                                isEditing={isEditingFolder}
                                handleOutsideClick={handleOutsideClick}
                                item={item}
                                setName={setFolderName}
                                name={folderName}
                                oldName={item}
                           />
                        </div>
                    )) 
                }
                {
                    contents.files.map((item, key) => (
                        <div 
                            className='p-2 bg-slate-200 rounded-md my-3' 
                            key={key}
                            onDoubleClick={() => handleEditFile(item)}
                        >
                            <Item 
                                handleDelete={handleDelete}
                                handleOutsideClick={handleOutsideClick}
                                isEditing={isEditingFile}
                                item={item}
                                setName={setFileName}
                                name={fileName}
                                oldName={item}
                           />
                        </div>
                    ))
                }
            </>
            : <div className='my-3 text-red-700 text-sm text-center'> No File Here </div> 
        }
        {/* // Delete Modal  */}
        <Delete 
            setOpenDeleteModal={setOpenDeleteModal}
            openDeleteModal={openDeleteModal}
            filePath={filePath}
            deleteRoute={deleteRoute}
            title={title}
        />
        <Toaster 
            position='top-right'
        />
    </div>
  )
}

Show.layout = page => <FrontendLayout children={page} />
export default Show
