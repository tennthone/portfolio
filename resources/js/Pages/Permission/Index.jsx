import FrontendLayout from '@/Layouts/FrontendLayout'
import React from 'react'
import { Breadcrumb } from 'flowbite-react'
import { MdVerifiedUser } from "react-icons/md";
import { Link } from '@inertiajs/react';
import Items from './Items';
import { PermissionProvider } from '@/Context/PermissionContext';
import Edit from './Edit';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  return (
    <div>
        <Toaster 
            position='top-right'
        />
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={MdVerifiedUser}>
                        <Link href={route('admin.permission.index')} > Permissions </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>

        {/* // All Roles  */}
        <Items />

        {/* Edit Modal  */}
        <Edit />
    </div>
  )
}

Index.layout = page => 
<PermissionProvider>
    <FrontendLayout children={page} />
</PermissionProvider>

export default Index
