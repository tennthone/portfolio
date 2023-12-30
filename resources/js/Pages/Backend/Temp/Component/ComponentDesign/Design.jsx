import React from "react";
import { Table } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";

const Design = ({item}) => {
    const {cpt} = usePage().props;
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
