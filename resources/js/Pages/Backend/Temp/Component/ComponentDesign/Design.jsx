import React from "react";
import { Table, Tooltip } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";
import { FaEye } from "react-icons/fa6";
import { useContext } from "react";
import { ComponentDesignContext } from "@/Context/ComponentDesignContext";

const Design = ({item}) => {
    const {cpt} = usePage().props;
    const {handlePreview} = useContext(ComponentDesignContext)
    return (
        <Table.Row>
            <Table.Cell> {item.id} </Table.Cell>
            <Table.Cell>
                <Link
                    className="text-indigo-700"
                    href={route('admin.template.component.design.show', {
                        id : item.id , 
                        cpt_id : cpt.id
                    })}
                >
                    {item.name}
                </Link>
            </Table.Cell>
            <Table.Cell> {item.value} </Table.Cell>
            <Table.Cell>  
                <Tooltip content="Preview Component Design">
                    <FaEye 
                        size={30} className="p-2 bg-indigo-700 text-white rounded-md cursor-pointer"
                        onClick={() => handlePreview(item.id)}    
                    />
                </Tooltip>
            </Table.Cell>
            <Table.Cell>
                <button
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => handleEdit(item.id)}
                >
                    Edit
                </button>
            </Table.Cell>
        </Table.Row>
    );
};

export default Design;
