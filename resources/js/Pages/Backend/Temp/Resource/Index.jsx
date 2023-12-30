import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { Breadcrumb, Button, Tabs} from 'flowbite-react'
import { GrTemplate } from 'react-icons/gr';
import CreateTemplate from '../../components/CreateTemplate';
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
                    color='purple'
                    size="sm"
                    onClick={() => setOpenCreateModal(true)}
                >
                    Create Resource
                </Button>
            </div>
        </div>
        
        {/* Template Tabs  */}
        <TempTabs />

        {/* Create Modal  */}
        <CreateTemplate 
            templateUsage="resource"
            openModal={openCreateModal}
            setOpenModal={setOpenCreateModal}
        />
    </>
  )
}

Index.layout = page => <FrontendLayout children={page} />
export default Index
