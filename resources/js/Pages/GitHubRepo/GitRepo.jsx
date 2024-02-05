import React from "react";
import { Table} from "flowbite-react";
import DeleteButton from "../components/DeleteButton";

const GitRepo = ({item, id, handleClick}) => {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell> {id + 1} </Table.Cell>
            <Table.Cell> {item.name} </Table.Cell>
            <Table.Cell>
                <a
                    href={item.clone_url}
                    className="text-indigo-700"
                    target="_blank"
                >
                    {item.clone_url}
                </a>
            </Table.Cell>
            <Table.Cell>
                <a href={item.url} className="text-indigo-700" target="_blank">
                    {item.url}
                </a>
            </Table.Cell>
            <Table.Cell>
                <DeleteButton 
                    handleDelete={handleClick}
                    param={item.name}
                />
            </Table.Cell>
        </Table.Row>
    );
};

export default GitRepo;
