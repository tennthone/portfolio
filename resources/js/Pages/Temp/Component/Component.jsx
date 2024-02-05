import React from "react";
import { Table, ToggleSwitch } from "flowbite-react";
import { Link } from "@inertiajs/react";

const Component = ({item}) => {
    return (
        <Table.Row>
            <Table.Cell> {item.id} </Table.Cell>
            <Table.Cell> 
                <Link className="text-indigo-700" href={route('admin.template.component.design.index', {cpt_id : item.id})}> {item.name} </Link>
            </Table.Cell>
            <Table.Cell> {item.value} </Table.Cell>
            <Table.Cell> 
                {item.loopable ? "ရတယ်" : "မရဘူး"}
            </Table.Cell>
            <Table.Cell> 
                {item.max_no_loop}
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

export default Component;
