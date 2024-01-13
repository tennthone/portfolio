import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { MdContentPasteGo } from "react-icons/md";
import { RxComponent1 } from "react-icons/rx";
import { SiAltiumdesigner } from "react-icons/si";
import { Tabs,Button } from "flowbite-react";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import DesignData from "../../../components/Field/Design/DesignData";
import ContentData from "../../../components/Field/Content/ContentData";
import { usePage } from "@inertiajs/react";
import FieldModal from "@/Pages/Backend/components/Field/FieldModal";
import CreateFieldModal from "@/Pages/Backend/components/Field/CreateFieldModal";
import Designs from "./Designs";
import { ComponentDesignContext } from "@/Context/ComponentDesignContext";

const Items = () => {
    const {handleAddField} = useContext(DataContext)
    const {handleCreate, handleSaveFile} = useContext(ComponentDesignContext)

    const {cpt} = usePage().props;
    return (
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Component Designs" icon={MdContentPasteGo}>
                    <div className="my-3 flex justify-end">
                        <Button 
                            size="sm"
                            color="purple"
                            onClick={() => handleCreate()}
                        > Add Design </Button>
                    </div>
                    <Designs />
                    {/*  */}
                </Tabs.Item>
                <Tabs.Item active title="Content" icon={RxComponent1}>
                    {/* content  */}
                    <div className="m-3 flex justify-end">
                        <Button
                            size="sm"
                            color="purple"
                            onClick={() =>
                                handleAddField(
                                    "content",
                                    "Component",
                                    cpt.id
                                )
                            }
                        >
                            Add Field
                        </Button>
                    </div>
                    <ContentData />
                </Tabs.Item>
                <Tabs.Item active title="Design" icon={SiAltiumdesigner}>
                    {/* design  */}
                    <div className="m-3 flex justify-end">
                        <Button
                            size="sm"
                            color="purple"
                            onClick={() =>
                                handleAddField(
                                    "design",
                                    "Component",
                                    cpt.id
                                )
                            }
                        >
                            Add Field
                        </Button>
                    </div>
                    <DesignData />
                </Tabs.Item>
                <Tabs.Item active title="Details" icon={FcViewDetails}>
                    {/*  */}
                </Tabs.Item>
            </Tabs>

            {/* Field Modal  */}
            <FieldModal />
            
            {/* Create Field Modal  */}
            <CreateFieldModal />
        </div>
    );
};

export default Items;
