import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import Items from './Items'
import { RiPagesLine } from "react-icons/ri";
import { Link, router } from '@inertiajs/react';
import { Breadcrumb, Button } from 'flowbite-react';
import { GrTemplate } from "react-icons/gr";
import Edit from './Edit';
import toast from 'react-hot-toast';
import { PageProvider } from '@/Context/PageContext';

const Index = ({pages, template_id}) => {
    const handleAdd = () => {
        router.post(route('admin.template.page.store'), {template_id : template_id}, {
            onSuccess : () => {
                toast.success("Page created successfully");
            },
            onError : () => {

            }
        })
    }
  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={GrTemplate}>
                        <Link href={route('admin.template.resource.content')} > Templates </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={RiPagesLine}>
                        <Link href="" > Pages </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Button 
                    onClick={handleAdd}
                > Add Page </Button>
            </div>
        </div>
        {/* page items  */}
        <Items 
            pages={pages}
            template_id={template_id}
        />

        {/* Edit modal  */}
        <Edit />
    </div>
  )
}

Index.layout = page => 
<PageProvider>
    <FrontendLayout children={page} />
</PageProvider>
export default Index
