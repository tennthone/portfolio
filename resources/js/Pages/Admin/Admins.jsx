import { Table } from "flowbite-react";
import React from "react";
import Admin from "./Admin";
import { router, usePage } from "@inertiajs/react";
import { FaSort } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "@/Context/AdminContext";
import CustomPagination from "../components/Pagination/Pagination";
import { useEffect } from "react";

const Admins = ({ data, isTrash = false, totalCount }) => {
    const { url } = usePage();
    const [isAscending, setIsAscending] = useState(true);
    const { colHeaders, searchData, setSearchData } = useContext(AdminContext);

    const handleSort = (field) => {
        setIsAscending(!isAscending);
        setSearchData({
            ...searchData,
            sortField: field,
            sortBy: isAscending ? "asc" : "desc",
            sort: true,
        });
    };

    useEffect(() => {
        router.post(
            url,searchData,
            {
                onSuccess: () => {},
                onError: () => {},
            }
        );
    }, [isAscending]);

    return (
        <React.Fragment>
            <div className="my-5">
                <Table>
                    <Table.Head>
                        {colHeaders
                            .filter((item) => item.selected == true)
                            .map((item) => (
                                <Table.HeadCell key={item.id}>
                                    <div className="flex">
                                        <span className="me-2">
                                            {item.name}
                                        </span>
                                        <FaSort
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleSort(item.field)
                                            }
                                        />
                                    </div>
                                </Table.HeadCell>
                            ))}
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data.length > 0 ? (
                            data.map((item, key) => (
                                <Admin
                                    key={item.id}
                                    item={item}
                                    id={item.id}
                                    isTrash={isTrash}
                                />
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
                {totalCount > 6 && (
                    <div className="border-t-2 border-slate-400">
                        <CustomPagination
                            searchData={searchData}
                            setSearchData={setSearchData}
                            totalCount={totalCount}
                        />
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Admins;
