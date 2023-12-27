import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Sidebar } from 'flowbite-react';
import {HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';

const Side = () => {
    const {permissions} = usePage().props;
    return (
        <>  
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiChartPie}> 
                        <Link href={route('admin.dashboard')}> Dashboard </Link>
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="Template">
                            <Sidebar.Item icon={HiInbox}> 
                                    <Link href={route('admin.template.resource')}> Components </Link>
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiInbox}> 
                                    <Link href={route('admin.template.resource')}> Resource </Link>
                            </Sidebar.Item>
                    </Sidebar.Collapse>
                {
                    permissions.includes('view template') && 
                    <Sidebar.Item href="#" icon={HiUser}>
                        Users
                    </Sidebar.Item>
                }
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                    <Link href={route('admin.gitrepo.index')}> GitHub Repositories </Link>
                </Sidebar.Item>
                <Sidebar.Collapse icon={HiShoppingBag} label="Setting">
                    {permissions.includes('view permission') && <Sidebar.Item href={route('admin.permission.index')}> Permission </Sidebar.Item>}
                    <Sidebar.Item href="#"> General Setting </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item  icon={HiTable}>
                    <Link href={route('admin.logout')} method="post"> Logout </Link>
                </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            </Sidebar>
        </>
        
    );
};

export default Side;
