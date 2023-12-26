import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import Create from "./Create";
import { useState } from 'react';
import Items from "./Items";
import { Button } from "flowbite-react";

const Index = ({templates}) => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    return (
        <>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-xl font-bold"> Template </p>
                    <Button
                        type="button"
                        onClick={() => setOpenCreateModal(true)}>
                        Create Resource
                    </Button>
                </div>
            </div>

            {/* pagination  */}

            {/* Create modal  */}
            <Create 
                openCreateModal={openCreateModal} 
                setOpenCreateModal={setOpenCreateModal} 
            />

            {/* Items  */}
            <div className="my-3">
                <Items 
                    templates={templates}
                />
            </div>
            
        </>
    );
};

Index.layout = (page) => <FrontendLayout children={page} />;
export default Index;
