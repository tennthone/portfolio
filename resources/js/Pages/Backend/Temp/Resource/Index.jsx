import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { Breadcrumb, Button, Tabs} from 'flowbite-react'
import { FaFileArchive } from "react-icons/fa";
import { RxComponent1 } from "react-icons/rx";
import ContentData from './Content/ContentData';
import FileData from './File/FileData';
import { GrTemplate } from 'react-icons/gr';
import CreateResource from '../../components/CreateResource';

const Index = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false)
  return (
    <>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb>
                    <Breadcrumb.Item  icon={GrTemplate}> Templates </Breadcrumb.Item>
                </Breadcrumb>
                <Button 
                    type="button"
                    onClick={() => setOpenCreateModal(true)}
                >
                    Create Resource
                </Button>
            </div>
        </div>
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Content" icon={RxComponent1}>
                    {/* content  */}
                    <ContentData />
                </Tabs.Item>
                <Tabs.Item active title="File" icon={FaFileArchive}>
                    {/* File  */}
                    <FileData />
                </Tabs.Item>
            </Tabs>
        </div>

        {/* Create Modal  */}
        <CreateResource 
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
        />
    </>
  )
}

Index.layout = page => <FrontendLayout children={page} />
export default Index
