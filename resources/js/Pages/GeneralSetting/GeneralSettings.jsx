import { usePage } from "@inertiajs/react";
import { Table } from "flowbite-react";
import React from "react";
import GeneralSetting from "./GeneralSetting";

const GeneralSettings = () => {
    const {gs} = usePage().props;
    return (
        <div className="my-5">
            <Table>
                <Table.Head>
                    <Table.HeadCell> No </Table.HeadCell>
                    <Table.HeadCell> Name </Table.HeadCell>
                    <Table.HeadCell> Value </Table.HeadCell>
                    <Table.HeadCell> Type </Table.HeadCell>
                    <Table.HeadCell> Category </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {gs.map(item => (
                        <GeneralSetting 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default GeneralSettings;
