import React from "react";
import { FaFileArchive } from "react-icons/fa";
import { RxComponent1 } from "react-icons/rx";
import FileData from "./Resource/File/FileData";
import ContentData from "./Resource/Content/ContentData";
import { Tabs } from "flowbite-react";

const TempTabs = () => {
    return (
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Content" icon={RxComponent1}>
                    {/* content  */}
                    <ContentData/>
                </Tabs.Item>
                <Tabs.Item active title="File" icon={FaFileArchive}>
                    {/* File  */}
                    <FileData />
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default TempTabs;
