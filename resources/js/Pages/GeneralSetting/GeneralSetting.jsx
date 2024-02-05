import { GeneralSettingContext } from "@/Context/GeneralSettingContext";
import { Button, Table } from "flowbite-react";
import React from "react";
import { useContext } from "react";

const GeneralSetting = ({ item }) => {
    const { handleEditModal } = useContext(GeneralSettingContext);
    return (
        <React.Fragment>
            <Table.Row>
                <Table.Cell> {item.id} </Table.Cell>
                <Table.Cell> {item.name} </Table.Cell>
                <Table.Cell>
                    {item.type == "file" ? (
                        <img src={item.value} alt="value" width={50} height={50}/>
                        ) : (
                            item.value
                            )}
                </Table.Cell>
                <Table.Cell> {item.type} </Table.Cell>
                <Table.Cell> {item.category} </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => handleEditModal(item.id)}>
                        Edit
                    </Button>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
};

export default GeneralSetting;
