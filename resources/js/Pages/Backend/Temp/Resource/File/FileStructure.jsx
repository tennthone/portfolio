import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useContext} from 'react'
import { FaFilePen, FaFolderPlus, FaFolder} from "react-icons/fa6";
import { Breadcrumb} from 'flowbite-react';
import Delete from './Delete';
import { getTrimPath } from '@/Helper/helper';
import { Toaster } from 'react-hot-toast';
import { GrTemplate } from 'react-icons/gr';
import { FileContext, FileProvider } from '@/Context/FileContext';
import Folders from './Folders';
import Files from './Files';

const FileStructure = ({contents, template_id,  base_path}) => {
    const breadcrumb = getTrimPath(base_path);
    const {handleAdd} = useContext(FileContext)

    const addFolder = () => {
        handleAdd("Folder", 'admin.template.folder.store')
    }

    const addFile = () => {
        handleAdd("File", 'admin.template.file.store')
    }

  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <div>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item 
                        href={route('admin.template.resource')}
                        icon={GrTemplate}
                    > 
                        Templates 
                    </Breadcrumb.Item>
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
                        <Folders item={item} key={key} />
                    )) 
                }
                {
                    contents.files.map((item, key) => (
                        <Files item={item} key={key} />
                    ))
                }
            </>
            : <div className='my-3 text-red-700 text-sm text-center'> No File Here </div> 
        }
        {/* // Delete Modal  */}
        <Delete />
        <Toaster 
            position='top-right'
        />
    </div>
  )
}

FileStructure.layout = page => 
<FileProvider>
    <FrontendLayout children={page} />
</FileProvider>
export default FileStructure
