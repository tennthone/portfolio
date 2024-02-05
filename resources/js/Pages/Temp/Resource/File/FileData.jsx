import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { IoFolder } from "react-icons/io5";
import { Button, Tooltip} from "flowbite-react";
import Commit from "./Commit";
import toast from "react-hot-toast";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoGitCommitSharp } from "react-icons/io5";

const FileData = () => {
    const [openCommitModal, setOpenCommitModal] = useState(false);
    const [templateId, setTemplateId] = useState("");
    const { templates, flash } = usePage().props;

    const handleCommit = (id) => {
        setTemplateId(id);
        setOpenCommitModal(true);
    };

    const handlePull = (id, branch_name) => {
        router.post(route('admin.gitaction.pull'), {
            template_id : id,
            branch_name : branch_name
        }, {
            onSuccess : () => {
                if(flash.success) {
                    toast.success(flash.success)
                } else {
                    toast.error(flash.error)
                }
            },
            onError : () => {

            }
        })
    }

    return (
        <div>
            {templates.length > 0 ? (
                templates.map((item) => (
                    <div
                        className="p-2 bg-slate-200 rounded-md my-3"
                        key={item.id}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="me-3">
                                    
                                    <IoFolder
                                        size={25}
                                        className="inline"
                                    />
                                </span>
                                <span className="text-sm font-bold text-indigo-700">
                                    <Link
                                        href={route(
                                            "admin.template.files-folders",
                                            {
                                                id: item.id,
                                                base_path:
                                                    item.git_info.base_path,
                                            }
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </span>
                            </div>
                            <div>
                                <div className="flex">
                                    <Tooltip content="Code အသစ်များ ဆွဲယူမည်">
                                        <Button 
                                            size="sm"
                                            color="indigo"
                                            className="me-5"
                                        >
                                            <IoIosGitPullRequest
                                                size={20}
                                                onClick={() => handlePull(item.id, item.git_info.branch_name)}
                                            >
                                                Pull Changes
                                            </IoIosGitPullRequest>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Code အသစ်များ တင်မည်။​">
                                        <Button 
                                            size="sm"
                                            color="indigo"
                                        >
                                            <IoGitCommitSharp
                                                size={20}
                                                onClick={() => handleCommit(item.id)}
                                            >
                                                Commit Changes
                                            </IoGitCommitSharp>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-red-700"> No File Here </div>
            )}

            {/* Commit modal  */}
            <Commit
                openCommitModal={openCommitModal}
                setOpenCommitModal={setOpenCommitModal}
                templateId={templateId}
            />
        </div>
    );
};

export default FileData;
