import React from "react";
import { FcViewDetails } from "react-icons/fc";
import { MdContentPasteGo } from "react-icons/md";
import { RxComponent1 } from "react-icons/rx";
import { SiAltiumdesigner } from "react-icons/si";
import { Tabs,Button } from "flowbite-react";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import DesignData from "../../Parts/SectionData/Design/DesignData";
import ContentData from "../../Parts/SectionData/Content/ContentData";
import { usePage } from "@inertiajs/react";

const Items = () => {
    const {handleAddField} = useContext(DataContext)
    const {cpt} = usePage().props;
    return (
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Component Designs" icon={MdContentPasteGo}>
                    <div className="my-3 flex justify-end">
                        <Button onClick={() => console.log("Hello")}> Add Design </Button>
                    </div>
                    {/*  */}
                </Tabs.Item>
                <Tabs.Item active title="Content" icon={RxComponent1}>
                    {/* content  */}
                    <div className="m-3 flex justify-end">
                        <Button
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
        </div>
    );
};

export default Items;
