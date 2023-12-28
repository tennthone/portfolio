import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { Breadcrumb, Button, Tabs} from 'flowbite-react'
import { GrTemplate } from 'react-icons/gr';
import CreateResource from '../../components/CreateResource';
import TempTabs from '../TempTabs';

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
        
        {/* Template Tabs  */}
        <TempTabs />

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
