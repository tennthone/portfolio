import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import Create from "./Create";
import { useState } from 'react';
import Items from "./Items";

const Index = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    return (
        <>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <p className="text-xl font-bold"> Template </p>
                    <button 
                        type="button"
                        className="bg-indigo-700 text-white p-2 rounded-md" onClick={() => setOpenCreateModal(true)}>
                        Create Template
                    </button>
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
                <Items />
            </div>
            
        </>
    );
};

Index.layout = (page) => <FrontendLayout children={page} />;
export default Index;
