import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Sidebar } from 'flowbite-react';
import {HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUsers } from 'react-icons/hi';
import { FaGears } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import './app.css'
import { FaGlobe } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";

const Side = () => {
    const {url} = usePage();
    const {permissions} = usePage().props;
    return (
        <>  
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items color="blue">
                    <Sidebar.ItemGroup>
                        <Sidebar.Item icon={HiChartPie}> 
                            <Link href={route('admin.dashboard')}> Dashboard </Link>
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={HiShoppingBag} label="Template">
                                <Sidebar.Item icon={LuLayoutTemplate}> 
                                        <Link href={route('admin.template.component.index')}> Components </Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiInbox}> 
                                        <Link href={route('admin.template.resource')}> Resource </Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={FaGlobe}> 
                                        <Link href={route('admin.template.website')}> Website </Link>
                                </Sidebar.Item>
                        </Sidebar.Collapse>
                    {/* admins  */}
                    {
                        permissions.includes('view template') && 
                        <Sidebar.Item icon={HiUsers}>
                            <Link> Admin Users </Link>
                        </Sidebar.Item>
                    }
                    {/* users  */}
                    <Sidebar.Item icon={HiUsers}>
                            <Link> Users </Link>
                    </Sidebar.Item>

                    {/* git hub repo  */}
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        <Link href={route('admin.gitrepo.index')}> GitHub Repositories </Link>
                    </Sidebar.Item>

                    {/* settings  */}
                    <Sidebar.Collapse icon={FaGears} label="Setting">
                        {/* permissions  */}
                        {
                            permissions.includes('view permission') && 
                            <Sidebar.Item  icon={MdVerifiedUser}> 
                                <Link 
                                    className={url.startsWith('/admin/setting/permission' ? 'active' : 'not-active')} 
                                    href={route('admin.permission.index')}
                                > Permission  </Link>
                            </Sidebar.Item>}
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
