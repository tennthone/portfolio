import React from "react";
import { Tabs, Button, Textarea } from "flowbite-react";
import { MdContentPasteGo } from "react-icons/md";
import { IoFileTray } from "react-icons/io5";
import { FcViewDetails } from "react-icons/fc";
import { GiSkeleton } from "react-icons/gi";
import { usePage } from "@inertiajs/react";
import { useContext } from "react";
import { ComponentDesignContext } from "@/Context/ComponentDesignContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";


const ShowTabs = () => {
    const {cpt_dsg} = usePage().props;
    const {handleSaveFile, loading} = useContext(ComponentDesignContext)
    const [content, setContent] = useState(cpt_dsg.content)
    const [skeleton, setSkeleton] = useState(cpt_dsg.skeleton)

    return (
        <div className="my-5">
            <Toaster position="top-right" />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Content File" icon={MdContentPasteGo}>
                    {/* Content file  */}
                    <div className="my-3 flex justify-end">
                        <Button 
                            size="sm" 
                            color="purple"
                            onClick={() => handleSaveFile(content, cpt_dsg.content_path)}
                            isProcessing={loading}
                            processingLabel="Saving"
                        >
                            Save
                        </Button>
                    </div>
                    <Textarea 
                        rows={30}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {/*  */}
                </Tabs.Item>
                <Tabs.Item active title="Skeleton File" icon={GiSkeleton}>
                    {/*  Skeleton file  */}
                    <div className="my-3 flex justify-end">
                        <Button 
                            size="sm" 
                            color="purple"
                            onClick={() => handleSaveFile(skeleton, cpt_dsg.skeleton.path)}
                            isProcessing={loading}
                            processingLabel="Saving"
                        >
                            Save
                        </Button>
                    </div>
                    <Textarea 
                        rows={30}
                        value={skeleton}
                        onChange={(e) => setSkeleton(e.target.value)}
                    />
                </Tabs.Item>

                <Tabs.Item active title="Details" icon={FcViewDetails}>
                    {/* Details  */}
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default ShowTabs;
