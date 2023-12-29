import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import {Button, Breadcrumb} from 'flowbite-react'
import { GrTemplate } from "react-icons/gr";
import TempTabs from "../TempTabs";
import { useState } from "react";
import CreateTemplate from "../../components/CreateTemplate";

const Index = () => {
    const [openCloneModal, setOpenCloneModal] = useState(false)
    return (
        <div>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb>
                        <Breadcrumb.Item icon={GrTemplate}>
                            Templates
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => setOpenCloneModal(true)}
                    >
                        Clone Template
                    </Button>
                </div>
            </div>

            {/* Template Tabs  */}
            <TempTabs />

            {/* Clone Modal  */}
            <CreateTemplate
                templateUsage="website" 
                openModal={openCloneModal}
                setOpenModal={setOpenCloneModal}
            />
        </div>
    );
};

Index.layout = (page) => <FrontendLayout children={page} />;
export default Index;
