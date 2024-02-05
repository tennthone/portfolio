import { Table } from "flowbite-react";
import React from "react";
import Admin from "./Admin";
import { router, usePage } from "@inertiajs/react";
import { FaSort } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "@/Context/AdminContext";

const Admins = () => {
    const {url} = usePage();
    const { admins } = usePage().props;
    const [isAscending, setIsAscending] = useState(true);
    const {colHeaders} = useContext(AdminContext)

    const handleSort = (field) => {
        setIsAscending(!isAscending)
        router.post(url, {
            field : field,
            sortBy : isAscending ? 'asc' : 'desc',
            sort : true
        }, {
            onSuccess : () => {

            },
            onError : () => {

            }
        })
    }
    return (
        <React.Fragment>
            <div className="my-5">
                <Table>
                    <Table.Head>
                        {colHeaders.filter(item => item.selected == true).map((item) => (
                            <Table.HeadCell key={item.id}>
                                <div className="flex">
                                    <span className="me-2"> {item.name} </span>
                                    <FaSort 
                                        className="cursor-pointer"
                                        onClick={() => handleSort(item.field)}
                                    />
                                </div>
                            </Table.HeadCell>
                        ))}
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {admins.length > 0 ? (
                            admins.map((item, key) => (
                                <Admin key={item.id} item={item} id={key} />
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell className="text-red-700">
                                    No Data
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </React.Fragment>
    );
};

export default Admins;
