import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { IoFolder } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { Link, router } from '@inertiajs/react';
import { FaFilePen, FaFolderPlus, FaFolder} from "react-icons/fa6";
import { Breadcrumb } from 'flowbite-react';
import { FaRegTrashAlt } from "react-icons/fa";
import Delete from './Delete';

const Show = ({contents, template_id, base_path}) => {
    const [filePath, setFilePath] = useState("")
    const [deleteRoute, setDeleteRoute] = useState("")
    const [title, setTitle] = useState("")
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const getTrimPath = (path) => {
        const prefix = "/Applications/xampp/xamppfiles/htdocs/tenthone/storage/app/resources/";
        const trimmedPath = path.replace(new RegExp(`^${prefix}`), '');
        return trimmedPath.split('/');
    }
    const breadcrumb = getTrimPath(base_path);

    const addFolder = () => {
        router.post(route('admin.template.folder.store'), {base_path : base_path}, {
            onSuccess : () => {

            },
            onError : (err) =>  {
                console.log(err)
            }
        })
    }

    const addFile = () => {
        router.post(route('admin.template.file.store'), {base_path : base_path}, {
            onSuccess : () => {

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
  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <div>
                <Breadcrumb aria-label="Default breadcrumb example">
                    {
                        breadcrumb.map((item, key) => (
                            <Breadcrumb.Item href="#" icon={FaFolder} key={key}>
                                {item}
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
                    <div className='p-2 bg-slate-200 rounded-md my-3' key={key}>
                        <div className="flex items-center justify-between">
                            <div className='flex'>
                                <span className='me-3'> <IoFolder size={25} /> </span>
                                <p  className='text-sm font-bold text-indigo-700'> 
                                    <Link href={route('admin.template.files-folders', {id : template_id, base_path : base_path + '/' + item})}> {item}  </Link>
                                </p>
                            </div>
                            <div className="text-end">
                                <FaRegTrashAlt size={20} className='text-red-700 cursor-pointer' onClick={() => handleDelete(item, 'admin.template.folder.delete', 'folder')}/>
                            </div>
                        </div>
                    </div>
                )) 
                }
                {
                    contents.files.map((item, key) => (
                        <div className='p-2 bg-slate-200 rounded-md my-3' key={key}>
                            <div className="flex items-center justify-between">
                                <div className="flex justify-center items-center">
                                    <span className='me-3'> <FaFileAlt size={25} /> </span>
                                    <p  className='text-sm font-bold text-indigo-700'> 
                                        <Link href={route('admin.template.file.show', {base_path : base_path + '/' + item})}> {item}  </Link>
                                    </p>
                                </div>
                                <div className="text-end">
                                    <FaRegTrashAlt size={20} className='text-red-700 cursor-pointer' onClick={() => handleDelete(item, 'admin.template.file.delete', 'file')}/>
                                </div>
                            </div>
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
    </div>
  )
}

Show.layout = page => <FrontendLayout children={page} />
export default Show
