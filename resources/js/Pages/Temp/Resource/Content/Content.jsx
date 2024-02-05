import React from "react";
import { Table, Tooltip } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { MdContentCopy } from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import useCopyToClipboard from "@/Hooks/useCopyToClipboard";

const Content = ({ item }) => {
    const {isCopying, handleCopy} = useCopyToClipboard(item.templateId)
    return (
        <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key={item.id}
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex items-center">
                    <p className="me-3"> {item.templateId} </p>
                    {
                        isCopying 
                        ? 
                        <Tooltip content="TemplateId ကူးယူပြီးပြီ" style="light">
                            <TiTick 
                                size={15} 
                                className="inline text-green-700"
                            /> 
                        </Tooltip>
                        : 
                        <Tooltip 
                            content="TemplateId ကူးယူမည်" 
                            style="light" 
                        > 
                            <MdContentCopy
                                onClick={() => handleCopy()}
                                size={15}
                                className="inline text-indigo-600 cursor-copy"
                            />
                        </Tooltip>
                    }
                </div>
                
            </Table.Cell>
            <Table.Cell>
                <Link
                    href={route("admin.template.page", {
                        template_id: item.id,
                    })}
                    className="text-indigo-700"
                >
                    {item.name}
                </Link>
            </Table.Cell>
            <Table.Cell> {item.git_info.remote_url} </Table.Cell>
            <Table.Cell> {item.git_info.branch_name} </Table.Cell>
            <Table.Cell> {item.creator.name} </Table.Cell>
        </Table.Row>
    );
};

export default Content;
