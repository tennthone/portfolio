import FrontendLayout from '@/Layouts/FrontendLayout'
import React from 'react'
import { Breadcrumb, Button } from 'flowbite-react'
import { Link } from '@inertiajs/react'
import { LuLayoutTemplate } from "react-icons/lu";
import Items from './Items';
import Create from './Create';
import { ComponentContext, ComponentProvider } from '@/Context/ComponentContext';
import { useContext } from 'react';

const Index = () => {
    const {setOpenCreateModal} = useContext(ComponentContext)
  return (
    <div>
      <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={LuLayoutTemplate}>
                        <Link href={route('admin.template.component.index')} > Components </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Button onClick={() => setOpenCreateModal(true)}> Create Component</Button>
            </div>
        </div>

        {/* Components   */}
        <Items />

        {/* Create Modal  */}
        <Create />
    </div>
  )
}

Index.layout = page => 
<ComponentProvider>
    <FrontendLayout children={page} />
</ComponentProvider>
export default Index
