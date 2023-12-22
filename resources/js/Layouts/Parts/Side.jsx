import { Link } from "@inertiajs/react";
import React from "react";
import { Sidebar } from 'flowbite-react';
import {HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';

const Side = () => {
    return (
        <>  
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={HiChartPie}> 
                        <Link href={route('admin.dashboard')}> Dashboard </Link>
                    </Sidebar.Item>
                <Sidebar.Item icon={HiInbox}> 
                        <Link href={route('admin.template.index')}> Template </Link>
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                    Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                    Products
                </Sidebar.Item>
                <Sidebar.Collapse icon={HiShoppingBag} label="Setting">
                    <Sidebar.Item href="#"> Permission </Sidebar.Item>
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
