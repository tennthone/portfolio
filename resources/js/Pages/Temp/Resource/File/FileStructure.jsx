import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useContext} from 'react'
import { FaFilePen, FaFolderPlus, FaFolder} from "react-icons/fa6";
import { Breadcrumb, Button, Tooltip} from 'flowbite-react';
import Delete from './Delete';
import { getTrimPath } from '@/Helper/helper';
import { Toaster } from 'react-hot-toast';
import { GrTemplate } from 'react-icons/gr';
import { FileContext, FileProvider } from '@/Context/FileContext';
import Folders from './Folders';
import Files from './Files';
import { Link } from '@inertiajs/react';

const FileStructure = ({contents, template,  base_path}) => {
    const breadcrumb = getTrimPath(base_path);
    console.log(breadcrumb)
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
                        icon={GrTemplate}
                    > 
                        <Link href={route(template.isResource ? 'admin.template.resource' : 'admin.template.website')}>
                            Templates 
                        </Link>
                    </Breadcrumb.Item>
                    {   
                        Object.entries(breadcrumb).map(([key, value], index) => (
                            <Breadcrumb.Item 
                                 icon={FaFolder} key={index}>
                                <Link href={route('admin.template.files-folders', {id : template.id, base_path : value})}> {key} </Link>
                            </Breadcrumb.Item>
                        ))
                    }
                </Breadcrumb>
                </div>
                <div className="flex justify-between items-center">
                    <Tooltip content="File အသစ်ဖန်တီးမည်">
                        <Button 
                            size="sm"
                            type="button"
                            color='indigo'
                            onClick={() => addFile()}
                            className='me-3'
                        >
                                <FaFilePen size={20} className='me-2 inline' />
                        </Button>
                    </Tooltip> 
                    <Tooltip content="Folder အသစ်ဖန်တီးမည်"> 
                        <Button
                            size="sm" 
                            type="button"
                            color='indigo'
                            onClick={() => addFolder()}
                        >
                                <FaFolderPlus size={20} className='me-2 inline' />
                        </Button>
                    </Tooltip> 
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
