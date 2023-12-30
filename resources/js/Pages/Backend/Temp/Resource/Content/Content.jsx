import React from "react";
import { Table } from "flowbite-react";
import { Link } from "@inertiajs/react";

const Content = ({item}) => {
    return (
        <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key={item.id}
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.id}
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
            <Table.Cell>
                <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    Edit
                </a>
            </Table.Cell>
        </Table.Row>
    );
};

export default Content;
