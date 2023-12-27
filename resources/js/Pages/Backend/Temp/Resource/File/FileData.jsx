import FrontendLayout from '@/Layouts/FrontendLayout'
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import { IoFolder } from "react-icons/io5";
import { Button } from 'flowbite-react';
import Commit from './Commit';

const FileData = () => {
    const [openCommitModal, setOpenCommitModal] = useState(false)
    const [templateId, setTemplateId] = useState('');
    const {templates} = usePage().props;

    const handleCommit = (id) => {
        setTemplateId(id)
        setOpenCommitModal(true)
    }

  return (
    <div>
        {
            templates.map(item => (
                <div className='p-2 bg-slate-200 rounded-md my-3' key={item.id}>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className='me-3'> <IoFolder size={25} className='inline' /> </span>
                            <span  className='text-sm font-bold text-indigo-700'> 
                                <Link href={route('admin.template.files-folders', {id : item.id , base_path : item.git_info.base_path})}> {item.name}  </Link>
                            </span>
                        </div>
                        <div>
                            <Button color='green' onClick={() => handleCommit(item.id)}> Commit Changes  </Button>
                        </div>
                    </div>
                </div>
            ))
        }

        {/* Commit modal  */}
        <Commit 
            openCommitModal={openCommitModal}
            setOpenCommitModal={setOpenCommitModal}
            templateId={templateId}
        />
    </div>
  )
}

export default FileData
